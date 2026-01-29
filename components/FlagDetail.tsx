"use client";

import { Flag } from "@/lib/types";
import { motion } from "framer-motion";
import Link from "next/link";

interface FlagDetailProps {
  flag: Flag;
}

export function FlagDetail({ flag }: FlagDetailProps) {
  return (
    <div className="min-h-screen bg-cream dark:bg-dark py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-coral transition-colors font-medium"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to all flags
          </Link>
        </motion.div>

        {/* Flag Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden"
        >
          {/* Flag Image */}
          <div className="aspect-[3/2] relative">
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

          {/* Info */}
          <div className="p-6 md:p-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-2">
              {flag.name}
            </h1>
            <p className="text-lg text-gray-500 dark:text-gray-400 mb-6">
              {flag.code}
            </p>

            {/* Details Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <DetailCard
                icon="🌍"
                label="Continent"
                value={flag.continent}
              />
              <DetailCard
                icon="🏛️"
                label="Capital"
                value={flag.capital}
              />
              <DetailCard
                icon="🎨"
                label="Colors"
                value={`${flag.colorCount} colors`}
              />
              {flag.population && (
                <DetailCard
                  icon="👥"
                  label="Population"
                  value={formatNumber(flag.population)}
                />
              )}
            </div>

            {/* Colors Display */}
            {flag.colors.length > 0 && (
              <div className="mt-8">
                <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                  <span>🎨</span> Flag Colors
                </h2>
                <div className="flex flex-wrap gap-3">
                  {flag.colors.map((color, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 rounded-full px-3 py-2"
                    >
                      <div
                        className="w-6 h-6 rounded-full border-2 border-white shadow-md"
                        style={{ backgroundColor: color }}
                      />
                      <span className="text-sm font-mono text-gray-700 dark:text-gray-300">
                        {color}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Languages */}
            {flag.languages && flag.languages.length > 0 && (
              <div className="mt-8">
                <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                  <span>💬</span> Languages
                </h2>
                <div className="flex flex-wrap gap-2">
                  {flag.languages.map((lang, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-sky/20 text-sky rounded-full text-sm font-medium"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/slideshow">
                <motion.button
                  className="px-6 py-3 bg-coral text-white rounded-xl font-bold shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  🎬 View in Slideshow
                </motion.button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function DetailCard({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 text-center">
      <div className="text-2xl mb-1">{icon}</div>
      <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
        {label}
      </div>
      <div className="font-bold text-gray-800 dark:text-white text-sm">
        {value}
      </div>
    </div>
  );
}

function formatNumber(num: number): string {
  if (num >= 1e9) return (num / 1e9).toFixed(1) + "B";
  if (num >= 1e6) return (num / 1e6).toFixed(1) + "M";
  if (num >= 1e3) return (num / 1e3).toFixed(1) + "K";
  return num.toString();
}
