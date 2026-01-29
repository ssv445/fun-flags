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
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.3,
        delay: index * 0.02,
        ease: "easeOut",
      }}
      whileHover={{ scale: 1.05, rotate: 1 }}
      whileTap={{ scale: 0.95 }}
    >
      <Link
        href={`/flag/${flag.code.toLowerCase()}`}
        onClick={onClick}
        className="block flag-card bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow"
      >
        <div className="aspect-[4/3] relative overflow-hidden bg-gray-100 dark:bg-gray-700">
          <span
            className={`fi fi-${flag.code.toLowerCase()} fis`}
            style={{
              position: "absolute",
              inset: 0,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            role="img"
            aria-label={`Flag of ${flag.name}`}
          />
        </div>
        {showName && (
          <div className="p-3 text-center">
            <h3 className="font-semibold text-sm md:text-base text-gray-800 dark:text-white truncate">
              {flag.name}
            </h3>
            {flag.colors.length > 0 && (
              <div className="flex justify-center gap-1 mt-2">
                {flag.colors.slice(0, 5).map((color, i) => (
                  <div
                    key={i}
                    className="w-3 h-3 rounded-full border border-gray-200 dark:border-gray-600"
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
                {flag.colors.length > 5 && (
                  <span className="text-xs text-gray-400">+{flag.colors.length - 5}</span>
                )}
              </div>
            )}
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
