import { FaDatabase, FaServer, FaBolt, FaArrowRight, FaLinkedinIn, FaGithub } from "react-icons/fa6";
import { IoMail } from "react-icons/io5";
import { motion } from "framer-motion";
import { TypeAnimation } from 'react-type-animation';
import { Link } from "react-router-dom";
import { useRef } from "react";
import CountUp from "../components/countUp";
import { easeOut, useRevealed } from "../components/reveal";
import { profile, stats } from "../cvData";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.12, delayChildren: 0.1 }
    }
};

const itemVariants = {
    hidden: { y: 24, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.7, ease: easeOut } }
};

const letterVariants = {
    hidden: { y: '110%' },
    visible: { y: '0%', transition: { duration: 0.8, ease: easeOut } }
};

// Splits a word into letters that slide up from a mask one after another
function AnimatedWord({ text, className = '', delay = 0 }) {
    return (
        <span className={`inline-flex overflow-hidden pb-[0.08em] ${className}`}>
            <motion.span
                className="inline-flex"
                initial="hidden"
                animate="visible"
                variants={{ visible: { transition: { staggerChildren: 0.035, delayChildren: delay } } }}
            >
                {text.split('').map((char, i) => (
                    <motion.span key={i} variants={letterVariants} className="inline-block">
                        {char}
                    </motion.span>
                ))}
            </motion.span>
        </span>
    );
}

const floatingBadges = [
    { icon: FaDatabase, label: 'PostgreSQL', className: '-left-10 top-16', float: [0, -10, 0], duration: 4 },
    { icon: FaBolt, label: '41 min → 3.7 s', className: '-right-12 top-40', float: [0, 12, 0], duration: 5 },
    { icon: FaServer, label: 'Node.js · Rails', className: '-left-6 bottom-14', float: [0, -8, 0], duration: 4.5 },
];

function Home() {
    const statsRef = useRef(null);
    const statsRevealed = useRevealed(statsRef, 40);

    return (
        <div className="px-6 sm:px-10 xl:px-16 pt-8 lg:pt-14 max-w-7xl mx-auto">
            <section className="grid lg:grid-cols-[1.15fr_1fr] gap-12 xl:gap-20 items-center">
                {/* Text Section */}
                <motion.div
                    className="space-y-6 xl:space-y-7"
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                >
                    <motion.div variants={itemVariants}>
                        <span className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs sm:text-sm font-medium text-slate-300">
                            <span className="relative flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                            </span>
                            Backend Engineer @ Rakamin
                        </span>
                    </motion.div>

                    <motion.p className="text-lg sm:text-xl text-slate-300" variants={itemVariants}>
                        Hi! Nice to meet you, I'm
                    </motion.p>

                    <h1 className="text-5xl sm:text-6xl xl:text-7xl font-bold leading-[1.02]">
                        <AnimatedWord text="Dustin" delay={0.3} />{' '}
                        <AnimatedWord text="Lionel." className="text-gradient animate-shimmer" delay={0.5} />
                    </h1>

                    <motion.div variants={itemVariants} className="font-mono text-base sm:text-lg xl:text-xl text-slate-200 cursor-default min-h-[1.75em]">
                        <span className="text-accent">&gt; </span>
                        <TypeAnimation
                            sequence={[
                                'Backend Engineer',
                                1600,
                                'Query Optimizer',
                                1600,
                                'Workflow & API Builder',
                                1600,
                                'AI Integration Engineer',
                                1600,
                            ]}
                            wrapper="span"
                            speed={50}
                            repeat={Infinity}
                        />
                    </motion.div>

                    <motion.p className="max-w-xl text-slate-300/90 leading-relaxed sm:text-lg" variants={itemVariants}>
                        {profile.tagline}
                    </motion.p>

                    <motion.div className="flex flex-wrap items-center gap-3 pt-2" variants={itemVariants}>
                        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                            <Link
                                to="/experience"
                                className="group inline-flex items-center gap-2 bg-white text-ink px-6 py-3 rounded-full font-semibold shadow-[0_0_30px_-8px] shadow-accent/70"
                            >
                                See my experience
                                <FaArrowRight className="transition-transform group-hover:translate-x-1" />
                            </Link>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                            <Link to="/contact" className="inline-flex items-center gap-2 glass px-6 py-3 rounded-full font-semibold hover:bg-white/10 transition-colors">
                                Get in touch
                            </Link>
                        </motion.div>
                        <div className="flex gap-2 ml-1">
                            <SocialIcon href={profile.linkedin} label="LinkedIn"><FaLinkedinIn /></SocialIcon>
                            <SocialIcon href={profile.github} label="GitHub"><FaGithub /></SocialIcon>
                            <SocialIcon href={`mailto:${profile.email}`} label="Email"><IoMail /></SocialIcon>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Portrait Section */}
                <motion.div
                    className="relative mx-auto w-full max-w-[300px] sm:max-w-[340px] xl:max-w-[380px] aspect-[4/5] mt-6 lg:mt-0"
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.9, delay: 0.3, ease: easeOut }}
                >
                    {/* Rotating gradient ring */}
                    <div className="absolute -inset-[2px] rounded-[2.2rem] overflow-hidden">
                        <div className="absolute inset-[-50%] bg-[conic-gradient(from_0deg,transparent_0%,var(--color-accent)_20%,transparent_40%,var(--color-accent-2)_70%,transparent_90%)] animate-spin-slow" />
                    </div>
                    <div className="absolute inset-0 rounded-[2.1rem] bg-gradient-to-b from-[#1E3A8A] via-primary to-ink overflow-hidden">
                        <div className="absolute inset-0 bg-grid opacity-60" />
                        <div className="absolute left-1/2 top-1/3 -translate-x-1/2 w-56 h-56 rounded-full bg-accent/30 blur-3xl" />
                        <motion.img
                            src="/profilepic.png"
                            alt="Dustin Lionel"
                            className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[118%] max-w-none object-contain object-bottom"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.6, ease: easeOut }}
                        />
                        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink via-ink/60 to-transparent" />
                    </div>

                    {/* Floating badges */}
                    {floatingBadges.map(({ icon: Icon, label, className, float, duration }, i) => (
                        <motion.div
                            key={label}
                            className={`absolute ${className} hidden sm:block`}
                            initial={{ opacity: 0, scale: 0.6 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 1 + i * 0.15, type: 'spring', stiffness: 200, damping: 14 }}
                        >
                            <motion.div
                                className="flex items-center gap-2 glass bg-ink/60 rounded-2xl px-3.5 py-2.5 shadow-xl text-sm font-semibold whitespace-nowrap"
                                animate={{ y: float }}
                                transition={{ duration, repeat: Infinity, ease: 'easeInOut' }}
                            >
                                <span className="grid place-items-center w-7 h-7 rounded-lg bg-gradient-to-br from-accent to-accent-2 text-ink">
                                    <Icon size={14} />
                                </span>
                                {label}
                            </motion.div>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            {/* Stats */}
            <motion.section
                className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-16 lg:mt-24"
                ref={statsRef}
                initial="hidden"
                animate={statsRevealed ? 'visible' : 'hidden'}
                variants={{ visible: { transition: { staggerChildren: 0.1, delayChildren: 0.4 } } }}
            >
                {stats.map((stat) => (
                    <motion.div
                        key={stat.label}
                        variants={itemVariants}
                        whileHover={{ y: -4 }}
                        className="glass rounded-2xl p-5 sm:p-6 hover:border-accent/40 transition-colors"
                    >
                        <p className="font-display text-3xl sm:text-4xl font-bold text-white">
                            <CountUp {...stat} />
                        </p>
                        <p className="mt-1 text-xs sm:text-sm text-slate-400">{stat.label}</p>
                    </motion.div>
                ))}
            </motion.section>
        </div>
    );
}

function SocialIcon({ href, label, children }) {
    return (
        <motion.a
            href={href}
            target={href.startsWith('mailto:') ? undefined : '_blank'}
            rel="noopener noreferrer"
            aria-label={label}
            className="grid place-items-center w-11 h-11 rounded-full glass text-slate-200 hover:text-white hover:bg-white/10 transition-colors"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.92 }}
        >
            {children}
        </motion.a>
    );
}

export default Home;
