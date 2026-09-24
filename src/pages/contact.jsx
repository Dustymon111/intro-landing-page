import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaArrowRight, FaGithub, FaLinkedinIn } from 'react-icons/fa6';
import { IoMail } from 'react-icons/io5';
import { easeOut } from '../components/reveal';
import { profile } from '../cvData';

const Contact = () => {
    const form = useRef();
    const [isSending, setIsSending] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const sendEmail = (e) => {
        e.preventDefault();
        setIsSending(true);
        const spamCheck = form.current.querySelector('input[name="website"]');
        if (spamCheck.value !== '') {
            // Bot detected — silently fail or log
            console.log('Spam detected — honeypot triggered');
            return;
        }

        emailjs
            .sendForm(
                process.env.REACT_APP_EMAILJS_SERVICE_ID,
                process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
                form.current,
                process.env.REACT_APP_EMAILJS_PUBLIC_KEY
            )
            .then(
                (result) => {
                    toast.success('Message sent successfully!');
                    form.current.reset();
                    setIsSending(false);
                    setIsSubmitted(true);
                },
                (error) => {
                    toast.error('Oops! Something went wrong.');
                    setIsSending(false);
                }
            );
    };

    const fieldClass = "w-full px-4 py-3 mt-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-accent/70 focus:ring-2 focus:ring-accent/30 transition";

    const fieldVariants = {
        hidden: { opacity: 0, y: 16 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeOut } },
    };

    return (
        <div className="px-6 sm:px-10 xl:px-16 pt-10 lg:pt-16 max-w-6xl mx-auto">
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar theme="dark" />

            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, ease: easeOut }}
                >
                    <p className="font-mono text-xs sm:text-sm text-accent mb-3">// contact</p>
                    <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
                        Let's build something <span className="text-gradient">reliable</span>.
                    </h1>
                    <p className="mt-5 text-slate-300 leading-relaxed sm:text-lg max-w-md">
                        Open to backend engineering conversations, especially secure, high-impact systems. Send a message or reach me directly.
                    </p>

                    <div className="mt-8 space-y-3">
                        <ContactLink href={`mailto:${profile.email}`} icon={<IoMail />} label="Email" value={profile.email} />
                        <ContactLink href={profile.linkedin} icon={<FaLinkedinIn />} label="LinkedIn" value="Dustin Lionel" />
                        <ContactLink href={profile.github} icon={<FaGithub />} label="GitHub" value="Dustymon111" />
                    </div>
                </motion.div>

                <motion.form
                    ref={form}
                    onSubmit={sendEmail}
                    className="glass rounded-3xl p-6 sm:p-8 space-y-5"
                    initial="hidden"
                    animate="visible"
                    variants={{ visible: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } } }}
                >
                    <input
                        type="text"
                        name="website"
                        className="hidden"
                        autoComplete="off"
                    />
                    <motion.div variants={fieldVariants}>
                        <label htmlFor="name" className="block text-sm font-semibold text-slate-300">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            placeholder="Your name"
                            className={fieldClass}
                            autoComplete='false'
                        />
                    </motion.div>
                    <motion.div variants={fieldVariants}>
                        <label htmlFor="email" className="block text-sm font-semibold text-slate-300">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            placeholder="you@company.com"
                            className={fieldClass}
                            autoComplete='false'
                        />
                    </motion.div>
                    <motion.div variants={fieldVariants}>
                        <label htmlFor="message" className="block text-sm font-semibold text-slate-300">
                            Message
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            required
                            rows="5"
                            placeholder="What would you like to talk about?"
                            className={`${fieldClass} resize-none`}
                            autoComplete='false'
                        />
                    </motion.div>

                    <motion.button
                        type="submit"
                        variants={fieldVariants}
                        disabled={isSending || isSubmitted}
                        className={`w-full py-3 px-4 font-semibold rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 transition-colors
                            ${isSending || isSubmitted ? 'bg-white/10 text-slate-400 cursor-not-allowed' : 'bg-gradient-to-r from-accent to-accent-2 text-ink'}`}
                        whileHover={!isSending && !isSubmitted ? { scale: 1.02 } : {}}
                        whileTap={!isSending && !isSubmitted ? { scale: 0.97 } : {}}
                    >
                        {isSending ? 'Sending...' : isSubmitted ? 'Message Sent ✓' : 'Send Message'}
                    </motion.button>
                </motion.form>
            </div>
        </div>
    );
};

function ContactLink({ href, icon, label, value }) {
    return (
        <motion.a
            href={href}
            target={href.startsWith('mailto:') ? undefined : '_blank'}
            rel="noopener noreferrer"
            className="group flex items-center gap-4 glass rounded-2xl p-4 hover:border-accent/40 transition-colors max-w-md"
            whileHover={{ x: 4 }}
        >
            <span className="grid place-items-center w-11 h-11 rounded-xl bg-gradient-to-br from-accent to-accent-2 text-ink text-lg">{icon}</span>
            <span className="min-w-0">
                <span className="block text-xs text-slate-400">{label}</span>
                <span className="block font-semibold truncate">{value}</span>
            </span>
            <FaArrowRight className="ml-auto text-slate-500 transition-transform group-hover:translate-x-1 group-hover:text-accent" />
        </motion.a>
    );
}

export default Contact;
