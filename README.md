# Fun Flags 🏳️‍🌈

A kid-friendly web app to explore all 250+ world flags with search, filters, and slideshow mode.

## Features

- **Flag Grid**: Browse all 250+ country flags in a responsive grid
- **Search**: Real-time search by country name, capital, or continent
- **Color Filters**: Filter flags by color (red, blue, green, yellow, white, black, orange)
- **Color Count**: Filter by number of colors in the flag
- **Continent Filter**: Filter by continent (Africa, Asia, Europe, etc.)
- **Slideshow Mode**: Full-screen slideshow with swipe/keyboard navigation
- **Individual Flag Pages**: Detailed view with country info

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Flags**: flag-icons (SVG flags)
- **Country Data**: REST Countries API (cached at build time)

## Getting Started

```bash
# Install dependencies
pnpm install

# Generate flags data
pnpm generate:flags

# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

## Project Structure

```
fun-flags/
├── app/
│   ├── layout.tsx          # Root layout with fonts
│   ├── page.tsx            # Homepage with flag grid
│   ├── slideshow/          # Slideshow page
│   ├── flag/[code]/        # Individual flag pages
│   └── not-found.tsx       # 404 page
├── components/
│   ├── FlagCard.tsx        # Individual flag tile
│   ├── FlagGrid.tsx        # Responsive grid
│   ├── SearchBox.tsx       # Search input
│   ├── FilterBar.tsx       # Color/count/continent filters
│   ├── Slideshow.tsx       # Full-screen slideshow
│   ├── FlagDetail.tsx      # Detailed flag view
│   └── Header.tsx          # Navigation header
├── lib/
│   ├── types.ts            # TypeScript interfaces
│   ├── flags.ts            # Flag utilities
│   └── constants.ts        # App constants
├── data/
│   └── flags.json          # Generated flag data
├── scripts/
│   └── generate-flags.ts   # Build script for flag data
└── public/
    ├── manifest.json       # PWA manifest
    └── icons/              # App icons
```

## Data Generation

The app uses the REST Countries API to fetch country data at build time. The `generate-flags.ts` script:

1. Fetches all countries from REST Countries API
2. Merges with predefined flag colors
3. Generates `data/flags.json` with 250+ flags

## Design

- **Colors**: Coral, Sunny Yellow, Sky Blue, Purple, Orange
- **Fonts**: Fredoka (headers), Nunito (body)
- **Animations**: Bounce, wiggle, slide transitions
- **Theme**: Kid-friendly with large touch targets

## License

MIT
