# CLAUDE.md - Fun Flags Project

## Project Overview

A kid-friendly PWA to explore 250+ world flags with search, filters, and slideshow mode.

**Live at**: `http://localhost:3000` (dev) or deploy to Vercel

## Tech Stack

- **Framework**: Next.js 15.5 (App Router, static export)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4.1
- **Animations**: Framer Motion
- **Flags**: `flag-icons` npm package (SVG flags via CSS classes)
- **Data**: REST Countries API (fetched at build time)
- **Package Manager**: pnpm

## Commands

```bash
pnpm dev              # Development server (Turbopack)
pnpm build            # Generate flags + build static export
pnpm generate:flags   # Regenerate flags.json from API
pnpm start            # Serve production build
pnpm lint             # ESLint
```

## Project Structure

```
fun-flags/
├── app/
│   ├── layout.tsx           # Root layout (fonts, metadata, PWA)
│   ├── page.tsx             # Homepage (grid, search, filters)
│   ├── globals.css          # Tailwind + custom CSS
│   ├── not-found.tsx        # 404 page
│   ├── slideshow/
│   │   └── page.tsx         # Full-screen slideshow
│   └── flag/[code]/
│       └── page.tsx         # Individual flag detail (SSG)
├── components/
│   ├── Header.tsx           # Navigation header
│   ├── FlagCard.tsx         # Flag tile with name + colors
│   ├── FlagGrid.tsx         # Responsive grid of flags
│   ├── FlagDetail.tsx       # Large flag view with details
│   ├── SearchBox.tsx        # Search input with Cmd+K
│   ├── FilterBar.tsx        # Color/count/continent filters
│   └── Slideshow.tsx        # Slideshow with swipe + keyboard
├── lib/
│   ├── types.ts             # TypeScript interfaces + constants
│   ├── flags.ts             # Flag utilities (filter, search)
│   └── constants.ts         # App config (theme, limits)
├── data/
│   └── flags.json           # Generated: 250 flags with colors
├── scripts/
│   └── generate-flags.ts    # Build script for flag data
└── public/
    ├── manifest.json        # PWA manifest
    ├── favicon.svg          # App icon
    └── icons/               # PWA icons
```

## Data Model

### Flag Interface
```typescript
interface Flag {
  code: string;          // ISO 3166-1 alpha-2 (e.g., "IN", "US")
  name: string;          // Country name
  continent: string;     // Continent name
  capital: string;       // Capital city
  colors: string[];      // Hex colors in flag
  colorCount: number;    // Number of colors
  population?: number;   // Population
  area?: number;         // Area in km²
  languages?: string[];  // Official languages
}
```

### Filter State
```typescript
interface FilterState {
  search: string;           // Search query
  colors: string[];         // Selected color hex values (AND logic)
  colorCount: number | null; // Filter by number of colors
  continent: string | null;  // Filter by continent
}
```

## Key Implementation Details

### Flag Display (flag-icons)
The `flag-icons` package uses CSS background images. To display a flag:
```tsx
<div
  className={`fi fi-${code.toLowerCase()}`}
  style={{
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  }}
/>
```
**Important**: Apply `fi` class directly to the div, not a nested span.

### Color Filter Logic
- Multi-select: Users can select multiple colors
- AND logic: Flags must contain ALL selected colors
- Color matching uses Euclidean distance in RGB space with threshold
- 14 available filter colors defined in `FILTER_COLORS`

### Static Generation
- `/flag/[code]` pages use `generateStaticParams()` for SSG
- All 250 flag pages are pre-built at build time
- Data loaded from `data/flags.json` (generated from API)

### Slideshow Features
- Arrow keys: Navigate prev/next
- Space: Next flag
- Escape: Exit slideshow
- Touch swipe: Mobile navigation
- Auto-play: 3-second interval

## Design System

### Colors (Kid-Friendly Theme)
```
Coral:      #FF6B6B  (primary accent)
Sunny:      #FFE66D  (yellow highlight)
Sky:        #4ECDC4  (teal/cyan)
Purple:     #A78BFA  (purple accent)
Orange:     #FF9F43  (orange accent)
Cream:      #FFF5E6  (light background)
Dark:       #1A1A2E  (dark mode background)
```

### Fonts
- **Display**: Fredoka (playful, rounded headers)
- **Body**: Nunito (friendly, readable)

### CSS Classes
- `.flag-grid` - Responsive grid (2-8 columns)
- `.flag-card` - Hover animations on cards
- `.gradient-warm` - Coral to yellow gradient
- `.gradient-cool` - Sky to purple gradient

## Filter Colors (14 total)
```typescript
Red, Blue, Green, Yellow, White, Black, Orange,
Light Blue, Maroon, Gold, Brown, Pink, Purple, Teal
```

## Continents (7 total)
```
Africa, Antarctica, Asia, Europe, North America, Oceania, South America
```

## Build Process

1. `pnpm generate:flags` - Fetches REST Countries API, merges with curated color data
2. `pnpm build` - Runs generate + Next.js static export
3. Output: `/out` directory with 255 static HTML pages

## Adding New Features

### Add a New Filter Color
1. Edit `lib/types.ts` → `FILTER_COLORS` array
2. Add `{ name: "Color Name", hex: "#HEXCODE" }`

### Add a New Page
1. Create `app/[route]/page.tsx`
2. For dynamic routes with static export, add `generateStaticParams()`

### Modify Flag Data
1. Edit `scripts/generate-flags.ts`
2. Run `pnpm generate:flags`
3. Data saved to `data/flags.json`

## Known Limitations

- PWA icons need to be generated (currently placeholder SVG)
- No offline caching (next-pwa not configured yet)
- Color matching is approximate (RGB distance threshold)

## Future Enhancements (from original plan)

- [ ] Quiz mode (`/quiz`) - Flag guessing game
- [ ] Sound effects (optional, muted by default)
- [ ] Confetti animation on correct answers
- [ ] Dark mode toggle
- [ ] Full PWA with offline support
- [ ] Install prompt component

## Testing Checklist

- [ ] All 250 flags load in grid
- [ ] Search filters by country/capital/continent
- [ ] Color multi-select shows flags with ALL colors
- [ ] Slideshow navigation (arrows, swipe, auto-play)
- [ ] Individual flag pages load with details
- [ ] Mobile responsive (2-8 column grid)
- [ ] Build succeeds with `pnpm build`

## Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Connect repo to Vercel
3. Auto-detects Next.js, deploys static export

### Manual
```bash
pnpm build
# Deploy /out directory to any static host
```

## Git History

```
3760a08 Add enhanced multi-select color filter with 14 colors
94ed8f1 Fix flag display to properly fill card containers
74453af Initial commit: Fun Flags app
```
