# Weight Tracker — Claude Code Context

## What this project is
A personal weight loss tracking app for Callum. Single HTML file, no build step, no npm. Currently runs as a local `file://` in Arc browser on Mac — GitHub Pages deployment is the immediate next step.

## Current state
- Single file: `Tracker.html`
- Data stored in **Firebase Firestore** (project: `weighttracker-3ab18`) — localStorage has been replaced
- Firestore data confirmed working on Mac (entries persist across refreshes)
- GitHub repo: `callummcanerney/WeightTracker` — exists, but GitHub Pages not yet enabled
- iPhone cannot access the app yet (no public URL)
- Charts via Chart.js + chartjs-adapter-date-fns (CDN)
- Fonts: Syne + JetBrains Mono (Google Fonts CDN)
- Dark theme, green accent (`#4ade80`), minimal aesthetic

## Firestore security rules
Open (`allow read, write: if true`) — no expiry. Acceptable for personal weight data with no auth requirement.

## Completed steps
1. ~~**Firebase Firestore**~~ — done, integrated and working
2. ~~**GitHub Pages**~~ — live at `https://callummcanerney.github.io/WeightTracker/Tracker.html`
3. ~~**Firestore security rules**~~ — set to open with no expiry, published

## Remaining steps (in order)
4. **Responsive design** — different layouts for desktop (Mac) and mobile (iPhone), both using the same HTML file via CSS media queries

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

## Dev workflow
1. Edit `Tracker.html` locally
2. `git add . && git commit -m "..." && git push`
3. GitHub Pages republishes in ~30s — both Mac and iPhone see update on refresh
