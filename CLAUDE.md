# Weight Tracker — Claude Code Context

## What this project is
A personal weight loss tracking app for Callum. Single HTML file, no build step, no npm. Currently runs as a local `file://` in Arc browser on Mac.

## Current state
- Single file: `Weight Tracker Claude.html`
- Data stored in `localStorage` (Mac only, not synced)
- Charts via Chart.js + chartjs-adapter-date-fns (CDN)
- Fonts: Syne + JetBrains Mono (Google Fonts CDN)
- Dark theme, green accent (`#4ade80`), minimal aesthetic

## Planned next steps (in order)
1. **Firebase Firestore** — swap localStorage for Firestore so data syncs live across all devices
2. **GitHub Pages** — deploy the HTML file so it's accessible via a real URL on both Mac and iPhone
3. **Responsive design** — different layouts for desktop (Mac) and mobile (iPhone), both using the same HTML file via CSS media queries

## Architecture decisions
- **Stay single-file HTML** — no Vite, no React, no npm. CDN scripts only. This keeps zero startup overhead (just open the URL) and easy deployment via git push.
- **No login/auth** — personal use only. Firebase security rules will restrict by domain rather than user auth.
- **GitHub Pages for hosting** — free, permanent, updates in ~30s after `git push`
- **Firebase free tier** — no credit card needed, personal usage (100-200 reads/writes/day) is far below limits

## User context
- Callum is a software developer — no need to over-explain technical concepts
- Uses Arc browser on both Mac and iPhone
- Wants zero manual intervention to open the app (pinned tab in Arc)
- Previous pain point: RENPHO app doesn't use a true time-scaled X axis — this app does
- Wants near-instant dev feedback loop when making changes

## Design system
- Background: `#0b0c0e` (--bg), `#111316` (--bg2), `#181a1f` (--bg3)
- Borders: `#222429` (--border), `#2a2d35` (--border2)
- Text: `#e8eaf0` (--text), `#5a5f70` (--muted)
- Accent: `#4ade80` (--accent), green glow at 25% opacity
- Red: `#f87171`, Amber: `#fbbf24`
- Font: Syne (UI), JetBrains Mono (labels/numbers)

## Dev workflow (once GitHub Pages is set up)
1. Edit `Weight Tracker Claude.html` locally
2. `git add . && git commit -m "..." && git push`
3. GitHub Pages republishes in ~30s — both Mac and iPhone see update on refresh
