import { Link, useLocation } from 'react-router-dom';
import { FaAngleDown } from "react-icons/fa6";
import { FaBars, FaTimes } from "react-icons/fa";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function Navigation() {
    const location = useLocation();
    const [activeLink, setActiveLink] = useState('/');
    const [animateTransition, setAnimateTransition] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Update active link when route changes
    useEffect(() => {
        if (activeLink !== location.pathname) {
            setAnimateTransition(true);
            setTimeout(() => setAnimateTransition(false), 800);
        }
        setActiveLink(location.pathname);

        // Close mobile menu when route changes
        setMobileMenuOpen(false);
    }, [location, activeLink]);

    // Mobile menu animation variants
    const mobileMenuVariants = {
        closed: {
            opacity: 0,
            y: -20,
            transition: {
                duration: 0.3,
                ease: "easeInOut"
            }
        },
        open: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.3,
                ease: "easeInOut"
            }
        }
    };

    return (
        <nav className="flex justify-between items-center p-4 md:p-8 z-50 font-gothic relative">
            <div className='flex items-center gap-2 md:gap-3'>
                <img src="/Logo.svg" alt="Logo" className="w-12 h-12 md:w-16 md:h-16" />
                <h1 className='font-semibold text-2xl md:text-3xl'>DL</h1>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex space-x-10 lg:space-x-20 text-xl">
                <NavLink to="/" isActive={activeLink === '/'} animateTransition={animateTransition}>
                    Home
                </NavLink>
                <NavLink to="/projects" isActive={activeLink === '/projects'} animateTransition={animateTransition}>
                    Projects
                </NavLink>
                <NavLink to="/about" isActive={activeLink === '/about'} animateTransition={animateTransition}>
                    About
                </NavLink>
                <NavLink to="/contact" isActive={activeLink === '/contact'} animateTransition={animateTransition}>
                    Contact
                </NavLink>
            </div>

            {/* Desktop Download CV Button */}
            <motion.a
                href="/dustin_lionel_cv.pdf"
                download="dustin_lionel_cv.pdf"
                className="hidden lg:flex space-x-2 items-center bg-primary hover:bg-blue-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-2xl font-semibold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <span>Download CV</span>
                <FaAngleDown />
            </motion.a>

            {/* Mobile Menu Button */}
            <button
                className="lg:hidden text-2xl focus:outline-none"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
                {mobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        className="absolute top-full left-0 right-0 bg-primary dark:bg-gray-900 shadow-lg rounded-lg p-4 lg:hidden"
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={mobileMenuVariants}
                    >
                        <div className="flex flex-col space-y-4">
                            <MobileNavLink
                                to="/"
                                isActive={activeLink === '/'}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Home
                            </MobileNavLink>
                            <MobileNavLink
                                to="/projects"
                                isActive={activeLink === '/projects'}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Projects
                            </MobileNavLink>
                            <MobileNavLink
                                to="/about"
                                isActive={activeLink === '/about'}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                About
                            </MobileNavLink>
                            <MobileNavLink
                                to="/contact"
                                isActive={activeLink === '/contact'}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Contact
                            </MobileNavLink>

                            {/* Mobile Download CV Button */}
                            <motion.a
                                href="/dustin_lionel_cv.pdf"
                                download="dustin_lionel_cv.pdf"
                                className="flex justify-center items-center space-x-2 bg-blue-700 text-white py-3 rounded-xl font-semibold"
                                whileTap={{ scale: 0.95 }}
                            >
                                <span>Download CV</span>
                                <FaAngleDown className='hidden lg:block' />
                            </motion.a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}

// Custom NavLink component with light bloom effect (for desktop)
function NavLink({ to, children, isActive, animateTransition }) {
    return (
        <div className="relative py-2 px-4">
            {/* Light bloom effect - only visible when active */}
            {isActive && (
                <div className={`light-bloom ${animateTransition ? 'bloom-entrance' : ''}`}>
                    <div className="light-source"></div>
                </div>
            )}

            {/* Link text */}
            <Link
                to={to}
                className={`font-medium transition-duration-300 relative z-10 ${isActive ? 'bloom-text' : 'hover:text-primary'}`}
            >
                {children}
            </Link>

            {/* CSS for the light bloom effect */}
            <style jsx>{`
                .light-bloom {
                    position: absolute;
                    top: -10px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 100%;
                    height: 15px;
                    z-index: 5;
                    pointer-events: none;
                }
                
                .light-source {
                    position: absolute;
                    top: 0;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 40px;
                    height: 8px;
                    background: linear-gradient(
                        to right,
                        rgba(255, 255, 255, 0) 0%,
                        rgba(255, 255, 255, 0.8) 50%,
                        rgba(255, 255, 255, 0) 100%
                    );
                    border-radius: 4px;
                    filter: blur(2px);
                    animation: pulse 3s infinite alternate;
                }
                
                .bloom-entrance {
                    animation: bloom-in 0.8s ease-out;
                }
                
                @keyframes pulse {
                    0% {
                        opacity: 0.6;
                        transform: translateX(-50%) scale(1);
                    }
                    100% {
                        opacity: 1;
                        transform: translateX(-50%) scale(1.3);
                    }
                }
                
                @keyframes bloom-in {
                    0% {
                        opacity: 0;
                        transform: translateX(-50%) scale(0.2);
                    }
                    50% {
                        opacity: 1;
                        transform: translateX(-50%) scale(1.5);
                    }
                    100% {
                        opacity: 0.8;
                        transform: translateX(-50%) scale(1);
                    }
                }
                
                .bloom-text {
                    text-shadow: 0 0 10px rgba(var(--color-primary-rgb, 255, 255, 255), 0.4),
                                0 0 20px rgba(var(--color-primary-rgb, 255, 255, 255), 0.2);
                    animation: text-glow 3s infinite alternate;
                }
                
                @keyframes text-glow {
                    0% {
                        text-shadow: 0 0 5px rgba(var(--color-primary-rgb, 255, 255, 255), 0.3),
                                    0 0 10px rgba(var(--color-primary-rgb, 255, 255, 255), 0.2);
                    }
                    100% {
                        text-shadow: 0 0 8px rgba(var(--color-primary-rgb, 255, 255, 255), 0.5),
                                    0 0 15px rgba(var(--color-primary-rgb, 255, 255, 255), 0.3);
                    }
                }
            `}</style>
        </div>
    );
}

// Simplified NavLink component for mobile menu
function MobileNavLink({ to, children, isActive, onClick }) {
    return (
        <Link
            to={to}
            className={`block py-2 px-4 rounded-lg text-lg font-medium transition-all duration-200 ${isActive
                ? 'bg-blue-800 text-white'
                : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
            onClick={onClick}
        >
            {children}
        </Link>
    );
}

export default Navigation;