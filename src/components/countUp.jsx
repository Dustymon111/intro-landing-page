import { useEffect, useRef, useState } from 'react';
import { animate } from 'framer-motion';
import { useRevealed } from './reveal';

// Counts from 0 to `value` once the number scrolls into view.
export default function CountUp({ value, decimals = 0, prefix = '', suffix = '', duration = 1.6 }) {
    const ref = useRef(null);
    const inView = useRevealed(ref, 40);
    const [display, setDisplay] = useState((0).toFixed(decimals));

    useEffect(() => {
        if (!inView) return;
        const controls = animate(0, value, {
            duration,
            ease: [0.22, 1, 0.36, 1],
            onUpdate: (latest) => setDisplay(latest.toFixed(decimals)),
        });
        return () => controls.stop();
    }, [inView, value, decimals, duration]);

    return (
        <span ref={ref} className="tabular-nums">
            {prefix}{display}{suffix}
        </span>
    );
}
