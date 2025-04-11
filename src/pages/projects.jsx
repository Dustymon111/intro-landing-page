import { useState } from 'react';
import projectData from '../projectData.json';

function Projects() {
    // State to track current project index
    const [currentIndex, setCurrentIndex] = useState(0);

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
        const isFirstProject = currentIndex === 0;
        const newIndex = isFirstProject ? projects.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const goToNext = () => {
        const isLastProject = currentIndex === projects.length - 1;
        const newIndex = isLastProject ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    return (
        <div className="p-8 min-h-screen">
            <h2 className="text-2xl font-bold mb-6">Projects</h2>

            <div className="relative">
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

                <button
                    onClick={goToPrevious}
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white text-teal-500 p-2 rounded-full"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                    </svg>
                </button>

                <button
                    onClick={goToNext}
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white text-teal-500 p-2 rounded-full"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                </button>
            </div>

            {/* Optional: Add dots to show position */}
            <div className="flex justify-center mt-4 space-x-2">
                {projects.map((_, index) => (
                    <button
                        key={index}
                        className={`w-2 h-2 rounded-full ${index === currentIndex ? 'bg-primary' : 'bg-gray-300'}`}
                        onClick={() => setCurrentIndex(index)}
                    />
                ))}
            </div>
        </div>
    );
}

export default Projects;