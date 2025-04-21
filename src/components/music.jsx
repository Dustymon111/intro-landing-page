import React, { useRef, useState, useEffect } from 'react';
import { IoPlaySkipBackSharp, IoPlaySkipForward, IoPlaySharp, IoPauseSharp } from "react-icons/io5";

const songs = [
    {
        title: 'Budi Goes To School Boss OST (Unreleased)',
        artist: 'Dustin Lionel',
        src: 'https://res.cloudinary.com/dtxkf9qfp/video/upload/v1744740089/boss_wl6snr.mp3',
    },
    {
        title: 'Budi Goes To School Main Menu OST',
        artist: 'Dustin Lionel',
        src: 'https://res.cloudinary.com/dtxkf9qfp/video/upload/v1744740085/menu_nlpm6y.mp3',
    },
    {
        title: 'Budi Goes To School Level OST',
        artist: 'Dustin Lionel',
        src: 'https://res.cloudinary.com/dtxkf9qfp/video/upload/v1744740211/level_mxwduq.mp3',
    },
];

export default function MusicPlayer() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    const audioRef = useRef(null);

    useEffect(() => {
        const audio = audioRef.current;

        const handleTimeUpdate = () => {
            setCurrentTime(audio.currentTime);
        };

        const handleLoadedMetadata = () => {
            setDuration(audio.duration);
        };

        audio.addEventListener('timeupdate', handleTimeUpdate);
        audio.addEventListener('loadedmetadata', handleLoadedMetadata);

        return () => {
            audio.removeEventListener('timeupdate', handleTimeUpdate);
            audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
        };
    }, [currentIndex]);

    const playPause = () => {
        const audio = audioRef.current;
        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
        setIsPlaying(!isPlaying);
    };

    const nextSong = () => {
        const nextIndex = (currentIndex + 1) % songs.length;
        setCurrentIndex(nextIndex);
        setIsPlaying(false);
        setTimeout(() => {
            audioRef.current.play();
            setIsPlaying(true);
        }, 0);
    };

    const prevSong = () => {
        const prevIndex = (currentIndex - 1 + songs.length) % songs.length;
        setCurrentIndex(prevIndex);
        setIsPlaying(false);
        setTimeout(() => {
            audioRef.current.play();
            setIsPlaying(true);
        }, 0);
    };

    const handleSliderChange = (e) => {
        const time = parseFloat(e.target.value);
        audioRef.current.currentTime = time;
        setCurrentTime(time);
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60).toString().padStart(2, '0');
        return `${minutes}:${seconds}`;
    };

    return (
        <div className="bg-gray-900 text-white rounded-lg p-6 shadow-lg max-w-md">
            <h2 className="max-sm:text-lg text-xl font-bold mb-2">{songs[currentIndex].title}</h2>
            <p className="text-sm text-gray-300 mb-4">{songs[currentIndex].artist}</p>

            <audio ref={audioRef} src={songs[currentIndex].src} />

            {/* Slider */}
            <div className="flex items-center space-x-2 mb-4">
                <span className="text-xs w-10">{formatTime(currentTime)}</span>
                <input
                    type="range"
                    min={0}
                    max={duration || 0}
                    value={currentTime}
                    onChange={handleSliderChange}
                    className="w-full h-1 rounded-lg bg-blue-500 accent-blue-600 cursor-pointer"
                />
                <span className="text-xs w-10 text-right">{formatTime(duration)}</span>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center space-x-4">
                <button onClick={prevSong} className="text-2xl"><IoPlaySkipBackSharp /></button>
                <button onClick={playPause} className="text-3xl">
                    {isPlaying ? <IoPauseSharp /> : <IoPlaySharp />}
                </button>
                <button onClick={nextSong} className="text-2xl"><IoPlaySkipForward /></button>
            </div>
        </div>
    );
}
