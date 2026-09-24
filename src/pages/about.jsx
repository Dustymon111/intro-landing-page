import { useRef } from 'react';
import { motion } from 'framer-motion';
import { FaCertificate, FaLanguage } from 'react-icons/fa6';
import MusicPlayer from "../components/music";
import Reveal, { SectionHeading, easeOut, useRevealed } from '../components/reveal';
import { profile, skillGroups, certifications, spokenLanguages } from '../cvData';

function SkillChips({ skills }) {
    const ref = useRef(null);
    const revealed = useRevealed(ref, 40);

    return (
        <motion.div
            ref={ref}
            className="flex flex-wrap gap-2"
            initial="hidden"
            animate={revealed ? 'visible' : 'hidden'}
            variants={{ visible: { transition: { staggerChildren: 0.03, delayChildren: 0.2 } } }}
        >
            {skills.map((skill) => (
                <motion.span
                    key={skill.name}
                    variants={{ hidden: { opacity: 0, scale: 0.85 }, visible: { opacity: 1, scale: 1 } }}
                    whileHover={{ y: -2 }}
                    className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 hover:border-accent/50 px-3 py-1.5 rounded-full text-sm transition-colors"
                >
                    {skill.icon && <span className="grid place-items-center w-5 h-5 rounded-md bg-white/90"><img src={skill.icon} alt="" className="w-3.5 h-3.5" /></span>}
                    {skill.name}
                </motion.span>
            ))}
        </motion.div>
    );
}

function About() {
    return (
        <div className="px-6 sm:px-10 xl:px-16 pt-10 lg:pt-16 max-w-6xl mx-auto">
            {/* Intro */}
            <section className="grid md:grid-cols-[auto_1fr] gap-10 lg:gap-16 items-center">
                <motion.div
                    className="relative mx-auto w-52 h-52 lg:w-64 lg:h-64"
                    initial={{ opacity: 0, scale: 0.9, rotate: -4 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ duration: 0.8, ease: easeOut }}
                >
                    <div className="absolute -inset-3 rounded-[2.5rem] bg-gradient-to-br from-accent/40 to-accent-2/40 blur-2xl" />
                    <motion.img
                        src="/profilepic2.png"
                        alt="Dustin Lionel"
                        className="relative w-full h-full object-cover object-[center_40%] rounded-[2rem] border border-white/15"
                        whileHover={{ scale: 1.03, rotate: 1.5 }}
                        transition={{ type: 'spring', stiffness: 250, damping: 18 }}
                    />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.15, ease: easeOut }}
                >
                    <p className="font-mono text-xs sm:text-sm text-accent mb-3">// about me</p>
                    <h1 className="text-3xl sm:text-4xl xl:text-5xl font-bold mb-5">
                        Backend engineer who cares about <span className="text-gradient">the boring parts</span> going right.
                    </h1>
                    <p className="text-slate-300 leading-relaxed sm:text-lg">{profile.summary}</p>
                </motion.div>
            </section>

            {/* Skills */}
            <section className="mt-24">
                <SectionHeading eyebrow="// toolbox" title="Skills & stack" />
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {skillGroups.map((group, gi) => (
                        <Reveal key={group.title} delay={gi * 0.06} className="glass rounded-2xl p-6 hover:border-white/20 transition-colors">
                            <h3 className="font-semibold text-lg mb-4">{group.title}</h3>
                            <SkillChips skills={group.skills} />
                        </Reveal>
                    ))}

                    <Reveal delay={0.3} className="glass rounded-2xl p-6 sm:col-span-2 lg:col-span-1">
                        <h3 className="font-semibold text-lg mb-4 flex items-center gap-2"><FaCertificate className="text-accent" /> Certifications</h3>
                        <ul className="space-y-2 text-sm text-slate-300">
                            {certifications.map((cert) => <li key={cert}>{cert}</li>)}
                        </ul>
                        <h3 className="font-semibold text-lg mt-6 mb-3 flex items-center gap-2"><FaLanguage className="text-accent" /> Languages</h3>
                        <p className="text-sm text-slate-300">{spokenLanguages.join(' · ')}</p>
                    </Reveal>
                </div>
            </section>

            {/* Bonus */}
            <section className="mt-24 grid md:grid-cols-2 gap-10 items-center">
                <Reveal>
                    <p className="font-mono text-xs sm:text-sm text-accent mb-3">// off the clock</p>
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4">I make music too!</h2>
                    <p className="text-slate-300 leading-relaxed">
                        These are tracks I composed for <span className="text-white font-semibold">Budi Goes To School</span>, a 2D game I worked on. Hit play while you browse.
                    </p>
                </Reveal>
                <Reveal delay={0.1}>
                    <MusicPlayer />
                </Reveal>
            </section>
        </div>
    );
}

export default About;
