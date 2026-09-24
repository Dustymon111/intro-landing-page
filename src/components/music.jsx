import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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

    const progress = duration ? (currentTime / duration) * 100 : 0;

    return (
        <div className="glass rounded-3xl p-6 shadow-2xl w-full max-w-md">
            <div className="flex items-center gap-4 mb-5">
                <motion.div
                    className="relative shrink-0 w-16 h-16 rounded-full bg-[conic-gradient(var(--color-accent),var(--color-accent-2),var(--color-accent))] grid place-items-center"
                    animate={{ rotate: isPlaying ? 360 : 0 }}
                    transition={isPlaying ? { duration: 6, repeat: Infinity, ease: 'linear' } : { duration: 0.6 }}
                >
                    <div className="w-5 h-5 rounded-full bg-ink border border-white/20" />
                </motion.div>
                <div className="min-w-0">
                    <h3 className="text-base sm:text-lg font-bold leading-snug">{songs[currentIndex].title}</h3>
                    <p className="text-sm text-slate-400">{songs[currentIndex].artist}</p>
                </div>
            </div>

            <audio ref={audioRef} src={songs[currentIndex].src} />

            {/* Slider */}
            <div className="flex items-center gap-3 mb-5 font-mono text-xs text-slate-400">
                <span className="w-10">{formatTime(currentTime)}</span>
                <input
                    type="range"
                    min={0}
                    max={duration || 0}
                    value={currentTime}
                    onChange={handleSliderChange}
                    aria-label="Seek"
                    className="w-full h-1.5 rounded-full appearance-none cursor-pointer accent-sky-400"
                    style={{ background: `linear-gradient(90deg, var(--color-accent) ${progress}%, rgb(255 255 255 / 0.15) ${progress}%)` }}
                />
                <span className="w-10 text-right">{formatTime(duration)}</span>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-6">
                <motion.button onClick={prevSong} aria-label="Previous track" className="text-xl text-slate-300 hover:text-white" whileTap={{ scale: 0.85 }}><IoPlaySkipBackSharp /></motion.button>
                <motion.button
                    onClick={playPause}
                    aria-label={isPlaying ? 'Pause' : 'Play'}
                    className="grid place-items-center w-14 h-14 rounded-full bg-white text-ink text-2xl shadow-[0_0_24px_-4px] shadow-accent/70"
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.9 }}
                >
                    {isPlaying ? <IoPauseSharp /> : <IoPlaySharp className="ml-0.5" />}
                </motion.button>
                <motion.button onClick={nextSong} aria-label="Next track" className="text-xl text-slate-300 hover:text-white" whileTap={{ scale: 0.85 }}><IoPlaySkipForward /></motion.button>
            </div>
        </div>
    );
}
