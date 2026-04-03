# Weight Tracker — Claude Code Context

## What this project is
A personal weight loss tracking dashboard for Callum. Single HTML file, no build step, no npm. Deployed via GitHub Pages, syncing live across Mac and iPhone via Firebase Firestore.

---

## Infrastructure (all done — don't revisit)

| Concern | Solution | Status |
|---|---|---|
| File | `Tracker.html` — single file, CDN-only | ✅ |
| Data | Firebase Firestore (`weighttracker-3ab18`) | ✅ |
| Hosting | GitHub Pages → `https://callummcanerney.github.io/WeightTracker/Tracker.html` | ✅ |
| Multi-device | Mac + iPhone via Arc browser (pinned tab) — both read same Firestore data | ✅ |
| Auth | None — Firestore rules open (`allow read, write: if true`), acceptable for personal data | ✅ |

**Dev workflow:** edit `Tracker.html` → `git add . && git commit -m "..." && git push` → live in ~30s

---

## Architecture constraints (non-negotiable)
- **Single-file HTML only** — no Vite, no React, no npm. CDN scripts only.
- **No login/auth** — personal use, no need.
- **No backend** — Firestore is the only server-side dependency.

---

## Tech stack
- **Chart.js 4.4.1** + `chartjs-adapter-date-fns` (CDN) — time-scaled X axis (true to scale, unlike RENPHO)
- **Firebase Firestore compat SDK 10.12.2** (CDN) — live `onSnapshot` sync
- **Fonts:** Syne (UI), JetBrains Mono (numbers/labels) — Google Fonts CDN

---

## Current app structure

### Layout (desktop, `100vh` no-scroll dashboard)
```
┌─────────────────────────────────────────────────┐
│ Header                                           │
├─────────────────────────────────────────────────┤
│ Stats row (5 cards)                              │
├─────────────────────────────────────────────────┤
│ Chart — full width, fills remaining height       │
├──────────────────────┬──────────────────────────┤
│ Log Entry panel      │ [right panel — TBD]      │
└──────────────────────┴──────────────────────────┘
```

### Stats row (5 cards)
1. **Starting** — first logged weight + date
2. **Current** — most recent weight + date
3. **Total Lost** — delta from first to last, coloured red/green
4. **Weekly Rate** — kg/week avg over full history, coloured red/green
5. **Goal Progress** — % to goal, coloured amber/green

### Chart
- Line chart: actual weight (green), trend (dashed white), goal (dashed amber)
- Range buttons: 1M / 3M / 6M / All
- `maintainAspectRatio: false` — fills container height
- True time-scaled X axis (key differentiator vs RENPHO)

### Log Entry panel
- Custom date picker: text input (`DD/MM/YYYY`) + calendar dropdown toggle
- Weight input (kg)
- Add Entry button (also triggered by Enter)
- Goal weight input
- Export / Import CSV

### Firestore data model
```js
// collection: 'tracker', doc: 'data'
{
  entries: [{ date: 'YYYY-MM-DD', weight: number }, ...],
  goal: number | null
}
```
Live sync via `onSnapshot` — all state is in `_entries` and `_goal` in-memory.

---

## Design system

| Token | Value | Usage |
|---|---|---|
| `--bg` | `#0b0c0e` | Page background |
| `--bg2` | `#111316` | Panel/card background |
| `--bg3` | `#181a1f` | Input background |
| `--border` | `#222429` | Subtle borders |
| `--border2` | `#2a2d35` | Input borders, hover states |
| `--text` | `#e8eaf0` | Primary text |
| `--muted` | `#5a5f70` | Labels, secondary text |
| `--accent` | `#4ade80` | Green — positive, active, brand |
| `--red` | `#f87171` | Negative delta, gain |
| `--amber` | `#fbbf24` | Neutral/in-progress states |

**Fonts:** Syne for UI text, JetBrains Mono for all numbers and monospaced labels.
**Inputs:** bg3 background, border2 border, accent focus ring (`box-shadow: 0 0 0 3px var(--accent-dim)`).

---

## User context
- Callum is a software developer — no need to over-explain
- Stats-oriented and visual/geometric thinker
- Uses Arc browser, Mac (primary) + iPhone
- Wants the dashboard to be as information-dense and insightful as possible
- No scroll on desktop — everything visible at once

---

## Roadmap / planned features
These are in-progress or agreed — implement in this order unless told otherwise:

1. **[In progress]** Insights panel (right panel, replaces history log):
   - Progress ring/arc (SVG, % of goal)
   - Projected goal date (extrapolated from trend)
   - Consistency stat (X/30 days · X%)
   - Goal % weekly loss rate input → drives a 14-day exponential decay projection line on the chart

2. **Responsive design** — mobile layout for iPhone (same HTML, CSS media queries)

---

## Known issues / bugs
- Export CSV calls were previously broken (called `load()` — now fixed to use `_entries`)

---

## Feature ideas (backlog — not yet agreed)
- 7-day rolling average overlay on chart
- Rate-of-change sparkline (weekly delta over time)
- Plateau detection (flag on chart when <0.2 kg change over 7+ days)
- Ideal BMI band on chart (requires height input)
- Best week ever stat
- "What if" pace calculator
