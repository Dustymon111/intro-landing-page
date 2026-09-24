import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export const easeOut = [0.22, 1, 0.36, 1];

// Seconds to hold back reveals of content that is already on screen when a page
// mounts, so they play after the route transition instead of underneath it.
export const PAGE_ENTER_DELAY = 0.2;

// Truthy once the element has been on screen: 'mount' if it was visible on first
// render, 'scroll' if it came into view later. Measures on mount, scroll and resize
// instead of relying on IntersectionObserver, which can miss elements that are
// already visible when the page first renders.
export function useRevealed(ref, offset = 60) {
    const [revealed, setRevealed] = useState(false);

    useEffect(() => {
        if (revealed) return;
        const check = (reason) => {
            const el = ref.current;
            if (!el) return;
            const rect = el.getBoundingClientRect();
            const atPageBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
            if (rect.bottom > 0 && (rect.top < window.innerHeight - offset || (atPageBottom && rect.top < window.innerHeight))) {
                setRevealed(reason);
            }
        };
        check('mount');
        const frame = requestAnimationFrame(() => check('mount'));
        const onScroll = () => check('scroll');
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);
        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
        };
    }, [ref, offset, revealed]);

    return revealed;
}

// Fades and lifts its children into place the first time they scroll into view.
// `delay` staggers siblings that appear together on page load.
export default function Reveal({ children, delay = 0, y = 32, className = '' }) {
    const ref = useRef(null);
    const revealed = useRevealed(ref);
    const totalDelay = revealed === 'mount' ? PAGE_ENTER_DELAY + delay : Math.min(delay, 0.15);

    return (
        <motion.div
            ref={ref}
            className={className}
            initial={{ opacity: 0, y }}
            animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y }}
            transition={{ duration: 0.8, delay: totalDelay, ease: easeOut }}
        >
            {children}
        </motion.div>
    );
}

export function SectionHeading({ eyebrow, title, children }) {
    return (
        <Reveal className="mb-10 max-w-2xl">
            <p className="font-mono text-xs sm:text-sm text-accent mb-3">{eyebrow}</p>
            <h2 className="text-3xl sm:text-4xl xl:text-5xl font-bold">{title}</h2>
            {children && <p className="mt-4 text-slate-300/90 leading-relaxed">{children}</p>}
        </Reveal>
    );
}
