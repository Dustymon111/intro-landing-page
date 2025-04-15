import { motion } from 'framer-motion';
import MusicPlayer from "../components/music";

function About() {
    return (
        <motion.div
            className="w-3/4 m-auto p-8 items-center font-gothic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            <motion.div
                className="flex flex-1 items-center gap-6"
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <motion.img
                    src="/profilepic2.png"
                    alt="profile picture"
                    className="w-64 h-84 rounded-full"
                    whileHover={{ scale: 1.05 }}
                />
                <motion.p
                    className="text-justify w-3/5"
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    I'm a Computer Science graduate with a strong passion for software engineering, specializing in web and Android development, AI model engineering, and game development. With experience leading development projects, organizing tech competitions, and actively engaging in competitive programming, I thrive on solving complex challenges and building impactful, user-focused software solutions. I'm driven by curiosity, creativity, and the desire to make a meaningful difference through technology.
                </motion.p>
            </motion.div>
            <motion.div
                className="flex"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
            >
                <motion.div className="flex-1 p-8">
                    <h1 className="font-semibold text-2xl">Skills</h1>
                    <motion.div className="flex w-12 gap-10 py-4">
                        <motion.img src="/skills-icon/icons/nodejs/nodejs-original.svg" alt="nodejs" whileHover={{ scale: 1.1 }} />
                        <motion.img src="/skills-icon/icons/express/express-original.svg" alt="express" whileHover={{ scale: 1.1 }} />
                        <motion.img src="/skills-icon/icons/javascript/javascript-original.svg" alt="javascript" whileHover={{ scale: 1.1 }} />
                        <motion.img src="/skills-icon/icons/cplusplus/cplusplus-original.svg" alt="cplusplus" whileHover={{ scale: 1.1 }} />
                        <motion.img src="/skills-icon/icons/nextjs/nextjs-original.svg" alt="nextjs" whileHover={{ scale: 1.1 }} />
                    </motion.div>
                    <motion.div className="flex w-12 gap-10 py-4">
                        <motion.img src="/skills-icon/icons/tailwindcss/tailwindcss-original.svg" alt="tailwindcss" whileHover={{ scale: 1.1 }} />
                        <motion.img src="/skills-icon/icons/firebase/firebase-original.svg" alt="firebase" whileHover={{ scale: 1.1 }} />
                        <motion.img src="/skills-icon/icons/mysql/mysql-original.svg" alt="mysql" whileHover={{ scale: 1.1 }} />
                        <motion.img src="/skills-icon/icons/unity/unity-original.svg" alt="unity" whileHover={{ scale: 1.1 }} />
                        <motion.img src="/skills-icon/icons/csharp/csharp-original.svg" alt="csharp" whileHover={{ scale: 1.1 }} />
                    </motion.div>
                </motion.div>
                <motion.div className="flex-1">
                    <h1 className="font-semibold text-2xl">Bonus</h1>
                    <p>I like to make music too!</p>
                    <MusicPlayer />
                </motion.div>
            </motion.div>
        </motion.div>
    );
}

export default About;
