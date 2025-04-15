import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import projectData from '../projectData.json';

function Projects() {
    // State to track current project index
    const [currentIndex, setCurrentIndex] = useState(0);
    // State to track slide direction
    const [direction, setDirection] = useState(0);

    // Check if projectData is available and is an array
    console.log("Project data:", projectData);

    // If projectData is not an array, we need to handle that
    const projects = Array.isArray(projectData) ? projectData : [];

    // Safety check
    if (projects.length === 0) {
        return <div className="p-8 min-h-screen">No projects available</div>;
    }

    // Get current project
    const currentProject = projects[currentIndex];

    // Navigation functions
    const goToPrevious = () => {
        setDirection(-1);
        const isFirstProject = currentIndex === 0;
        const newIndex = isFirstProject ? projects.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const goToNext = () => {
        setDirection(1);
        const isLastProject = currentIndex === projects.length - 1;
        const newIndex = isLastProject ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    // Slide animations
    const slideVariants = {
        enter: (direction) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0
        }),
        center: {
            x: 0,
            opacity: 1
        },
        exit: (direction) => ({
            x: direction < 0 ? 1000 : -1000,
            opacity: 0
        })
    };

    const slideTransition = {
        duration: 0.01,
        type: "spring",
        stiffness: 100,
        damping: 20
    };

    // Page load transition animation (fade-in or slide-in)
    const pageVariants = {
        hidden: { opacity: 0, y: -100 },
        visible: { opacity: 1, y: 0 },
    };


    const pageTransition = {
        duration: 0.8,
        ease: "easeOut",
    };


    return (
        <div>
            <button
                onClick={goToPrevious}
                className="absolute left-10 top-1/2 transform -translate-y-1/2 bg-white text-teal-500 p-3 rounded-full shadow-lg hover:bg-gray-100 z-10"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                </svg>
            </button>

            <button
                onClick={goToNext}
                className="absolute right-10 top-1/2 transform -translate-y-1/2 bg-white text-teal-500 p-3 rounded-full shadow-lg hover:bg-gray-100 z-10"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
            </button>
            <motion.div
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={pageVariants}
                transition={pageTransition}
                className="p-8 min-h-screen"
            >
                <div className="relative overflow-hidden">
                    <AnimatePresence initial={false} custom={direction} mode="popLayout">
                        <motion.div
                            key={currentIndex}
                            custom={direction}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={slideTransition}
                            className="w-full"
                        >
                            {/* Center the title and subtitle */}
                            <div className="text-center mb-4">
                                <div className="flex items-center justify-center mb-2">
                                    <h3 className="font-medium text-3xl">{currentProject.title}</h3>
                                    <a href={currentProject.link} target="_blank" rel="noopener noreferrer">
                                        <svg className="w-7 h-8 ml-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10 6H6C4.89543 6 4 6.89543 4 8V18C4 19.1046 4.89543 20 6 20H16C17.1046 20 18 19.1046 18 18V14M14 4H20M20 4V10M20 4L10 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </a>
                                </div>
                                <p className="text-lg">{currentProject.subtitle}</p>
                            </div>

                            <div className="flex justify-center">
                                <div className="relative w-1/2 overflow-hidden rounded-lg border-4 border-white">
                                    <img
                                        src={currentProject.image}
                                        alt={`${currentProject.title} Screenshot`}
                                        className="w-full"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-center mt-4 space-x-2">
                                {currentProject.skills.map((skill, index) => (
                                    <button key={index} className="bg-gray-800 text-white px-2 py-1 rounded-full text-xs">
                                        {skill}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Dots to show position */}
                <div className="flex justify-center mt-8 space-x-2">
                    {projects.map((_, index) => (
                        <button
                            key={index}
                            className={`w-3 h-3 rounded-full transition-all duration-100 ${index === currentIndex ? 'bg-primary scale-125' : 'bg-gray-300'}`}
                            onClick={() => {
                                setDirection(index > currentIndex ? 1 : -1);
                                setCurrentIndex(index);
                            }}
                        />
                    ))}
                </div>
            </motion.div>
        </div>
    );
}

export default Projects;
