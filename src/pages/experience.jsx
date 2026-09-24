import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGraduationCap, FaUsers } from 'react-icons/fa6';
import Reveal, { SectionHeading, easeOut, useRevealed, PAGE_ENTER_DELAY } from '../components/reveal';
import { experience, impact, organization, education } from '../cvData';

// Renders a CV bullet with its metric emphasised
export function Bullet({ item, as: Tag = 'li', ...rest }) {
    const metric = item.metric && <strong className="font-semibold text-white">{item.metric}</strong>;
    return (
        <Tag className="relative pl-5 text-slate-300 leading-relaxed" {...rest}>
            <span className="absolute left-0 top-[0.7em] w-1.5 h-1.5 rounded-full bg-accent/80" />
            {item.after
                ? <>{item.text} {metric} {item.after}</>
                : <>{metric} {item.text}</>}
        </Tag>
    );
}

function ImpactCard() {
    const barsRef = useRef(null);
    const revealed = useRevealed(barsRef, 40);
    // Bars start shrinking once the card itself has faded in
    const barsDelay = (revealed === 'mount' ? PAGE_ENTER_DELAY + 0.1 : 0) + 0.5;

    return (
        <Reveal delay={0.1} className="glass rounded-3xl overflow-hidden mb-16">
            <div className="flex items-center gap-2 px-5 py-3 border-b border-white/10 bg-white/[0.03]">
                <span className="w-3 h-3 rounded-full bg-rose-400/80" />
                <span className="w-3 h-3 rounded-full bg-amber-400/80" />
                <span className="w-3 h-3 rounded-full bg-emerald-400/80" />
                <span className="ml-3 font-mono text-xs text-slate-400">perf.log — before vs after</span>
            </div>
            <div ref={barsRef} className="p-5 sm:p-8 space-y-7">
                {impact.map((row, i) => (
                    <div key={row.label}>
                        <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2.5">
                            <p className="font-semibold">{row.label}</p>
                            <p className="font-mono text-sm">
                                <span className="text-slate-500 line-through decoration-rose-400/60">{row.before}</span>
                                <span className="text-slate-500 mx-2">→</span>
                                <span className="text-accent font-semibold">{row.after}</span>
                            </p>
                        </div>
                        <div className="relative h-2.5 rounded-full bg-white/5 overflow-hidden">
                            <motion.div
                                className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-accent to-accent-2 shadow-[0_0_16px] shadow-accent/60"
                                initial={{ width: '100%' }}
                                animate={revealed ? { width: `${Math.max(row.ratio * 100, 1.5)}%` } : { width: '100%' }}
                                transition={{ duration: 1.6, delay: barsDelay + i * 0.2, ease: easeOut }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </Reveal>
    );
}

function GroupTabs({ groups }) {
    const [active, setActive] = useState(0);
    const group = groups[active];

    return (
        <div className="mt-6">
            <div className="flex gap-1 border-b border-white/10 overflow-x-auto [scrollbar-width:none] -mx-1 px-1" role="tablist">
                {groups.map((g, i) => (
                    <button
                        key={g.title}
                        role="tab"
                        aria-selected={active === i}
                        onClick={() => setActive(i)}
                        className={`relative shrink-0 whitespace-nowrap px-3 sm:px-4 py-2.5 text-sm font-semibold transition-colors ${active === i ? 'text-white' : 'text-slate-400 hover:text-slate-200'}`}
                    >
                        {g.title}
                        {active === i && (
                            <motion.span
                                layoutId="exp-tab"
                                className="absolute left-0 right-0 -bottom-px h-0.5 bg-gradient-to-r from-accent to-accent-2"
                                transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                            />
                        )}
                    </button>
                ))}
            </div>
            <AnimatePresence mode="wait">
                <motion.ul
                    key={group.title}
                    className="mt-5 space-y-3"
                    initial="hidden"
                    animate="visible"
                    exit={{ opacity: 0, transition: { duration: 0.15 } }}
                    variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
                >
                    {group.items.map((item, i) => (
                        <Bullet
                            key={i}
                            item={item}
                            as={motion.li}
                            variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: easeOut } } }}
                        />
                    ))}
                </motion.ul>
            </AnimatePresence>
        </div>
    );
}

function Experience() {
    return (
        <div className="px-6 sm:px-10 xl:px-16 pt-10 lg:pt-16 max-w-5xl mx-auto">
            <SectionHeading eyebrow="// experience" title="Shipping backend work that people rely on.">
                Production experience across HR technology platforms: workflows, access control, query performance, and AI pipelines.
            </SectionHeading>

            <ImpactCard />

            {/* Timeline */}
            <div className="relative">
                <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-accent via-accent-2/50 to-transparent" />
                <div className="space-y-10">
                    {experience.map((job, index) => (
                        <Reveal key={job.company} delay={0.2 + index * 0.1} className="relative pl-7 sm:pl-10">
                            <span className="absolute left-0 top-2 grid place-items-center w-[15px] h-[15px]">
                                {job.current && <span className="absolute inset-0 rounded-full bg-accent animate-ping opacity-60" />}
                                <span className={`relative w-[15px] h-[15px] rounded-full border-2 border-ink ${job.current ? 'bg-accent' : 'bg-slate-500'}`} />
                            </span>
                            <motion.div
                                className="glass rounded-3xl p-5 sm:p-8 hover:border-white/20 transition-colors"
                                whileHover={{ y: -2 }}
                            >
                                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                                    <div>
                                        <h3 className="text-xl sm:text-2xl font-bold">{job.role}</h3>
                                        <p className="text-accent font-medium">{job.company}</p>
                                    </div>
                                    <span className="self-start font-mono text-xs sm:text-sm text-slate-400 glass rounded-full px-3 py-1 whitespace-nowrap">
                                        {job.period}
                                    </span>
                                </div>
                                <ul className="mt-4 space-y-3">
                                    {job.summary.map((item, i) => <Bullet key={i} item={item} />)}
                                </ul>
                                {job.groups.length > 0 && <GroupTabs groups={job.groups} />}
                            </motion.div>
                        </Reveal>
                    ))}
                </div>
            </div>

            {/* Organization & Education */}
            <div className="grid md:grid-cols-2 gap-5 mt-16">
                <Reveal className="glass rounded-3xl p-6 sm:p-8">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="grid place-items-center w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-accent-2 text-ink"><FaUsers /></span>
                        <p className="font-mono text-xs text-slate-400">organization · {organization.period}</p>
                    </div>
                    <h3 className="text-xl font-bold">{organization.role}</h3>
                    <p className="text-accent font-medium mb-4">{organization.name}</p>
                    <ul className="space-y-3">
                        {organization.items.map((item, i) => <Bullet key={i} item={item} />)}
                    </ul>
                </Reveal>
                <Reveal className="glass rounded-3xl p-6 sm:p-8" delay={0.1}>
                    <div className="flex items-center gap-3 mb-4">
                        <span className="grid place-items-center w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-accent-2 text-ink"><FaGraduationCap /></span>
                        <p className="font-mono text-xs text-slate-400">education · {education.period}</p>
                    </div>
                    <h3 className="text-xl font-bold">{education.degree}</h3>
                    <p className="text-accent font-medium mb-6">{education.school}</p>
                    <p className="font-display text-5xl font-bold text-gradient">{education.gpa.split(' ')[0]}</p>
                    <p className="text-sm text-slate-400 mt-1">GPA out of 4.00</p>
                </Reveal>
            </div>
        </div>
    );
}

export default Experience;
