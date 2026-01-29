"use client";

import { useState, useEffect, useMemo } from "react";
import { Flag, FilterState, FILTER_COLORS, CONTINENTS } from "@/lib/types";
import { filterFlags, sortFlagsAlphabetically } from "@/lib/flags";
import { FlagGrid } from "@/components/FlagGrid";
import { SearchBox } from "@/components/SearchBox";
import { motion, AnimatePresence } from "framer-motion";

export default function HomePage() {
  const [flags, setFlags] = useState<Flag[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    colors: [],
    colorCount: null,
    continent: null,
  });

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

  const filteredFlags = useMemo(() => {
    return filterFlags(flags, filters);
  }, [flags, filters]);

  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const toggleColor = (hex: string) => {
    const newColors = filters.colors.includes(hex)
      ? filters.colors.filter((c) => c !== hex)
      : [...filters.colors, hex];
    handleFilterChange({ colors: newColors });
  };

  const hasActiveFilters =
    filters.colors.length > 0 || filters.colorCount !== null || filters.continent !== null;

  const clearAllFilters = () => {
    setFilters({
      search: "",
      colors: [],
      colorCount: null,
      continent: null,
    });
  };

  // Get active filter tags for display
  const activeFilterTags = [
    ...filters.colors.map((hex) => ({
      type: "color" as const,
      value: hex,
      label: FILTER_COLORS.find((c) => c.hex === hex)?.name || hex,
    })),
    ...(filters.colorCount
      ? [{ type: "count" as const, value: filters.colorCount, label: `${filters.colorCount}${filters.colorCount === 6 ? "+" : ""} colors` }]
      : []),
    ...(filters.continent
      ? [{ type: "continent" as const, value: filters.continent, label: filters.continent }]
      : []),
  ];

  return (
    <div className="min-h-screen pb-8">
      {/* Hero + Search + Filters Section */}
      <section className="gradient-warm py-8 md:py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl mb-3"
          >
            🌍
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-2xl md:text-4xl font-bold text-white mb-2 drop-shadow-lg"
          >
            Explore World Flags!
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base md:text-lg text-white/90 mb-6"
          >
            {filteredFlags.length} of {flags.length} flags
          </motion.p>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-6"
          >
            <SearchBox
              value={filters.search}
              onChange={(search) => handleFilterChange({ search })}
              placeholder="Type a country name..."
            />
          </motion.div>

          {/* Filters - Kid Friendly */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-white/95 backdrop-blur rounded-2xl p-4 shadow-lg text-left"
          >
            {/* Color Picker */}
            <div className="mb-4">
              <p className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <span className="text-lg">🎨</span> Pick colors in the flag:
              </p>
              <div className="flex flex-wrap gap-2">
                {FILTER_COLORS.map((color) => {
                  const isSelected = filters.colors.includes(color.hex);
                  return (
                    <button
                      key={color.hex}
                      onClick={() => toggleColor(color.hex)}
                      className={`
                        relative rounded-full transition-all flex-shrink-0
                        ${color.hex === "#FFFFFF" ? "border-2 border-gray-300" : ""}
                        ${isSelected ? "ring-4 ring-coral ring-offset-2 scale-110" : "hover:scale-110"}
                      `}
                      style={{
                        backgroundColor: color.hex,
                        width: "36px",
                        height: "36px",
                      }}
                      title={color.name}
                    >
                      {isSelected && (
                        <span className="absolute inset-0 flex items-center justify-center text-white text-lg drop-shadow-md">
                          ✓
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Continent Picker */}
            <div className="mb-4">
              <p className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <span className="text-lg">🗺️</span> Pick a continent:
              </p>
              <div className="flex flex-wrap gap-2">
                {CONTINENTS.map((continent) => (
                  <motion.button
                    key={continent}
                    onClick={() =>
                      handleFilterChange({
                        continent: filters.continent === continent ? null : continent,
                      })
                    }
                    className={`
                      px-3 py-1.5 rounded-full font-medium text-sm transition-all
                      ${filters.continent === continent
                        ? "bg-sky text-white shadow-md"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }
                    `}
                    whileTap={{ scale: 0.95 }}
                  >
                    {continent}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Active Filters Display */}
            <AnimatePresence>
              {(hasActiveFilters || filters.search) && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="pt-3 border-t border-gray-200"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm text-gray-500">Active:</span>

                    {filters.search && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="inline-flex items-center gap-1 px-2 py-1 bg-purple/20 text-purple rounded-full text-sm"
                      >
                        🔍 &quot;{filters.search}&quot;
                        <button
                          onClick={() => handleFilterChange({ search: "" })}
                          className="ml-1 hover:bg-purple/20 rounded-full p-0.5"
                        >
                          ✕
                        </button>
                      </motion.span>
                    )}

                    {activeFilterTags.map((tag, i) => (
                      <motion.span
                        key={`${tag.type}-${tag.value}`}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: i * 0.05 }}
                        className="inline-flex items-center gap-1 px-2 py-1 bg-coral/20 text-coral rounded-full text-sm"
                      >
                        {tag.type === "color" && (
                          <span
                            className="w-3 h-3 rounded-full border border-gray-300"
                            style={{ backgroundColor: tag.value as string }}
                          />
                        )}
                        {tag.label}
                        <button
                          onClick={() => {
                            if (tag.type === "color") {
                              toggleColor(tag.value as string);
                            } else if (tag.type === "count") {
                              handleFilterChange({ colorCount: null });
                            } else {
                              handleFilterChange({ continent: null });
                            }
                          }}
                          className="ml-1 hover:bg-coral/20 rounded-full p-0.5"
                        >
                          ✕
                        </button>
                      </motion.span>
                    ))}

                    <motion.button
                      onClick={clearAllFilters}
                      className="ml-auto text-sm text-gray-500 hover:text-coral underline"
                      whileTap={{ scale: 0.95 }}
                    >
                      Clear all
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

        </div>
      </section>

      {/* Flag Grid */}
      <section className="max-w-7xl mx-auto px-4 py-6 overflow-hidden">
        <FlagGrid
          flags={filteredFlags}
          loading={loading}
          emptyMessage={
            filters.search
              ? `No flags found for "${filters.search}"`
              : "No flags match your filters"
          }
        />
      </section>
    </div>
  );
}
