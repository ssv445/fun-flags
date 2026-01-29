export const SITE_NAME = "Fun Flags";
export const SITE_DESCRIPTION = "Explore all world flags with fun animations and filters!";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://funflags.app";

// Theme colors
export const THEME = {
  colors: {
    coral: "#FF6B6B",
    sunny: "#FFE66D",
    sky: "#4ECDC4",
    purple: "#A78BFA",
    orange: "#FF9F43",
    cream: "#FFF5E6",
    dark: "#1A1A2E",
    darkCard: "#2D2D44",
  },
} as const;

// Animation settings
export const SLIDESHOW_AUTO_INTERVAL = 3000; // 3 seconds
export const SEARCH_DEBOUNCE_MS = 150;

// Grid settings
export const FLAGS_PER_PAGE = 50;

// Color matching threshold (for determining if a flag contains a color)
export const COLOR_MATCH_THRESHOLD = 30; // RGB distance threshold
