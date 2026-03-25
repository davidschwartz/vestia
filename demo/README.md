# Vestia Demo

Interactive product demo for Vestia — a mentorship platform for early-career women.

**Live at:** [demo.joinvestia.com](https://demo.joinvestia.com)

## What's in the demo

A mobile-first interactive prototype showing the core MVP screens:

- **Onboarding flow** — stage selection, needs assessment, cohort assignment
- **Home Dashboard** — stage indicator, weekly actions, active goals, target companies
- **Explore** — content library with domain filters and module detail view
- **Network** — Personal Board of Directors, connections, job tracker
- **Job Search Tracker** — pipeline stats, offers with salary detail, action items
- **Messages** — mentor 1:1 chat, cohort group chat, notifications
- **Profile** — journey stats, settings
- **Journey Map** — full stage visualization

Demo persona: **Cindy Herd**, Stage 2: Landing (all names are fictional).

## Local development

```bash
cd demo
npm install
npm run dev
```

Opens at `http://localhost:5173`

## Deploying to Netlify

The demo is deployed as a **separate Netlify site** from the same GitHub repo, using the `demo/` folder as the base directory.

### Setup steps

1. In Netlify, click **Add new site → Import an existing project**
2. Connect to the same GitHub repo as the main site
3. Set **Base directory** to `demo`
4. Build command: `npm install && npm run build`
5. Publish directory: `demo/dist`
6. Under **Domain management**, add `demo.joinvestia.com` (or `demo.vestia.co`) as a custom domain

The `netlify.toml` inside `demo/` handles the build config automatically, so steps 3–5 should auto-populate.

### Why a separate Netlify site?

The main site (`vestia.co`) publishes static HTML from `site/`. The demo is a React SPA that needs a build step. Netlify doesn't support multiple build pipelines from one site, so the cleanest approach is two Netlify sites from the same repo with different base directories.

## Tech stack

- React 18
- Vite 6
- No external UI libraries — all components are custom-built to match the Vestia design system

## Design system

All colors, typography, spacing, and components follow the Vestia Product Requirements & Design System document. Key tokens:

- **Brand:** Navy `#1B365D`, Teal `#2A7F8E`, Coral `#C75C3A`, Gold `#C49A2A`
- **Stages:** Exploring (teal tint), Landing (gold tint), Building (purple tint), Advancing (coral tint)
- **Domains:** Career Nav, Getting Hired, Performance, Money, Network, Identity — each with consistent color coding
- **Typography:** System font stack, two weights only (400 regular, 500 medium)
- **Layout:** 375px base width, 20px page padding, 12px card radius
