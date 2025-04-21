import { FaCode, FaGamepad, FaMobileScreenButton } from "react-icons/fa6";
import { IoLink } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";
import { motion } from "framer-motion";
import { TypeAnimation } from 'react-type-animation';
import { Link } from "react-router-dom";

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
            className="flex flex-col md:flex-row justify-between px-6 sm:px-16 xl:px-24 py-8 xl:py-12 font-gothic"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            {/* Text Section */}
            <motion.div className="space-y-5 xl:space-y-7 z-10 pb-6 md:pb-0" variants={containerVariants}>
                <motion.p className="text-lg sm:text-xl xl:text-3xl font-semibold" variants={itemVariants}>
                    Hi! Nice to meet you.
                </motion.p>

                <motion.div className="flex items-center space-x-2" variants={itemVariants}>
                    <p className="text-lg sm:text-xl xl:text-3xl font-semibold">I am</p>
                </motion.div>

                <motion.h1 className="text-4xl xl:text-6xl font-bold" variants={itemVariants}>
                    <p>Dustin Lionel.</p>
                </motion.h1>

                <motion.div variants={itemVariants} className="cursor-default">
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
                        speed={50}
                        className="text-lg sm:text-xl xl:text-2xl font-semibold"
                        repeat={Infinity}
                    />
                </motion.div>

                <motion.div className="flex space-x-4 sm:space-x-6 xl:space-x-10 mt-4 font-semibold cursor-default text-sm xl:text-base" variants={itemVariants}>
                    <motion.div
                        className="flex items-center space-x-2 xl:space-x-3"
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
                        className="flex items-center space-x-2 xl:space-x-3"
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
                        className="flex items-center space-x-2 xl:space-x-3"
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
                <motion.div className="flex gap-4" variants={itemVariants}>
                    <a href="https://www.linkedin.com/in/dustin-lionel-398487224/" target="_blank" rel="noopener noreferrer">
                        <img
                            src="/skills-icon/icons/linkedin/linkedin-original.svg"
                            alt="linkedin"
                            className="w-8 h-8 xl:w-10 xl:h-10 hover:scale-110 transition-transform duration-300"
                        />
                    </a>
                    <a href="https://github.com/Dustymon111" target="_blank" rel="noopener noreferrer">
                        <img
                            src="/skills-icon/icons/github/github-original.svg"
                            alt="github"
                            className="w-8 h-8 xl:w-10 xl:h-10 hover:scale-110 transition-transform duration-300"
                        />
                    </a>
                </motion.div>
                <motion.div className="lg:hidden flex flex-col items-start gap-5">
                    <Link to="/Contact" className="flex items-center gap-2 font-semibold rounded-xl underline underline-offset-2">
                        <p className="">Get connected</p>
                        <IoLink size={20} />
                    </Link>
                    <Link to="/Projects" className="flex items-center gap-2 font-semibold rounded-xl underline underline-offset-2">
                        <p>Check out my projects</p>
                        <IoIosArrowForward size={20} />
                    </Link>
                </motion.div>
            </motion.div>

            {/* Image Section - More responsive now */}
            <motion.div
                className="hidden lg:block relative mx-auto md:mx-0 max-w-xs sm:max-w-sm md:max-w-full justify-center"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, type: "spring", stiffness: 50 }}
            >
                {/* Background Circle */}
                <motion.div
                    className="w-36 h-36 sm:w-60 sm:h-60 xl:w-80 xl:h-80 z-10 rounded-full bg-primary absolute left-1/2 md:left-auto -translate-x-1/2 md:translate-x-0 md:right-16 xl:right-24 top-4 md:top-20 xl:top-28"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.3, type: "spring" }}
                ></motion.div>

                {/* Profile Image */}
                <motion.img
                    src="./profilepic.png"
                    alt="Dustin Lionel"
                    className="hidden lg:block relative object-cover [clip-path:inset(0%_0%_23%_0%)] -top-4 left-1/2 md:left-auto -translate-x-1/2 md:translate-x-0 md:right-5 md:-top-32 xl:-top-20 xl:right-24 z-10 scale-65 sm:scale-75 md:scale-90 xl:scale-110"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.8 }}
                />

                {/* Mobile Bubble*/}
                <motion.div
                    className="hidden lg:block absolute z-1 top-0 -right-1 sm:-right-2 xl:-right-4"
                    animate={floatUpDown1}
                >
                    <motion.div
                        className="w-16 h-16 sm:w-28 sm:h-28 xl:w-40 xl:h-40 rounded-full outline-4 bg-transparent flex items-center justify-center"
                        animate={{ rotate: 0 }}
                        transition={{ duration: 0.5, delay: 1.1, type: "spring" }}
                    >
                        <FaMobileScreenButton className="text-2xl sm:text-4xl xl:text-6xl" />
                    </motion.div>
                </motion.div>

                {/* Code Bubble - Smaller on mobile, adjusted position */}
                <motion.div
                    className="absolute z-1 -top-6 sm:-top-12 xl:-top-16 right-4 sm:right-48 xl:right-72"
                    animate={floatUpDown2}
                >
                    <motion.div
                        className="w-16 h-16 sm:w-28 sm:h-28 xl:w-40 xl:h-40 rounded-full outline-4 bg-transparent flex items-center justify-center"
                        animate={{ rotate: 0 }}
                        transition={{ duration: 0.5, delay: 1.1, type: "spring" }}
                    >
                        <FaCode className="text-2xl sm:text-4xl xl:text-6xl" />
                    </motion.div>
                </motion.div>

                {/* Gamepad Bubble - Hidden on mobile screens */}
                <motion.div
                    className="absolute z-1 top-20 sm:top-28 xl:top-40 -left-8 sm:-left-16 xl:-left-60 hidden sm:block"
                    animate={floatUpDown3}
                >
                    <motion.div
                        className="w-16 h-16 sm:w-28 sm:h-28 xl:w-40 xl:h-40 rounded-full outline-4 bg-transparent flex items-center justify-center"
                        animate={{ rotate: 0 }}
                        transition={{ duration: 0.5, delay: 1.1, type: "spring" }}
                    >
                        <FaGamepad className="text-2xl sm:text-4xl xl:text-6xl" />
                    </motion.div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
}

export default Home;