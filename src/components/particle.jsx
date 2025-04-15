// ParticleBackground.jsx
import React, { useEffect, useRef } from 'react';

const ParticleBackground = ({
    particleCount = 100,
    particleColor = 'rgba(255, 255, 255, 0.7)',
    particleSize = 2,
    fallSpeed = 1,
    wind = 0.5,
    style = 'rain' // 'rain' or 'light'
}) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let particles = [];

        // Resize canvas to match window size
        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles(); // Reinitialize particles when resizing
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        function initParticles() {
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: style === 'light' ? Math.random() * particleSize + 0.5 : particleSize,
                    speedY: style === 'light' ? (Math.random() * fallSpeed * 0.5) : (Math.random() * fallSpeed + 0.5),
                    speedX: style === 'light' ? ((Math.random() - 0.5) * wind) : ((Math.random() - 0.5) * wind * 0.3),
                    opacity: style === 'light' ? Math.random() * 0.8 + 0.2 : 0.7
                });
            }
        }

        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(particle => {
                if (style === 'rain') {
                    // Draw rain drop
                    ctx.beginPath();
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(particle.x + particle.speedX, particle.y + particle.speedY * 2);
                    ctx.strokeStyle = particleColor;
                    ctx.globalAlpha = particle.opacity;
                    ctx.lineWidth = particle.size / 2;
                    ctx.stroke();
                } else {
                    // Draw light particle with glow
                    ctx.beginPath();
                    const gradient = ctx.createRadialGradient(
                        particle.x, particle.y, 0,
                        particle.x, particle.y, particle.size * 2
                    );
                    gradient.addColorStop(0, particleColor);
                    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

                    ctx.fillStyle = gradient;
                    ctx.globalAlpha = particle.opacity;
                    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                    ctx.fill();
                }
            });
        }

        function update() {
            particles.forEach(particle => {
                // Update position
                particle.y += particle.speedY;
                particle.x += particle.speedX;

                // Reset particles that go off screen
                if (particle.y > canvas.height) {
                    particle.y = 0;
                    particle.x = Math.random() * canvas.width;
                }

                if (particle.x > canvas.width) {
                    particle.x = 0;
                } else if (particle.x < 0) {
                    particle.x = canvas.width;
                }

                // For light style, make particles twinkle
                if (style === 'light') {
                    if (Math.random() > 0.99) {
                        particle.opacity = Math.random() * 0.8 + 0.2;
                    }
                }
            });
        }

        function animate() {
            draw();
            update();
            animationFrameId = requestAnimationFrame(animate);
        }

        initParticles();
        animate();

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, [particleCount, particleColor, particleSize, fallSpeed, wind, style]);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 0
            }}
        />
    );
};

export default ParticleBackground;