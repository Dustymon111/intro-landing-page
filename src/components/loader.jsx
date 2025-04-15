function Loader() {
    return (
        <div className="flex items-center justify-center h-screen bg-black">
            <div className="w-60 h-2 bg-gray-800 rounded overflow-hidden">
                <div className="h-full bg-teal-400 animate-loadBar" />
            </div>
        </div>
    );
}

export default Loader;