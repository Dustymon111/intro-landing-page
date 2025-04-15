import { FaCode, FaGamepad, FaMobileScreenButton, FaAngleDown } from "react-icons/fa6";
import { motion } from "framer-motion";
import { TypeAnimation } from 'react-type-animation';

function Home() {
    // Animation variants for staggered animations
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 10
            }
        }
    };

    // For floating animation of the circles
    const floatUpDown1 = {
        y: [0, -10, 0],
        transition: {
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: 0
        }
    };

    const floatUpDown2 = {
        y: [0, 10, 0],
        transition: {
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: 0.5
        }
    };

    const floatUpDown3 = {
        y: [0, -15, 0],
        transition: {
            duration: 2.5,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: 1
        }
    };

    return (
        <motion.div
            className="flex justify-between px-24 py-12 font-onest"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <motion.div className="space-y-7" variants={containerVariants}>
                <motion.p className="text-3xl" variants={itemVariants}>
                    Hi! Nice to meet you.
                </motion.p>

                <motion.div className="flex items-center space-x-2" variants={itemVariants}>
                    <p className="text-3xl">I am</p>
                </motion.div>

                <motion.h1 className="text-6xl font-bold" variants={itemVariants}>
                    <p>Dustin Lionel.</p>
                </motion.h1>

                <motion.div variants={itemVariants}>
                    <TypeAnimation
                        sequence={[
                            'Web Developer 💻',
                            1000,
                            'Mobile Developer 📱',
                            1000,
                            'Game Developer 🎮',
                            1000,
                        ]}
                        wrapper="p"
                        speed={70}
                        className="text-xl y font-bold"
                        repeat={Infinity}
                    />
                </motion.div>

                <motion.div className="flex space-x-10 mt-4 font-semibold" variants={itemVariants}>
                    <motion.div
                        className="flex items-center space-x-3"
                        whileHover={{ scale: 1.1, color: "#6366f1" }}
                    >
                        <motion.div
                            className="w-1 h-1 rounded-full bg-white"
                            animate={{ scale: [1, 1.5, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        ></motion.div>
                        <span>Web</span>
                    </motion.div>

                    <motion.div
                        className="flex items-center space-x-3"
                        whileHover={{ scale: 1.1, color: "#6366f1" }}
                    >
                        <motion.div
                            className="w-1 h-1 rounded-full bg-white"
                            animate={{ scale: [1, 1.5, 1] }}
                            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                        ></motion.div>
                        <span>Mobile</span>
                    </motion.div>

                    <motion.div
                        className="flex items-center space-x-3"
                        whileHover={{ scale: 1.1, color: "#6366f1" }}
                    >
                        <motion.div
                            className="w-1 h-1 rounded-full bg-white"
                            animate={{ scale: [1, 1.5, 1] }}
                            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                        ></motion.div>
                        <span>Game</span>
                    </motion.div>
                </motion.div>
            </motion.div>

            <motion.div
                className="relative"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, type: "spring", stiffness: 50 }}
            >
                <motion.div
                    className="w-80 h-80 z-10 rounded-full bg-primary absolute right-24 top-28"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.3, type: "spring" }}
                ></motion.div>

                <motion.img
                    src="./profilepic.png"
                    alt="Dustin Lionel"
                    className="relative object-cover [clip-path:inset(0%_0%_23%_0%)] -top-8 right-24 z-10 scale-110"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.8 }}
                />

                {/* Mobile Bubble */}
                <motion.div
                    className="absolute z-1 top-10 -right-4"
                    animate={floatUpDown1}
                >
                    <motion.div
                        className="w-40 h-40 rounded-full outline outline-4 bg-trasparent flex items-center justify-center"
                        animate={{ rotate: 0 }}
                        transition={{ duration: 0.5, delay: 1.1, type: "spring" }}
                    >
                        <FaMobileScreenButton size={100} />
                    </motion.div>
                </motion.div>

                {/* Code Bubble */}
                <motion.div
                    className="absolute z-1 -top-16 right-72"
                    animate={floatUpDown2}
                >
                    <motion.div
                        className="w-40 h-40 rounded-full outline outline-4 bg-trasparent flex items-center justify-center"
                        animate={{ rotate: 0 }}
                        transition={{ duration: 0.5, delay: 1.1, type: "spring" }}
                    >
                        <FaCode size={100} />
                    </motion.div>
                </motion.div>

                {/* Gamepad Bubble */}
                <motion.div
                    className="absolute z-1 top-40 -left-60"
                    animate={floatUpDown3}
                >
                    <motion.div
                        className="w-40 h-40 rounded-full outline outline-4 bg-trasparent flex items-center justify-center"
                        animate={{ rotate: 0 }}
                        transition={{ duration: 0.5, delay: 1.1, type: "spring" }}
                    >
                        <FaGamepad size={100} />
                    </motion.div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
}

export default Home;