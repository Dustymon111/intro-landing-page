import { Link, useLocation } from 'react-router-dom';
import { FaCode, FaGamepad, FaMobileScreenButton, FaAngleDown } from "react-icons/fa6";
import { useState, useEffect } from 'react';

function Navigation() {
    const location = useLocation();
    const [activeLink, setActiveLink] = useState('/');

    // Update active link when route changes
    useEffect(() => {
        setActiveLink(location.pathname);
    }, [location]);

    return (
        <nav className="flex justify-between items-center p-8 z-10 font-onest">
            <div className='flex items-center gap-3'>
                <img src="/Logo.svg" alt="Logo" className="w-16 h-16" />
                <h1 className='font-semibold text-3xl font-onest'>DL</h1>
            </div>
            <div className="flex space-x-20 text-xl ">
                <NavLink to="/" isActive={activeLink === '/'}>
                    Home
                </NavLink>
                <NavLink to="/projects" isActive={activeLink === '/projects'}>
                    Projects
                </NavLink>
                <NavLink to="/certifications" isActive={activeLink === '/certifications'}>
                    Certifications
                </NavLink>
                <NavLink to="/about" isActive={activeLink === '/about'}>
                    About
                </NavLink>
            </div>
            <button className="flex space-x-2 items-center bg-primary hover:bg-purple-700 text-white px-6 py-3 rounded-2xl font-semibold">
                <div>
                    Download CV
                </div>
                <div>
                    <FaAngleDown />
                </div>
            </button>
        </nav>
    );
}

// Custom NavLink component with bubble animation
function NavLink({ to, children, isActive }) {
    return (
        <div className="relative">
            <Link
                to={to}
                className={`font-medium transition-colors duration-300  ${isActive ? 'text-primary' : 'hover:text-primary'}`}
            >
                {children}
            </Link>

            {/* Animated bubbles - only show when active */}
            {isActive && (
                <div className="absolute w-full flex justify-center -bottom-2">
                    <div className="bubble-animation w-full justify-between">
                        <div className="bubble bubble-1"></div>
                        <div className="bubble bubble-2"></div>
                        <div className="bubble bubble-3"></div>
                    </div>
                </div>
            )}

            {/* Add this CSS to your component or in your global styles */}
            <style jsx>{`
                .bubble {
                    background-color: var(--color-primary,rgb(255, 255, 255));
                    border-radius: 50%;
                    position: absolute;
                    opacity: 0;
                }
                
                .bubble-1 {
                    width: 10px;
                    height: 10px;
                    animation: bubble-float 1.8s infinite ease-in-out;
                }

                .bubble-2 {
                    width: 8px;
                    height: 8px;
                    left: 12px;
                    animation: bubble-float 1.8s infinite ease-in-out 0.6s;
                }

                .bubble-3 {
                    width: 9px;
                    height: 9px;
                    right: 8px;
                    animation: bubble-float 1.8s infinite ease-in-out 0.3s;
                }

                .bubble-animation {
                    position: relative;
                    height: 12px;
                    width: 40px;
                    display: flex;
                    justify-content: space-between;
                }
                
                @keyframes bubble-float {
                    0% {
                        transform: translateY(0);
                        opacity: 0;
                    }
                    50% {
                        opacity: 1;
                    }
                    100% {
                        transform: translateY(-10px);
                        opacity: 0;
                    }
                }
            `}</style>
        </div>
    );
}

export default Navigation;