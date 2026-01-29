"use client";

import { Flag } from "@/lib/types";
import { motion } from "framer-motion";
import Link from "next/link";

interface FlagCardProps {
  flag: Flag;
  index?: number;
  onClick?: () => void;
  showName?: boolean;
}

export function FlagCard({ flag, index = 0, onClick, showName = true }: FlagCardProps) {
  // Limit stagger delay to first 20 cards for performance
  const staggerDelay = index < 20 ? index * 0.02 : 0;

  return (
    <motion.div
      className="w-full min-w-0"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.2,
        delay: staggerDelay,
        ease: "easeOut",
      }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
      <Link
        href={`/flag/${flag.code.toLowerCase()}`}
        onClick={onClick}
        className="block flag-card bg-[#F8F4EF] dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow w-full"
      >
        <div
          className={`aspect-[4/3] fi fi-${flag.code.toLowerCase()}`}
          style={{
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
          role="img"
          aria-label={`Flag of ${flag.name}`}
        />
        {showName && (
          <div className="p-3 text-center">
            <h3 className="font-semibold text-sm text-gray-800 dark:text-white truncate">
              {flag.name}
            </h3>
            <div className="flex justify-center gap-1 mt-2">
              {flag.colors.slice(0, 4).map((color, i) => (
                <div
                  key={i}
                  className="w-3 h-3 rounded-full border border-gray-200 dark:border-gray-600 flex-shrink-0"
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
              {flag.colors.length > 4 && (
                <span className="text-xs text-gray-400">+{flag.colors.length - 4}</span>
              )}
            </div>
          </div>
        )}
      </Link>
    </motion.div>
  );
}

export function FlagCardSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg animate-pulse">
      <div className="aspect-[4/3] bg-gray-200 dark:bg-gray-700" />
      <div className="p-3">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mx-auto w-3/4" />
        <div className="flex justify-center gap-1 mt-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="w-3 h-3 rounded-full bg-gray-200 dark:bg-gray-700" />
          ))}
        </div>
      </div>
    </div>
  );
}
