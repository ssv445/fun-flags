"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen pb-8">
      {/* Hero Section */}
      <section className="gradient-cool py-12 md:py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl mb-4"
          >
            👋
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg"
          >
            About Flags for Kids
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-white/90"
          >
            A fun way to learn about world flags!
          </motion.p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-3xl mx-auto px-4 py-8 space-y-8">
        {/* About the App */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
        >
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
            <span>🌍</span> About This App
          </h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            Flags for Kids is a fun app designed to help children explore and learn about flags
            from over 250 countries around the world. With colorful filters, a slideshow mode, and
            detailed flag information, learning about geography has never been more fun!
          </p>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
        >
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
            <span>✨</span> Features
          </h2>
          <ul className="space-y-3 text-gray-600 dark:text-gray-400">
            <li className="flex items-start gap-3">
              <span className="text-xl">🔍</span>
              <span>Search flags by country name, capital, or continent</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-xl">🎨</span>
              <span>Filter flags by colors to find similar designs</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-xl">🎬</span>
              <span>Slideshow mode for continuous learning</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-xl">📱</span>
              <span>Works offline as a Progressive Web App</span>
            </li>
          </ul>
        </motion.div>

        {/* Created By */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
        >
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
            <span>👨‍💻</span> Created By
          </h2>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-coral to-sunny flex items-center justify-center text-3xl">
              🚀
            </div>
            <div className="text-center sm:text-left">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                Shyam Verma
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">
                Full Stack Developer
              </p>
              <div className="flex gap-3 justify-center sm:justify-start">
                <a
                  href="https://twitter.com/shyamverma"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky hover:underline text-sm font-medium"
                >
                  Twitter
                </a>
                <a
                  href="https://linkedin.com/in/shyamverma"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky hover:underline text-sm font-medium"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-2xl p-6"
        >
          <h2 className="text-xl font-bold text-amber-800 dark:text-amber-200 mb-4 flex items-center gap-2">
            <span>⚠️</span> Disclaimer
          </h2>
          <div className="text-amber-700 dark:text-amber-300 text-sm space-y-3">
            <p>
              This app is created for <strong>educational purposes only</strong>.
              All flag data and country information is sourced from public APIs
              and may not be 100% accurate or up-to-date.
            </p>
            <p>
              The author assumes <strong>no legal responsibility</strong> for the
              use of this application or any information displayed within it.
            </p>
            <p>
              If you have any concerns, questions, or issues with the content,
              please contact the author via{" "}
              <a
                href="https://twitter.com/shyamverma"
                target="_blank"
                rel="noopener noreferrer"
                className="underline font-medium hover:text-amber-900 dark:hover:text-amber-100"
              >
                Twitter
              </a>{" "}
              or{" "}
              <a
                href="https://linkedin.com/in/shyamverma"
                target="_blank"
                rel="noopener noreferrer"
                className="underline font-medium hover:text-amber-900 dark:hover:text-amber-100"
              >
                LinkedIn
              </a>.
            </p>
          </div>
        </motion.div>

        {/* Back to Home */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-center"
        >
          <Link href="/">
            <motion.button
              className="px-6 py-3 bg-coral text-white rounded-xl font-bold shadow-lg"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              🏠 Back to Exploring
            </motion.button>
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
