"use client";

import { useState, useEffect, useCallback } from "react";
import { Flag } from "@/lib/types";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { SLIDESHOW_AUTO_INTERVAL } from "@/lib/constants";

interface SlideshowProps {
  flags: Flag[];
}

export function Slideshow({ flags }: SlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  const [direction, setDirection] = useState(1);

  const currentFlag = flags[currentIndex];

  const goToNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % flags.length);
  }, [flags.length]);

  const goToPrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + flags.length) % flags.length);
  }, [flags.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        goToNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goToPrev();
      } else if (e.key === "Escape") {
        window.history.back();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToNext, goToPrev]);

  // Auto-play
  useEffect(() => {
    if (!isAutoPlay) return;
    const interval = setInterval(goToNext, SLIDESHOW_AUTO_INTERVAL);
    return () => clearInterval(interval);
  }, [isAutoPlay, goToNext]);

  // Touch/swipe handling
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        goToNext();
      } else {
        goToPrev();
      }
    }
    setTouchStart(null);
  };

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -300 : 300,
      opacity: 0,
    }),
  };

  if (!currentFlag) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-500">No flags to display</p>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-purple via-sky to-coral flex flex-col"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-black/20 backdrop-blur-sm">
        <Link
          href="/"
          className="text-white/90 hover:text-white transition-colors"
        >
          <motion.div
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="font-semibold">Back</span>
          </motion.div>
        </Link>

        <div className="text-white text-sm font-medium">
          {currentIndex + 1} / {flags.length}
        </div>

        <motion.button
          onClick={() => setIsAutoPlay(!isAutoPlay)}
          className={`
            px-4 py-2 rounded-full font-semibold text-sm
            ${isAutoPlay ? "bg-white text-coral" : "bg-white/20 text-white"}
          `}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isAutoPlay ? "⏸ Pause" : "▶ Auto"}
        </motion.button>
      </div>

      {/* Flag Display */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-8">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentFlag.code}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="w-full max-w-3xl"
          >
            {/* Flag */}
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
              <div className="aspect-[3/2] relative">
                <span
                  className={`fi fi-${currentFlag.code.toLowerCase()} fis`}
                  style={{
                    position: "absolute",
                    inset: 0,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  role="img"
                  aria-label={`Flag of ${currentFlag.name}`}
                />
              </div>
            </div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6 text-center text-white"
            >
              <h2 className="text-3xl md:text-5xl font-bold drop-shadow-lg">
                {currentFlag.name}
              </h2>
              <p className="text-lg md:text-xl mt-2 opacity-90">
                {currentFlag.continent} • {currentFlag.capital}
              </p>

              {/* Colors */}
              <div className="flex justify-center gap-2 mt-4">
                {currentFlag.colors.map((color, i) => (
                  <motion.div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-white shadow-lg"
                    style={{ backgroundColor: color }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-center gap-4 p-6">
        <motion.button
          onClick={goToPrev}
          className="p-4 bg-white/20 hover:bg-white/30 rounded-full text-white backdrop-blur-sm"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </motion.button>

        <motion.button
          onClick={goToNext}
          className="p-4 bg-white/20 hover:bg-white/30 rounded-full text-white backdrop-blur-sm"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </motion.button>
      </div>

      {/* Keyboard Hints */}
      <div className="hidden md:flex justify-center gap-4 pb-6 text-white/60 text-sm">
        <span>← → Navigate</span>
        <span>Space for next</span>
        <span>Esc to exit</span>
      </div>
    </div>
  );
}
