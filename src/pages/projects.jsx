import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FaArrowLeft, FaArrowRight, FaArrowUpRightFromSquare } from 'react-icons/fa6';
import { SectionHeading, easeOut } from '../components/reveal';
import projectData from '../projectData.json';

const slideVariants = {
    enter: (direction) => ({ x: direction > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (direction) => ({ x: direction > 0 ? -80 : 80, opacity: 0 }),
};

// Screenshot that tilts toward the cursor
function TiltImage({ src, alt }) {
    const px = useMotionValue(0.5);
    const py = useMotionValue(0.5);
    const rotateX = useSpring(useTransform(py, [0, 1], [6, -6]), { stiffness: 200, damping: 20 });
    const rotateY = useSpring(useTransform(px, [0, 1], [-8, 8]), { stiffness: 200, damping: 20 });

    const handleMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        px.set((e.clientX - rect.left) / rect.width);
        py.set((e.clientY - rect.top) / rect.height);
    };
    const reset = () => {
        px.set(0.5);
        py.set(0.5);
    };

    return (
        <div className="[perspective:1200px]" onPointerMove={handleMove} onPointerLeave={reset}>
            <motion.div
                style={{ rotateX, rotateY }}
                className="relative rounded-2xl overflow-hidden border border-white/10 bg-ink/60 shadow-2xl shadow-black/50 aspect-[16/10] grid place-items-center"
            >
                <img src={src} alt={alt} className="max-w-full max-h-full object-contain" draggable={false} />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-white/[0.12]" />
            </motion.div>
        </div>
    );
}

function Projects() {
    const [[currentIndex, direction], setSlide] = useState([0, 0]);
    const projects = Array.isArray(projectData) ? projectData : [];

    const paginate = useCallback((step) => {
        setSlide(([index]) => [(index + step + projects.length) % projects.length, step]);
    }, [projects.length]);

    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === 'ArrowRight') paginate(1);
            if (e.key === 'ArrowLeft') paginate(-1);
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [paginate]);

    // Safety check
    if (projects.length === 0) {
        return <div className="p-8 min-h-screen">No projects available</div>;
    }

    const project = projects[currentIndex];

    return (
        <div className="px-6 sm:px-10 xl:px-16 pt-10 lg:pt-16 max-w-7xl mx-auto">
            <SectionHeading eyebrow="// projects" title="Things I've built outside the day job.">
                Freelance, research, and side projects. Swipe, drag, or use the arrow keys to browse.
            </SectionHeading>

            <div className="glass rounded-3xl p-5 sm:p-8 overflow-hidden">
                <AnimatePresence initial={false} custom={direction} mode="wait">
                    <motion.div
                        key={currentIndex}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.45, ease: easeOut }}
                        className="grid lg:grid-cols-[1.35fr_1fr] gap-8 lg:gap-12 items-center cursor-grab active:cursor-grabbing"
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={0.2}
                        onDragEnd={(event, info) => {
                            if (info.offset.x < -80) paginate(1);
                            else if (info.offset.x > 80) paginate(-1);
                        }}
                    >
                        <TiltImage src={project.image} alt={`${project.title} screenshot`} />

                        <div>
                            <p className="font-mono text-xs text-accent mb-3">{project.context}</p>
                            <h3 className="text-2xl sm:text-3xl xl:text-4xl font-bold">{project.title}</h3>
                            <p className="text-slate-400 mt-1">{project.subtitle}</p>
                            <p className="mt-5 text-slate-300 leading-relaxed">{project.description}</p>

                            <div className="flex flex-wrap gap-2 mt-6">
                                {project.skills.map((skill, index) => (
                                    <motion.span
                                        key={skill}
                                        className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full text-xs font-semibold"
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 + index * 0.05 }}
                                    >
                                        {project.icons[index] && (
                                            <span className="grid place-items-center w-5 h-5 rounded-md bg-white/90"><img src={project.icons[index]} alt="" className="w-3.5 h-3.5" /></span>
                                        )}
                                        {skill}
                                    </motion.span>
                                ))}
                            </div>

                            <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                onPointerDownCapture={(e) => e.stopPropagation()}
                                className="group inline-flex items-center gap-2 mt-8 font-semibold text-white border-b border-accent/60 pb-1 hover:border-accent"
                            >
                                View project
                                <FaArrowUpRightFromSquare className="text-sm transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                            </a>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Controls */}
                <div className="flex items-center justify-between gap-4 mt-8 pt-6 border-t border-white/10">
                    <p className="font-mono text-sm text-slate-400 tabular-nums">
                        <span className="text-white">{String(currentIndex + 1).padStart(2, '0')}</span> / {String(projects.length).padStart(2, '0')}
                    </p>

                    <div className="flex items-center gap-2">
                        {projects.map((p, index) => (
                            <button
                                key={p.id}
                                aria-label={`Go to ${p.title}`}
                                className="relative h-1.5 rounded-full bg-white/15 overflow-hidden transition-all duration-300"
                                style={{ width: index === currentIndex ? 36 : 12 }}
                                onClick={() => setSlide([index, index > currentIndex ? 1 : -1])}
                            >
                                {index === currentIndex && (
                                    <motion.span layoutId="project-dot" className="absolute inset-0 bg-gradient-to-r from-accent to-accent-2" />
                                )}
                            </button>
                        ))}
                    </div>

                    <div className="flex gap-2">
                        <ArrowButton onClick={() => paginate(-1)} label="Previous project"><FaArrowLeft /></ArrowButton>
                        <ArrowButton onClick={() => paginate(1)} label="Next project"><FaArrowRight /></ArrowButton>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ArrowButton({ onClick, label, children }) {
    return (
        <motion.button
            onClick={onClick}
            aria-label={label}
            className="grid place-items-center w-11 h-11 rounded-full glass hover:bg-white hover:text-ink transition-colors"
            whileTap={{ scale: 0.9 }}
        >
            {children}
        </motion.button>
    );
}

export default Projects;
