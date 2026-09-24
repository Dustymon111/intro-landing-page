import { Link, useLocation } from 'react-router-dom';
import { FaArrowDown } from "react-icons/fa6";
import { FaBars, FaTimes } from "react-icons/fa";
import { useState, useEffect, useLayoutEffect, useRef, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// three.js rover is loaded in its own chunk after the page renders
const RoverTrack = lazy(() => import('./roverTrack'));

const links = [
    { to: '/', label: 'Home' },
    { to: '/experience', label: 'Experience' },
    { to: '/projects', label: 'Projects' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
];

function Navigation() {
    const { pathname } = useLocation();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Close mobile menu when route changes
    useEffect(() => {
        setMobileMenuOpen(false);
    }, [pathname]);

    // Centre of each desktop link, in px from the pill's left edge
    const pillRef = useRef(null);
    const linkRefs = useRef([]);
    const [stops, setStops] = useState([]);
    const activeIndex = links.findIndex((link) => link.to === pathname);

    useLayoutEffect(() => {
        const measure = () => setStops(linkRefs.current.map((el) => (el ? el.offsetLeft + el.offsetWidth / 2 : 0)));
        measure();
        document.fonts?.ready.then(measure);
        const observer = new ResizeObserver(measure);
        if (pillRef.current) observer.observe(pillRef.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 12);
        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.header
            className={`sticky top-0 z-50 transition-colors duration-300 ${scrolled || mobileMenuOpen ? 'bg-ink/70 backdrop-blur-xl border-b border-white/5' : 'border-b border-transparent'}`}
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
            <nav className="relative flex justify-between items-center px-6 sm:px-10 xl:px-16 py-4 lg:pb-16">
                <Link to="/" className='group flex items-center gap-3'>
                    <motion.img
                        src="/Logo.svg"
                        alt="Logo"
                        className="w-10 h-10 md:w-12 md:h-12"
                        whileHover={{ rotate: -8, scale: 1.05 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                    />
                    <div className="leading-tight">
                        <p className='font-display font-bold text-lg md:text-xl'>Dustin Lionel</p>
                        <p className='font-mono text-[11px] text-slate-400 group-hover:text-accent transition-colors'>backend.engineer</p>
                    </div>
                </Link>

                {/* Desktop Navigation, with the rover rail underneath */}
                <div className="relative hidden lg:block">
                    <div ref={pillRef} className="flex items-center gap-1 glass rounded-full p-1.5">
                        {links.map((link, i) => (
                            <NavLink
                                key={link.to}
                                to={link.to}
                                isActive={pathname === link.to}
                                linkRef={(el) => { linkRefs.current[i] = el; }}
                            >
                                {link.label}
                            </NavLink>
                        ))}
                    </div>
                    <RoverRail stops={stops} activeIndex={activeIndex} />
                </div>

                {/* Desktop Download CV Button */}
                <motion.a
                    href="/dustin_lionel_cv.pdf"
                    download="dustin_lionel_cv.pdf"
                    className="group hidden lg:flex gap-2 items-center bg-gradient-to-r from-accent to-accent-2 text-ink px-5 py-2.5 rounded-full font-semibold text-sm shadow-[0_0_24px_-6px] shadow-accent/60"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                >
                    <span>Download CV</span>
                    <FaArrowDown className="transition-transform group-hover:translate-y-0.5" />
                </motion.a>

                {/* Mobile Menu Button */}
                <button
                    className="lg:hidden text-xl p-2 rounded-lg glass focus:outline-none"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                    aria-expanded={mobileMenuOpen}
                >
                    {mobileMenuOpen ? <FaTimes /> : <FaBars />}
                </button>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div
                            className="absolute top-full left-4 right-4 mt-2 bg-ink/95 backdrop-blur-xl border border-white/10 shadow-2xl rounded-2xl p-3 lg:hidden"
                            initial={{ opacity: 0, y: -12, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -12, scale: 0.98 }}
                            transition={{ duration: 0.25, ease: 'easeOut' }}
                        >
                            <motion.div
                                className="flex flex-col gap-1"
                                initial="hidden"
                                animate="visible"
                                variants={{ visible: { transition: { staggerChildren: 0.04 } } }}
                            >
                                {links.map((link) => (
                                    <motion.div
                                        key={link.to}
                                        variants={{ hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0 } }}
                                    >
                                        <MobileNavLink to={link.to} isActive={pathname === link.to}>
                                            {link.label}
                                        </MobileNavLink>
                                    </motion.div>
                                ))}

                                {/* Mobile Download CV Button */}
                                <motion.a
                                    href="/dustin_lionel_cv.pdf"
                                    download="dustin_lionel_cv.pdf"
                                    className="mt-2 flex justify-center items-center gap-2 bg-gradient-to-r from-accent to-accent-2 text-ink py-3 rounded-xl font-semibold"
                                    variants={{ hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0 } }}
                                    whileTap={{ scale: 0.97 }}
                                >
                                    <span>Download CV</span>
                                    <FaArrowDown />
                                </motion.a>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
        </motion.header>
    );
}

// Desktop link: the active pill slides between links via a shared layoutId
function NavLink({ to, children, isActive, linkRef }) {
    return (
        <Link
            ref={linkRef}
            to={to}
            className={`relative px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-200 ${isActive ? 'text-ink' : 'text-slate-300 hover:text-white'}`}
        >
            {isActive && (
                <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-white shadow-[0_0_20px_-4px] shadow-accent/70"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
            )}
            <span className="relative z-10">{children}</span>
        </Link>
    );
}

// Rail with a stop under each link; the 3D rover drives to the active one
function RoverRail({ stops, activeIndex }) {
    if (stops.length === 0 || !stops.some(Boolean)) return null;
    const first = stops[0];
    const last = stops[stops.length - 1];
    const active = stops[activeIndex];

    return (
        <div className="pointer-events-none absolute inset-x-0 top-full h-14 mt-1">
            <div
                className="absolute top-[70%] h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
                style={{ left: first - 40, width: last - first + 80 }}
            />
            {active !== undefined && (
                <motion.div
                    className="absolute top-[70%] h-px bg-gradient-to-r from-accent/0 via-accent to-accent/0"
                    initial={false}
                    animate={{ left: active - 36, width: 72 }}
                    transition={{ type: 'spring', stiffness: 120, damping: 18 }}
                />
            )}
            {stops.map((x, i) => (
                <span
                    key={i}
                    className={`absolute top-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-500 ${i === activeIndex ? 'w-2 h-2 bg-accent shadow-[0_0_10px] shadow-accent' : 'w-1 h-1 bg-white/30'}`}
                    style={{ left: x }}
                />
            ))}
            <Suspense fallback={null}>
                <RoverTrack targetX={active} className="absolute inset-x-0 -top-5 bottom-0" />
            </Suspense>
        </div>
    );
}

function MobileNavLink({ to, children, isActive }) {
    return (
        <Link
            to={to}
            className={`flex items-center justify-between py-3 px-4 rounded-xl text-base font-semibold transition-colors duration-200 ${isActive
                ? 'bg-white/10 text-white'
                : 'text-slate-300 hover:bg-white/5'
                }`}
        >
            {children}
            {isActive && <span className="w-1.5 h-1.5 rounded-full bg-accent" />}
        </Link>
    );
}

export default Navigation;
