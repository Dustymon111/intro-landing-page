import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// Tiny rover that drives along a rail to the active nav link.
// The orthographic camera maps one world unit to one CSS pixel, so `targetX`
// (the active link's centre, in px from the left edge) is used directly.
const ROVER_SIZE = 46; // px, longest side
const GROUND_TILT = 0.42; // radians; how much we look down onto the rail
const FORWARD_YAW = Math.PI / 2; // yaw that points the model's nose toward +x
const SPRING = 38;
const DAMPING = 2 * Math.sqrt(SPRING) * 0.82; // slightly underdamped: a small settle at the stop

function shadowTexture() {
    const size = 64;
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    gradient.addColorStop(0, 'rgba(56, 189, 248, 0.55)');
    gradient.addColorStop(1, 'rgba(56, 189, 248, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
    return new THREE.CanvasTexture(canvas);
}

export default function RoverTrack({ targetX, className = '' }) {
    const containerRef = useRef(null);
    const targetRef = useRef(targetX);

    useEffect(() => {
        targetRef.current = targetX;
    }, [targetX]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        let renderer;
        try {
            renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' });
        } catch {
            return;
        }
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setClearColor(0x000000, 0);
        const canvas = renderer.domElement;
        canvas.style.opacity = '0';
        canvas.style.transition = 'opacity 0.8s ease';
        container.appendChild(canvas);

        const scene = new THREE.Scene();
        const camera = new THREE.OrthographicCamera(0, 1, 1, 0, -500, 500);
        camera.position.z = 100;

        scene.add(new THREE.HemisphereLight('#E0F2FE', '#312E81', 3.2));
        const key = new THREE.DirectionalLight('#FFFFFF', 3.4);
        key.position.set(60, 120, 160);
        scene.add(key);
        const rim = new THREE.DirectionalLight('#38BDF8', 2.5);
        rim.position.set(-120, 40, -80);
        scene.add(rim);

        // ground -> rover (x + heading) -> body (pitch + bob) -> model
        const ground = new THREE.Group();
        ground.rotation.x = GROUND_TILT;
        scene.add(ground);
        const rover = new THREE.Group();
        ground.add(rover);
        const body = new THREE.Group();
        rover.add(body);

        const shadowMap = shadowTexture();
        const shadowMaterial = new THREE.MeshBasicMaterial({ map: shadowMap, transparent: true, depthWrite: false });
        const shadowGeometry = new THREE.PlaneGeometry(ROVER_SIZE * 1.5, ROVER_SIZE * 1.1);
        const shadow = new THREE.Mesh(shadowGeometry, shadowMaterial);
        shadow.rotation.x = -Math.PI / 2;
        shadow.position.y = 0.5;
        rover.add(shadow);

        let wheels = [];
        let wheelRadius = 3;
        let model = null;
        let disposed = false;

        new GLTFLoader().load('/models/Rover.glb', (gltf) => {
            if (disposed) return;
            model = gltf.scene;
            const box = new THREE.Box3().setFromObject(model);
            const size = box.getSize(new THREE.Vector3());
            const scale = ROVER_SIZE / Math.max(size.x, size.z);
            model.scale.setScalar(scale);
            // sit the wheels on the ground, centred on the rover origin
            const center = box.getCenter(new THREE.Vector3());
            model.position.set(-center.x * scale, -box.min.y * scale, -center.z * scale);
            model.updateMatrixWorld(true);
            wheels = model.children.filter((child) => child.name.startsWith('Wheel'));
            if (wheels[0]) {
                const wheelBox = new THREE.Box3().setFromObject(wheels[0]);
                wheelRadius = Math.max(wheelBox.getSize(new THREE.Vector3()).y / 2, 1);
            }
            body.add(model);
            canvas.style.opacity = '1';
        });

        let width = 1;
        let height = 1;
        const resize = () => {
            width = container.clientWidth || 1;
            height = container.clientHeight || 1;
            renderer.setSize(width, height, false);
            canvas.style.width = '100%';
            canvas.style.height = '100%';
            camera.left = 0;
            camera.right = width;
            camera.top = height;
            camera.bottom = 0;
            camera.updateProjectionMatrix();
            ground.position.y = height * 0.24;
        };
        resize();
        const resizeObserver = new ResizeObserver(resize);
        resizeObserver.observe(container);

        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const state = { x: targetRef.current ?? width / 2, v: 0, dir: 1, yaw: 0.6, time: 0 };
        const clock = new THREE.Clock();
        let frame = 0;
        let running = true;

        const step = (dt) => {
            const target = targetRef.current ?? state.x;
            state.time += dt;

            if (reduceMotion) {
                state.x = target;
                state.v = 0;
            } else {
                const acc = SPRING * (target - state.x) - DAMPING * state.v;
                state.v += acc * dt;
                state.x += state.v * dt;
                body.rotation.x = THREE.MathUtils.clamp(-acc * 0.00012, -0.18, 0.18);
            }
            if (Math.abs(state.v) > 25) state.dir = Math.sign(state.v);
            if (Math.abs(target - state.x) < 0.3 && Math.abs(state.v) < 0.5) {
                state.x = target;
                state.v = 0;
            }

            // face the direction of travel while driving, turn toward the viewer when parked
            const moving = Math.abs(state.v) > 12;
            const desiredYaw = moving ? state.dir * FORWARD_YAW : state.dir * 0.6;
            state.yaw += (desiredYaw - state.yaw) * Math.min(dt * (moving ? 10 : 3.5), 1);

            rover.position.x = state.x;
            rover.rotation.y = state.yaw;
            const speed = Math.min(Math.abs(state.v) / 400, 1);
            body.position.y = Math.abs(Math.sin(state.time * 28)) * 1.2 * speed + Math.sin(state.time * 2) * 0.4;
            wheels.forEach((wheel) => { wheel.rotation.x += (Math.abs(state.v) * dt) / wheelRadius; });
            shadow.scale.setScalar(1 - body.position.y * 0.04);
        };

        const loop = () => {
            if (!running) return;
            step(Math.min(clock.getDelta(), 0.05));
            renderer.render(scene, camera);
            frame = requestAnimationFrame(loop);
        };
        loop();

        const handleVisibility = () => {
            running = !document.hidden;
            if (running) {
                clock.getDelta();
                loop();
            } else {
                cancelAnimationFrame(frame);
            }
        };
        document.addEventListener('visibilitychange', handleVisibility);

        return () => {
            disposed = true;
            running = false;
            cancelAnimationFrame(frame);
            resizeObserver.disconnect();
            document.removeEventListener('visibilitychange', handleVisibility);
            model?.traverse((child) => {
                if (child.isMesh) {
                    child.geometry.dispose();
                    [].concat(child.material).forEach((m) => { m.map?.dispose(); m.dispose(); });
                }
            });
            shadowGeometry.dispose();
            shadowMaterial.dispose();
            shadowMap.dispose();
            renderer.dispose();
            canvas.remove();
        };
    }, []);

    return <div ref={containerRef} aria-hidden className={className} />;
}
