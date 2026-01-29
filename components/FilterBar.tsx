"use client";

import { FILTER_COLORS, CONTINENTS, FilterState } from "@/lib/types";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface FilterBarProps {
  filters: FilterState;
  onFilterChange: (filters: Partial<FilterState>) => void;
  flagCount: number;
}

export function FilterBar({ filters, onFilterChange, flagCount }: FilterBarProps) {
  const [showFilters, setShowFilters] = useState(false);

  const toggleColor = (hex: string) => {
    const newColors = filters.colors.includes(hex)
      ? filters.colors.filter((c) => c !== hex)
      : [...filters.colors, hex];
    onFilterChange({ colors: newColors });
  };

  const setColorCount = (count: number | null) => {
    onFilterChange({ colorCount: filters.colorCount === count ? null : count });
  };

  const setContinent = (continent: string | null) => {
    onFilterChange({ continent: filters.continent === continent ? null : continent });
  };

  const clearFilters = () => {
    onFilterChange({
      colors: [],
      colorCount: null,
      continent: null,
    });
  };

  const hasActiveFilters =
    filters.colors.length > 0 || filters.colorCount !== null || filters.continent !== null;

  return (
    <div className="space-y-4">
      {/* Toggle Button & Flag Count */}
      <div className="flex items-center justify-between">
        <motion.button
          onClick={() => setShowFilters(!showFilters)}
          className={`
            flex items-center gap-2 px-4 py-2 rounded-full
            font-semibold text-sm
            transition-all
            ${showFilters
              ? "bg-coral text-white"
              : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 shadow-md"
            }
          `}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
            />
          </svg>
          Filters
          {hasActiveFilters && (
            <span className="w-2 h-2 rounded-full bg-sunny" />
          )}
        </motion.button>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-gray-500 dark:text-gray-400 text-sm font-medium"
        >
          {flagCount} flag{flagCount !== 1 ? "s" : ""}
        </motion.div>
      </div>

      {/* Filter Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 md:p-6 shadow-lg space-y-6">
              {/* Color Filter */}
              <div>
                <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                  <span className="text-lg">🎨</span> By Color
                </h3>
                <div className="flex flex-wrap gap-3">
                  {FILTER_COLORS.map((color) => (
                    <motion.button
                      key={color.hex}
                      onClick={() => toggleColor(color.hex)}
                      className={`
                        color-dot
                        w-10 h-10 rounded-full
                        border-4 transition-all
                        ${filters.colors.includes(color.hex)
                          ? "border-coral scale-110 ring-2 ring-coral/30"
                          : "border-gray-200 dark:border-gray-600"
                        }
                        ${color.hex === "#FFFFFF" ? "shadow-md" : ""}
                      `}
                      style={{ backgroundColor: color.hex }}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      title={color.name}
                      aria-label={`Filter by ${color.name}`}
                    />
                  ))}
                </div>
              </div>

              {/* Color Count Filter */}
              <div>
                <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                  <span className="text-lg">🔢</span> Number of Colors
                </h3>
                <div className="flex flex-wrap gap-2">
                  {[1, 2, 3, 4, 5, 6].map((count) => (
                    <motion.button
                      key={count}
                      onClick={() => setColorCount(count)}
                      className={`
                        px-4 py-2 rounded-full font-bold text-sm
                        transition-all
                        ${filters.colorCount === count
                          ? "bg-coral text-white"
                          : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                        }
                      `}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {count === 6 ? "6+" : count}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Continent Filter */}
              <div>
                <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                  <span className="text-lg">🌍</span> By Continent
                </h3>
                <div className="flex flex-wrap gap-2">
                  {CONTINENTS.map((continent) => (
                    <motion.button
                      key={continent}
                      onClick={() => setContinent(continent)}
                      className={`
                        px-4 py-2 rounded-full font-semibold text-sm
                        transition-all
                        ${filters.continent === continent
                          ? "bg-sky text-white"
                          : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                        }
                      `}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {continent}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              {hasActiveFilters && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onClick={clearFilters}
                  className="w-full py-3 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  Clear All Filters
                </motion.button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
