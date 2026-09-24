import { useEffect, useRef } from 'react';
import * as THREE from 'three';

// A slowly spinning globe of connected nodes with glowing "packets" travelling
// along the edges, like requests moving between services.
const NODE_COUNT = 120;
const RADIUS = 2.4;
const NEIGHBORS = 3;
const PACKET_COUNT = 40;

const SKY = new THREE.Color('#38BDF8');
const INDIGO = new THREE.Color('#818CF8');

// Evenly spread points over a sphere, with a little radial jitter so it feels organic
function fibonacciSphere(count, radius) {
    const points = [];
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < count; i++) {
        const y = 1 - (i / (count - 1)) * 2;
        const ring = Math.sqrt(1 - y * y);
        const theta = golden * i;
        const r = radius * (0.92 + Math.random() * 0.16);
        points.push(new THREE.Vector3(Math.cos(theta) * ring * r, y * r, Math.sin(theta) * ring * r));
    }
    return points;
}

// Connects each node to its nearest neighbours; returns unique edges and an adjacency list
function buildEdges(points) {
    const seen = new Set();
    const edges = [];
    const adjacency = points.map(() => []);
    points.forEach((p, i) => {
        const nearest = points
            .map((q, j) => [j, p.distanceToSquared(q)])
            .filter(([j]) => j !== i)
            .sort((a, b) => a[1] - b[1])
            .slice(0, NEIGHBORS);
        for (const [j] of nearest) {
            const key = i < j ? `${i}-${j}` : `${j}-${i}`;
            if (seen.has(key)) continue;
            seen.add(key);
            edges.push([i, j]);
            adjacency[i].push(j);
            adjacency[j].push(i);
        }
    });
    return { edges, adjacency };
}

// Soft round points that fade toward the back of the sphere
const pointVertex = `
    attribute float aSize;
    attribute float aPhase;
    attribute vec3 aColor;
    uniform float uTime;
    uniform float uScale;
    varying vec3 vColor;
    varying float vDepth;
    void main() {
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        gl_Position = projectionMatrix * mv;
        float pulse = 0.8 + 0.3 * sin(uTime * 1.6 + aPhase);
        gl_PointSize = uScale * aSize * pulse / -mv.z;
        vColor = aColor;
        vDepth = smoothstep(-11.0, -6.2, mv.z);
    }
`;
const pointFragment = `
    varying vec3 vColor;
    varying float vDepth;
    void main() {
        float d = length(gl_PointCoord - 0.5);
        float alpha = pow(smoothstep(0.5, 0.0, d), 1.6);
        gl_FragColor = vec4(vColor, alpha * (0.25 + 0.75 * vDepth));
    }
`;
const lineVertex = `
    varying float vDepth;
    void main() {
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        gl_Position = projectionMatrix * mv;
        vDepth = smoothstep(-11.0, -6.2, mv.z);
    }
`;
const lineFragment = `
    uniform vec3 uColor;
    uniform float uOpacity;
    varying float vDepth;
    void main() {
        gl_FragColor = vec4(uColor, uOpacity * (0.12 + 0.88 * vDepth));
    }
`;

// Glowing rim for the core sphere (brighter where the surface turns away from the camera)
const coreVertex = `
    varying vec3 vNormal;
    varying vec3 vView;
    void main() {
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        vNormal = normalize(normalMatrix * normal);
        vView = normalize(-mv.xyz);
        gl_Position = projectionMatrix * mv;
    }
`;
const coreFragment = `
    uniform vec3 uColor;
    uniform float uTime;
    varying vec3 vNormal;
    varying vec3 vView;
    void main() {
        float rim = pow(1.0 - max(dot(vNormal, vView), 0.0), 2.2);
        float pulse = 0.75 + 0.25 * sin(uTime * 2.0);
        gl_FragColor = vec4(uColor, (rim * 1.2 + 0.08) * pulse);
    }
`;

function makePointMaterial(uniforms) {
    return new THREE.ShaderMaterial({
        uniforms,
        vertexShader: pointVertex,
        fragmentShader: pointFragment,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
    });
}

function makeLineMaterial(color, opacity) {
    return new THREE.ShaderMaterial({
        uniforms: { uColor: { value: new THREE.Color(color) }, uOpacity: { value: opacity } },
        vertexShader: lineVertex,
        fragmentShader: lineFragment,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
    });
}

export default function NetworkSphere({ className = '' }) {
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        let renderer;
        try {
            renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' });
        } catch {
            return; // No WebGL: skip the effect quietly
        }
        const pixelRatio = Math.min(window.devicePixelRatio, 2);
        renderer.setPixelRatio(pixelRatio);
        renderer.setClearColor(0x000000, 0);
        const canvas = renderer.domElement;
        canvas.style.opacity = '0';
        canvas.style.transition = 'opacity 1.4s ease';
        container.appendChild(canvas);

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 50);
        camera.position.set(0, 0, 8.6);

        // tilt follows the pointer, spin rotates continuously inside it
        const tilt = new THREE.Group();
        const spin = new THREE.Group();
        tilt.add(spin);
        scene.add(tilt);

        const uniforms = { uTime: { value: 0 }, uScale: { value: 110 * pixelRatio } };

        // Nodes
        const nodes = fibonacciSphere(NODE_COUNT, RADIUS);
        const nodeGeometry = new THREE.BufferGeometry().setFromPoints(nodes);
        const nodeColors = new Float32Array(NODE_COUNT * 3);
        const nodeSizes = new Float32Array(NODE_COUNT);
        const nodePhases = new Float32Array(NODE_COUNT);
        nodes.forEach((p, i) => {
            const c = SKY.clone().lerp(INDIGO, (p.y / RADIUS + 1) / 2);
            c.toArray(nodeColors, i * 3);
            nodeSizes[i] = Math.random() < 0.12 ? 1.8 : 0.7 + Math.random() * 0.5; // a few "hub" nodes
            nodePhases[i] = Math.random() * Math.PI * 2;
        });
        nodeGeometry.setAttribute('aColor', new THREE.BufferAttribute(nodeColors, 3));
        nodeGeometry.setAttribute('aSize', new THREE.BufferAttribute(nodeSizes, 1));
        nodeGeometry.setAttribute('aPhase', new THREE.BufferAttribute(nodePhases, 1));
        const nodeMaterial = makePointMaterial(uniforms);
        spin.add(new THREE.Points(nodeGeometry, nodeMaterial));

        // Edges
        const { edges, adjacency } = buildEdges(nodes);
        const edgePositions = new Float32Array(edges.length * 6);
        edges.forEach(([a, b], i) => {
            nodes[a].toArray(edgePositions, i * 6);
            nodes[b].toArray(edgePositions, i * 6 + 3);
        });
        const edgeGeometry = new THREE.BufferGeometry();
        edgeGeometry.setAttribute('position', new THREE.BufferAttribute(edgePositions, 3));
        const edgeMaterial = makeLineMaterial('#60A5FA', 0.32);
        spin.add(new THREE.LineSegments(edgeGeometry, edgeMaterial));

        // Core: rim-lit sphere, counter-rotating wireframe shell and a soft halo
        const core = new THREE.Group();
        spin.add(core);
        const coreGeometry = new THREE.SphereGeometry(0.62, 48, 48);
        const coreMaterial = new THREE.ShaderMaterial({
            uniforms: { uColor: { value: SKY.clone() }, uTime: uniforms.uTime },
            vertexShader: coreVertex,
            fragmentShader: coreFragment,
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
        });
        core.add(new THREE.Mesh(coreGeometry, coreMaterial));
        const shellGeometry = new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(1.0, 1));
        const shellMaterial = makeLineMaterial('#7DD3FC', 0.7);
        const shell = new THREE.LineSegments(shellGeometry, shellMaterial);
        core.add(shell);
        const haloGeometry = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3()]);
        haloGeometry.setAttribute('aColor', new THREE.BufferAttribute(new Float32Array([0.35, 0.45, 0.95]), 3));
        haloGeometry.setAttribute('aSize', new THREE.BufferAttribute(new Float32Array([16]), 1));
        haloGeometry.setAttribute('aPhase', new THREE.BufferAttribute(new Float32Array([0]), 1));
        core.add(new THREE.Points(haloGeometry, nodeMaterial));

        // Spokes from hub nodes to the core
        const hubs = nodes.filter((_, i) => nodeSizes[i] > 1.5);
        const spokePositions = new Float32Array(hubs.length * 6);
        hubs.forEach((hub, i) => {
            hub.clone().setLength(1.0).toArray(spokePositions, i * 6);
            hub.toArray(spokePositions, i * 6 + 3);
        });
        const spokeGeometry = new THREE.BufferGeometry();
        spokeGeometry.setAttribute('position', new THREE.BufferAttribute(spokePositions, 3));
        const spokeMaterial = makeLineMaterial('#818CF8', 0.22);
        spin.add(new THREE.LineSegments(spokeGeometry, spokeMaterial));

        // Packets travelling along edges (random walk from node to node)
        const packets = Array.from({ length: PACKET_COUNT }, () => {
            const from = Math.floor(Math.random() * NODE_COUNT);
            const to = adjacency[from][Math.floor(Math.random() * adjacency[from].length)];
            return { from, to, t: Math.random(), speed: 0.35 + Math.random() * 0.5 };
        });
        const packetPositions = new Float32Array(PACKET_COUNT * 3);
        const packetGeometry = new THREE.BufferGeometry();
        packetGeometry.setAttribute('position', new THREE.BufferAttribute(packetPositions, 3));
        packetGeometry.setAttribute('aColor', new THREE.BufferAttribute(new Float32Array(PACKET_COUNT * 3).fill(1), 3));
        packetGeometry.setAttribute('aSize', new THREE.BufferAttribute(new Float32Array(PACKET_COUNT).fill(1.6), 1));
        packetGeometry.setAttribute('aPhase', new THREE.BufferAttribute(new Float32Array(PACKET_COUNT).map(() => Math.random() * 6), 1));
        const packetMaterial = makePointMaterial(uniforms);
        spin.add(new THREE.Points(packetGeometry, packetMaterial));

        // Two tilted orbit rings, each carrying a satellite
        const ringGeometries = [];
        const satellites = [];
        const orbitMaterial = makeLineMaterial('#818CF8', 0.35);
        [[1.15, 0.3, 3.05], [-0.9, -0.5, 3.35]].forEach(([rx, rz, r]) => {
            const orbit = new THREE.Group();
            orbit.rotation.set(rx, 0, rz);
            const curve = new THREE.EllipseCurve(0, 0, r, r).getPoints(128).map((p) => new THREE.Vector3(p.x, p.y, 0));
            const geometry = new THREE.BufferGeometry().setFromPoints(curve);
            ringGeometries.push(geometry);
            orbit.add(new THREE.LineLoop(geometry, orbitMaterial));
            const satGeometry = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(r, 0, 0)]);
            satGeometry.setAttribute('aColor', new THREE.BufferAttribute(new Float32Array([0.6, 0.9, 1]), 3));
            satGeometry.setAttribute('aSize', new THREE.BufferAttribute(new Float32Array([2.4]), 1));
            satGeometry.setAttribute('aPhase', new THREE.BufferAttribute(new Float32Array([0]), 1));
            ringGeometries.push(satGeometry);
            const satellite = new THREE.Group();
            satellite.add(new THREE.Points(satGeometry, nodeMaterial));
            orbit.add(satellite);
            satellites.push(satellite);
            tilt.add(orbit);
        });

        const updatePackets = (dt) => {
            const a = new THREE.Vector3();
            packets.forEach((p, i) => {
                p.t += p.speed * dt;
                if (p.t >= 1) {
                    const options = adjacency[p.to].filter((n) => n !== p.from);
                    p.from = p.to;
                    p.to = options.length ? options[Math.floor(Math.random() * options.length)] : adjacency[p.from][0];
                    p.t = 0;
                }
                a.lerpVectors(nodes[p.from], nodes[p.to], p.t).toArray(packetPositions, i * 3);
            });
            packetGeometry.attributes.position.needsUpdate = true;
        };

        const resize = () => {
            const { clientWidth: w, clientHeight: h } = container;
            if (!w || !h) return;
            renderer.setSize(w, h, false);
            canvas.style.width = '100%';
            canvas.style.height = '100%';
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
        };
        resize();
        const resizeObserver = new ResizeObserver(resize);
        resizeObserver.observe(container);

        const pointer = { x: 0, y: 0 };
        const handlePointer = (e) => {
            pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
            pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
        };
        window.addEventListener('pointermove', handlePointer);

        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const clock = new THREE.Clock();
        let frame = 0;
        let running = true;

        const render = () => {
            const dt = Math.min(clock.getDelta(), 0.05);
            uniforms.uTime.value += dt;
            spin.rotation.y += dt * 0.12;
            shell.rotation.y -= dt * 0.5;
            shell.rotation.x += dt * 0.2;
            tilt.rotation.x += (pointer.y * 0.35 + 0.15 - tilt.rotation.x) * 0.04;
            tilt.rotation.y += (pointer.x * 0.45 - tilt.rotation.y) * 0.04;
            satellites[0].rotation.z += dt * 0.5;
            satellites[1].rotation.z -= dt * 0.35;
            updatePackets(dt);
            renderer.render(scene, camera);
        };
        const loop = () => {
            if (!running) return;
            render();
            frame = requestAnimationFrame(loop);
        };

        updatePackets(0);
        if (reduceMotion) {
            renderer.render(scene, camera);
        } else {
            loop();
        }
        requestAnimationFrame(() => { canvas.style.opacity = '1'; });

        // Pause while the tab is hidden
        const handleVisibility = () => {
            if (reduceMotion) return;
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
            running = false;
            cancelAnimationFrame(frame);
            resizeObserver.disconnect();
            window.removeEventListener('pointermove', handlePointer);
            document.removeEventListener('visibilitychange', handleVisibility);
            [nodeGeometry, edgeGeometry, packetGeometry, coreGeometry, shellGeometry, haloGeometry, spokeGeometry, ...ringGeometries].forEach((g) => g.dispose());
            [nodeMaterial, edgeMaterial, packetMaterial, orbitMaterial, coreMaterial, shellMaterial, spokeMaterial].forEach((m) => m.dispose());
            renderer.dispose();
            canvas.remove();
        };
    }, []);

    return <div ref={containerRef} aria-hidden className={className} />;
}
