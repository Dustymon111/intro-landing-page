import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import projectData from '../projectData.json';

function Projects() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);

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
        <div className="relative w-full">
            {/* Fixed position navigation buttons */}
            <div className="hidden absolute left-10 inset-x-0 top-1/2 transform -translate-y-1/2 lg:flex justify-between px-4 z-10">
                <button
                    onClick={goToPrevious}
                    className="bg-white text-primary p-3 rounded-full shadow-lg hover:bg-gray-100"
                >
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                    </svg>
                </button>

                <button
                    onClick={goToNext}
                    className="absolute bg-white right-10 text-primary p-3 rounded-full shadow-lg hover:bg-gray-100"
                >
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                </button>
            </div>

            <motion.div
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={pageVariants}
                transition={pageTransition}
                className="max-md:my-10 flex flex-col items-center cursor-grab active:cursor-grabbing"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={(event, info) => {
                    if (info.offset.x < -100) {
                        goToNext();
                    } else if (info.offset.x > 100) {
                        goToPrevious();
                    }
                }}
            >
                <div className="text-center md:mb-4">
                    <a href={currentProject.link} target="_blank" rel="noopener noreferrer" className='flex items-center justify-center mb-2'>
                        <h3 className="font-medium text-3xl max-sm:text-base">{currentProject.title}</h3>
                        <svg className="w-7 h-8 ml-2 max-sm:w-4 max-sm:h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 6H6C4.89543 6 4 6.89543 4 8V18C4 19.1046 4.89543 20 6 20H16C17.1046 20 18 19.1046 18 18V14M14 4H20M20 4V10M20 4L10 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </a>
                    <p className="text-lg max-sm:text-xs">{currentProject.subtitle}</p>
                </div>

                {/* Fixed height container for images */}
                <div className="w-full md:h-96 max-sm:my-5 max-sm flex justify-center overflow-hidden">
                    <AnimatePresence initial={false} custom={direction} mode="popLayout">
                        <motion.div
                            key={currentIndex}
                            custom={direction}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={slideTransition}
                            className="w-full h-full flex justify-center"
                        >
                            <div className="relative overflow-hidden rounded-lg h-full flex items-center mx-5">
                                <img
                                    src={currentProject.image}
                                    alt={`${currentProject.title} Screenshot`}
                                    className="object-contain max-w-full max-h-full"
                                />
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                <div className="flex justify-center mt-4 flex-wrap gap-2">
                    {currentProject.skills.map((skill, index) => (
                        <button
                            key={index}
                            className="bg-gray-800 text-white px-3 py-1 rounded-full text-xs flex items-center space-x-1"
                        >
                            <img
                                src={currentProject.icons[index]}
                                alt={`${skill} icon`}
                                className="w-6 h-6 max-sm:w-3 max-sm:h-3"
                            />
                            <span className='font-semibold max-sm:text-xs'>{skill}</span>
                        </button>
                    ))}
                </div>

                {/* Fixed position for dots */}
                <div className="mt-8 h-8 flex justify-center space-x-2">
                    {projects.map((_, index) => (
                        <button
                            key={index}
                            className={`w-3 h-3 rounded-full transition-all duration-100 ${index === currentIndex ? 'bg-white scale-125' : 'bg-gray-500'}`}
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
