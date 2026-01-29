"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Close menu when clicking outside or pressing Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <motion.div
              className="text-2xl"
              whileHover={{ rotate: 10, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              🌍🚩
            </motion.div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-coral via-sunny to-sky bg-clip-text text-transparent">
                Flags for Kids
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">
                Explore the world!
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-3">
            <NavLink href="/" active={pathname === "/"}>
              🏠 Home
            </NavLink>
            <NavLink href="/slideshow" active={pathname === "/slideshow"}>
              🎬 Slideshow
            </NavLink>
            <NavLink href="/about" active={pathname === "/about"}>
              👋 About
            </NavLink>
          </nav>

          {/* Mobile Burger Button */}
          <motion.button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <motion.span
                className="w-full h-0.5 bg-gray-700 dark:bg-gray-300 rounded-full origin-left"
                animate={isMenuOpen ? { rotate: 45, y: -2 } : { rotate: 0, y: 0 }}
              />
              <motion.span
                className="w-full h-0.5 bg-gray-700 dark:bg-gray-300 rounded-full"
                animate={isMenuOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
              />
              <motion.span
                className="w-full h-0.5 bg-gray-700 dark:bg-gray-300 rounded-full origin-left"
                animate={isMenuOpen ? { rotate: -45, y: 2 } : { rotate: 0, y: 0 }}
              />
            </div>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/20 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              style={{ top: "60px" }}
            />
            {/* Menu */}
            <motion.nav
              className="absolute left-0 right-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-lg md:hidden"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-2">
                <MobileNavLink href="/" active={pathname === "/"}>
                  🏠 Home
                </MobileNavLink>
                <MobileNavLink href="/slideshow" active={pathname === "/slideshow"}>
                  🎬 Slideshow
                </MobileNavLink>
                <MobileNavLink href="/about" active={pathname === "/about"}>
                  👋 About
                </MobileNavLink>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

function NavLink({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link href={href}>
      <motion.span
        className={`
          px-4 py-2 rounded-full font-semibold text-sm
          transition-all inline-flex items-center gap-1
          ${active
            ? "bg-coral text-white"
            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
          }
        `}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {children}
      </motion.span>
    </Link>
  );
}

function MobileNavLink({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link href={href}>
      <motion.span
        className={`
          block px-4 py-3 rounded-xl font-semibold text-base
          transition-all
          ${active
            ? "bg-coral text-white"
            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
          }
        `}
        whileTap={{ scale: 0.98 }}
      >
        {children}
      </motion.span>
    </Link>
  );
}
