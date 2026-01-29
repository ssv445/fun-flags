"use client";

import { Flag } from "@/lib/types";
import { FlagCard, FlagCardSkeleton } from "./FlagCard";
import { motion } from "framer-motion";

interface FlagGridProps {
  flags: Flag[];
  loading?: boolean;
  emptyMessage?: string;
}

export function FlagGrid({ flags, loading = false, emptyMessage = "No flags found" }: FlagGridProps) {
  if (loading) {
    return (
      <div className="flag-grid">
        {[...Array(24)].map((_, i) => (
          <FlagCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (flags.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-16"
      >
        <div className="text-6xl mb-4">🔍</div>
        <p className="text-xl text-gray-600 dark:text-gray-400 font-medium">
          {emptyMessage}
        </p>
        <p className="text-gray-500 dark:text-gray-500 mt-2">
          Try adjusting your search or filters
        </p>
      </motion.div>
    );
  }

  return (
    <div className="flag-grid">
      {flags.map((flag, index) => (
        <FlagCard key={flag.code} flag={flag} index={index} />
      ))}
    </div>
  );
}
