"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

export function Header() {
  const pathname = usePathname();

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

          {/* Navigation */}
          <nav className="flex items-center gap-1 md:gap-3">
            <NavLink href="/" active={pathname === "/"}>
              <span className="hidden sm:inline">🏠</span> Home
            </NavLink>
            <NavLink href="/slideshow" active={pathname === "/slideshow"}>
              <span className="hidden sm:inline">🎬</span> Slideshow
            </NavLink>
            <NavLink href="/about" active={pathname === "/about"}>
              <span className="hidden sm:inline">👋</span> About
            </NavLink>
          </nav>
        </div>
      </div>
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
          px-3 md:px-4 py-2 rounded-full font-semibold text-sm
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
