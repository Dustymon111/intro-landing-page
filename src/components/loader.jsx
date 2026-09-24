import { motion } from 'framer-motion';

function Loader() {
    return (
        <motion.div
            className="flex flex-col items-center justify-center h-screen bg-ink gap-6"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
        >
            <motion.img
                src="/Logo.svg"
                alt=""
                className="w-16 h-16"
                initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.p
                className="font-mono text-sm text-slate-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
            >
                <span className="text-accent">$</span> booting dustin.dev<span className="animate-blink">_</span>
            </motion.p>
            <div className="w-60 h-1 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-accent to-accent-2 animate-loadBar" />
            </div>
        </motion.div>
    );
}

export default Loader;
