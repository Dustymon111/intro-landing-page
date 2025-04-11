import { FaCode, FaGamepad, FaMobileScreenButton, FaAngleDown } from "react-icons/fa6";
import Navigation from "./components/navigation";

function App() {
  return (
    <div className="flex justify-between px-24 py-12">
      <div className="space-y-7">
        <p className="text-3xl">Hi! Nice to meet you.</p>
        <div className="flex items-center space-x-2">
          <p className="text-3xl">I am</p>
          <div className="w-4 h-4 rounded-full bg-yellow-400"></div>
        </div>
        <h1 className="text-6xl font-bold">Dustin Lionel.</h1>
        <p className="text-xl">Software Developer</p>

        <div className="flex space-x-10 mt-4">
          <div className="flex items-center space-x-3">
            <div className="w-1 h-1 rounded-full bg-white"></div>
            <span>Web</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-1 h-1 rounded-full bg-white"></div>
            <span>Mobile</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-1 h-1 rounded-full bg-white"></div>
            <span>Game</span>
          </div>
        </div>
      </div>

      <div className="relative">
        <div className="w-80 h-80 z-10 rounded-full bg-primary absolute right-24 top-28"></div>
        <img
          src="./profilepic.png"
          alt="Dustin Lionel"
          className="relative object-cover [clip-path:inset(0%_0%_23%_0%)] -top-8 right-24 z-10 scale-110"
        />
        <div className="absolute z-1 -top-14 -right-12">
          <div className="w-32 h-32 rounded-full outline outline-4 bg-trasparent flex items-center justify-center">
            <FaMobileScreenButton size={80} />
          </div>
        </div>
        <div className="absolute z-20 right-4 top-16">
          <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
            <div className="w-10 h-8 border-2 border-teal-500 rounded-sm"></div>
          </div>
        </div>
        <div className="absolute z-20 right-24 top-36">
          <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
            <div className="w-10 h-6 border-2 border-teal-500 rounded-sm flex items-center justify-center">
              <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
