"use client";

import { useState, useEffect, useMemo } from "react";
import { Flag, FilterState } from "@/lib/types";
import { filterFlags, sortFlagsAlphabetically } from "@/lib/flags";
import { FlagGrid } from "@/components/FlagGrid";
import { SearchBox } from "@/components/SearchBox";
import { FilterBar } from "@/components/FilterBar";
import { motion } from "framer-motion";
import Link from "next/link";

export default function HomePage() {
  const [flags, setFlags] = useState<Flag[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    colors: [],
    colorCount: null,
    continent: null,
  });

  // Load flags data
  useEffect(() => {
    async function loadData() {
      try {
        const data = await import("@/data/flags.json");
        setFlags(sortFlagsAlphabetically(data.default as Flag[]));
      } catch (error) {
        console.error("Failed to load flags:", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Filter flags
  const filteredFlags = useMemo(() => {
    return filterFlags(flags, filters);
  }, [flags, filters]);

  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  return (
    <div className="min-h-screen pb-8">
      {/* Hero Section */}
      <section className="gradient-warm py-12 md:py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl mb-4"
          >
            🌍
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg"
          >
            Explore World Flags!
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-white/90 mb-8"
          >
            Discover flags from {flags.length}+ countries around the world
          </motion.p>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <SearchBox
              value={filters.search}
              onChange={(search) => handleFilterChange({ search })}
              placeholder="Search by country, capital, or continent..."
            />
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex justify-center gap-4 mt-6"
          >
            <Link href="/slideshow">
              <motion.button
                className="px-6 py-3 bg-white text-coral rounded-xl font-bold shadow-lg"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                🎬 Slideshow Mode
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        {/* Filters */}
        <FilterBar
          filters={filters}
          onFilterChange={handleFilterChange}
          flagCount={filteredFlags.length}
        />

        {/* Flag Grid */}
        <div className="mt-6">
          <FlagGrid
            flags={filteredFlags}
            loading={loading}
            emptyMessage={
              filters.search
                ? `No flags found for "${filters.search}"`
                : "No flags match your filters"
            }
          />
        </div>
      </section>

      {/* Fun Facts Section */}
      {!loading && flags.length > 0 && (
        <section className="max-w-4xl mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
          >
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
              <span>💡</span> Fun Fact!
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Did you know? There are over 190 recognized countries in the world, each with its own unique flag!
              The most common colors in flags are red, white, and blue.
            </p>
          </motion.div>
        </section>
      )}
    </div>
  );
}
