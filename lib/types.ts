export interface Flag {
  code: string;          // ISO 3166-1 alpha-2 code (e.g., "US", "IN", "GB")
  name: string;          // Country name (e.g., "United States")
  continent: string;     // Continent name (e.g., "North America")
  capital: string;       // Capital city (e.g., "Washington D.C.")
  colors: string[];      // Hex colors in the flag (e.g., ["#B31942", "#FFFFFF", "#0A3161"])
  colorCount: number;    // Number of distinct colors
  population?: number;   // Population (optional)
  area?: number;         // Area in km² (optional)
  languages?: string[];  // Official languages (optional)
}

export interface FilterState {
  search: string;
  colors: string[];
  colorCount: number | null;
  continent: string | null;
}

export const FILTER_COLORS = [
  { name: "Red", hex: "#E53935" },
  { name: "Blue", hex: "#1E88E5" },
  { name: "Green", hex: "#43A047" },
  { name: "Yellow", hex: "#FDD835" },
  { name: "White", hex: "#FFFFFF" },
  { name: "Black", hex: "#212121" },
  { name: "Orange", hex: "#FB8C00" },
  { name: "Light Blue", hex: "#4FC3F7" },
  { name: "Maroon", hex: "#8B0000" },
  { name: "Gold", hex: "#FFD700" },
  { name: "Brown", hex: "#795548" },
  { name: "Pink", hex: "#E91E63" },
  { name: "Purple", hex: "#7B1FA2" },
  { name: "Teal", hex: "#009688" },
] as const;

export const CONTINENTS = [
  "Africa",
  "Antarctica",
  "Asia",
  "Europe",
  "North America",
  "Oceania",
  "South America",
] as const;

export type FilterColor = (typeof FILTER_COLORS)[number];
export type Continent = (typeof CONTINENTS)[number];
