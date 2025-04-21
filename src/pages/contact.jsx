import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

    return (
        <motion.div
            className="max-w-lg mx-auto p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

            <motion.h2
                className="text-3xl font-semibold text-center mb-6"
                initial={{ y: -50 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
            >
                Let's Get in Touch
            </motion.h2>

            <form ref={form} onSubmit={sendEmail}>
                <input
                    type="text"
                    name="website"
                    className="hidden"
                    autoComplete="off"
                />
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
                        className="text-black w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                        autoComplete='false'

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
                        className="text-black w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                        autoComplete='false'
                    />
                </motion.div>
                <motion.div
                    className="mb-6"
                    initial={{ x: -100 }}
                    animate={{ x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <label htmlFor="message" className="block text-sm font-medium">
                        Message
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        required
                        rows="4"
                        className="text-black w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                        autoComplete='false'

                    />
                </motion.div>

                <motion.button
                    type="submit"
                    disabled={isSending || isSubmitted}
                    className={`w-full py-2 px-4 font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all 
        ${isSending || isSubmitted ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary text-white hover:bg-blue-700'}
    `}
                    whileHover={!isSending && !isSubmitted ? { scale: 1.05 } : {}}
                    whileTap={!isSending && !isSubmitted ? { scale: 0.95 } : {}}
                >
                    {isSending ? 'Sending...' : isSubmitted ? 'Message Sent' : 'Send Message'}
                </motion.button>

            </form>
        </motion.div>
    );
};

export default Contact;
