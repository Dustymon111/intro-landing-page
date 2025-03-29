import { FaCode, FaGamepad, FaMobileScreenButton, FaAngleDown } from "react-icons/fa6";

function App() {
  return (
    <div className="bg-gradient-to-b from-[#32BBB4] to-[#25A6CA] text-white px-4">
      {/* Navigation */}
      <nav className="flex justify-between items-center p-8">
        <div className="flex space-x-20">
          <a href="#" className="font-medium">Home</a>
          <a href="#" className="font-medium">Projects</a>
          <a href="#" className="font-medium">Certifications</a>
          <a href="#" className="font-medium">Contact</a>
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

      {/* Hero Section */}
      <div className="flex justify-between px-24 py-12 min-h-screen">
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

      {/* About Me Section */}
      <div className="p-8 min-h-screen">
        <h2 className="text-2xl font-bold mb-4 text-right">About Me</h2>
        {/* Content for About Me would go here */}
      </div>

      {/* Projects Section */}
      <div className="p-8 min-h-screen">
        <h2 className="text-2xl font-bold mb-6">Projects</h2>

        <div className="relative">
          <div className="flex items-center mb-2">
            <h3 className="font-medium">Perhimpunan Dokter Keluarga Indonesia</h3>
            <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 6H6C4.89543 6 4 6.89543 4 8V18C4 19.1046 4.89543 20 6 20H16C17.1046 20 18 19.1046 18 18V14M14 4H20M20 4V10M20 4L10 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <p className="text-sm mb-4">Official Website</p>

          <div className="relative h-48 overflow-hidden rounded-lg border-4 border-white">
            <img
              src="/api/placeholder/600/200"
              alt="Project Screenshot"
              className="w-full"
            />
          </div>

          <div className="flex justify-center mt-4 space-x-2">
            <button className="bg-gray-800 text-white px-2 py-1 rounded-full text-xs">Next.js</button>
            <button className="bg-gray-800 text-white px-2 py-1 rounded-full text-xs">Express.js</button>
            <button className="bg-gray-800 text-white px-2 py-1 rounded-full text-xs">TypeScript</button>
            <button className="bg-gray-800 text-white px-2 py-1 rounded-full text-xs">SQL</button>
          </div>

          <button className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white text-teal-500 p-2 rounded-full">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>

          <button className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white text-teal-500 p-2 rounded-full">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Certifications Section */}
      <div className="p-8">
        <h2 className="text-2xl font-bold mb-4">Certifications</h2>
        {/* Certification content would go here */}
      </div>

      {/* Contact Section */}
      <div className="p-8">
        <h2 className="text-2xl font-bold mb-4">Contact</h2>
        {/* Contact content would go here */}
      </div>
    </div>

  );
}

export default App;
