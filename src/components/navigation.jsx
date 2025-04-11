import { Link } from 'react-router-dom';
import { FaCode, FaGamepad, FaMobileScreenButton, FaAngleDown } from "react-icons/fa6";


function Navigation() {
    return (
        <nav className="flex justify-between items-center p-8">
            <div className="flex space-x-20">
                <Link to="/" className="font-medium">Home</Link>
                <Link to="/projects" className="font-medium">Projects</Link>
                <Link to="/certifications" className="font-medium">Certifications</Link>
                <Link to="/about" className="font-medium">About</Link>
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

export default Navigation;