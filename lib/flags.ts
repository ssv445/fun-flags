import { Flag, FilterState, FILTER_COLORS } from "./types";

// Load flags from static JSON
export async function loadFlags(): Promise<Flag[]> {
  try {
    const data = await import("@/data/flags.json");
    return data.default as Flag[];
  } catch {
    console.error("Failed to load flags data");
    return [];
  }
}

// Color distance calculation (Euclidean distance in RGB space)
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

function colorDistance(hex1: string, hex2: string): number {
  const c1 = hexToRgb(hex1);
  const c2 = hexToRgb(hex2);
  if (!c1 || !c2) return Infinity;

  return Math.sqrt(
    Math.pow(c1.r - c2.r, 2) +
    Math.pow(c1.g - c2.g, 2) +
    Math.pow(c1.b - c2.b, 2)
  );
}

// Check if flag contains a specific filter color (with tolerance)
export function flagContainsColor(flag: Flag, filterColor: string, threshold = 60): boolean {
  return flag.colors.some((flagColor) => colorDistance(flagColor, filterColor) < threshold);
}

// Filter flags based on current filter state
export function filterFlags(flags: Flag[], filters: FilterState): Flag[] {
  let result = [...flags];

  // Search filter
  if (filters.search.trim()) {
    const searchLower = filters.search.toLowerCase().trim();
    result = result.filter(
      (flag) =>
        flag.name.toLowerCase().includes(searchLower) ||
        flag.code.toLowerCase().includes(searchLower) ||
        flag.capital.toLowerCase().includes(searchLower) ||
        flag.continent.toLowerCase().includes(searchLower)
    );
  }

  // Color filter (must contain ALL selected colors)
  if (filters.colors.length > 0) {
    result = result.filter((flag) =>
      filters.colors.every((filterColor) => flagContainsColor(flag, filterColor))
    );
  }

  // Color count filter
  if (filters.colorCount !== null) {
    result = result.filter((flag) => {
      if (filters.colorCount === 6) {
        return flag.colorCount >= 6;
      }
      return flag.colorCount === filters.colorCount;
    });
  }

  // Continent filter
  if (filters.continent) {
    result = result.filter((flag) => flag.continent === filters.continent);
  }

  return result;
}

// Sort flags alphabetically
export function sortFlagsAlphabetically(flags: Flag[]): Flag[] {
  return [...flags].sort((a, b) => a.name.localeCompare(b.name));
}

// Get random flags for slideshow
export function getRandomFlags(flags: Flag[], count: number): Flag[] {
  const shuffled = [...flags].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

// Get flag by code
export function getFlagByCode(flags: Flag[], code: string): Flag | undefined {
  return flags.find((f) => f.code.toLowerCase() === code.toLowerCase());
}

// Get all unique continents from flags
export function getUniqueContinents(flags: Flag[]): string[] {
  const continents = new Set(flags.map((f) => f.continent));
  return Array.from(continents).sort();
}

// Get color statistics for a set of flags
export function getColorStats(flags: Flag[]): Record<string, number> {
  const stats: Record<string, number> = {};

  FILTER_COLORS.forEach((color) => {
    stats[color.hex] = flags.filter((flag) => flagContainsColor(flag, color.hex)).length;
  });

  return stats;
}

// Generate a readable description of a flag
export function getFlagDescription(flag: Flag): string {
  const colorNames = flag.colors.length > 0
    ? `with ${flag.colorCount} color${flag.colorCount > 1 ? "s" : ""}`
    : "";
  return `The flag of ${flag.name}, located in ${flag.continent}, ${colorNames}. Capital: ${flag.capital}.`;
}
