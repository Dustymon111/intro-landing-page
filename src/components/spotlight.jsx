import { useEffect } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';

// Soft glow that trails the cursor (desktop only).
export default function Spotlight() {
    const x = useMotionValue(-1000);
    const y = useMotionValue(-1000);
    const springX = useSpring(x, { stiffness: 150, damping: 25 });
    const springY = useSpring(y, { stiffness: 150, damping: 25 });

    useEffect(() => {
        const handleMove = (e) => {
            x.set(e.clientX);
            y.set(e.clientY);
        };
        window.addEventListener('pointermove', handleMove);
        return () => window.removeEventListener('pointermove', handleMove);
    }, [x, y]);

    const background = useMotionTemplate`radial-gradient(520px circle at ${springX}px ${springY}px, rgba(56, 189, 248, 0.09), transparent 70%)`;

    return <motion.div aria-hidden className="pointer-events-none fixed inset-0 z-0 hidden lg:block" style={{ background }} />;
}
