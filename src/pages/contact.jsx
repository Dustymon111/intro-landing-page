import { motion } from 'framer-motion';

const Contact = () => {
    return (
        <motion.div
            className="max-w-lg mx-auto p-8 font-gothic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            <motion.h2
                className="text-3xl font-semibold text-center mb-6"
                initial={{ y: -50 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
            >
                Let's Get in Touch
            </motion.h2>
            <form>
                <motion.div
                    className="mb-4 text-white"
                    initial={{ x: -100 }}
                    animate={{ x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <label htmlFor="name" className="block text-sm font-medium">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className="text-black w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </motion.div>
                <motion.div
                    className="mb-4"
                    initial={{ x: -100 }}
                    animate={{ x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    <label htmlFor="email" className="block text-sm font-medium">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="text-black w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </motion.div>
                <motion.div
                    className="mb-4"
                    initial={{ x: -100 }}
                    animate={{ x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <label htmlFor="phone" className="block text-sm font-medium">
                        Phone Number
                    </label>
                    <input
                        type="number"
                        id="phone"
                        name="phone"
                        required
                        className="text-black w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </motion.div>
                <motion.div
                    className="mb-6"
                    initial={{ x: -100 }}
                    animate={{ x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <label htmlFor="subject" className="block text-sm font-medium">
                        Subject
                    </label>
                    <textarea
                        id="subject"
                        name="subject"
                        required
                        rows="4"
                        className="text-black w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </motion.div>

                <motion.button
                    type="submit"
                    className="w-full py-2 px-4 bg-primary text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Send Message
                </motion.button>
            </form>
        </motion.div>
    );
};

export default Contact;
