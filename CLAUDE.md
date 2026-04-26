# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start Vite dev server with HMR
npm run build    # Production build to dist/
npm run preview  # Preview the production build locally
npm run lint     # ESLint check
npm start        # Serve dist/ via `serve` (Railway deployment)
```

## Architecture

**Stack:** React 19 + Vite 8 (Oxc JSX). No TypeScript, no CSS framework, no component library.

All application code lives in a single file: [src/App.jsx](src/App.jsx) (~1,200 lines). The structure is:

1. **GlobalStyles** (lines ~23–540) — A component that injects a `<style>` tag containing all CSS. Design tokens live here as CSS custom properties (`--bg`, `--blue`, `--green`, `--text`, etc.). All animations are defined as named keyframes here.

2. **Custom hooks** (lines ~546–580):
   - `useInView(threshold)` — Intersection Observer; adds `.visible` class to trigger scroll animations.
   - `useCounter(target, duration, go)` — Animates numeric counters in the Stats section.

3. **Data constants** — `NAV_ITEMS`, `PROBLEMS`, `STEPS`, `FEATURES`, `PLANS`, `FAQS`, `STUDENTS`, `PARTICLES` are plain arrays defined at the module level before the components.

4. **Components** — All defined in the same file in order: `GlobalStyles → Particles → DashboardMockup → Navbar → Hero → Stats → Problem → HowItWorks → Features → Pricing → FAQ → CTAFinal → Footer → App`.

## Styling conventions

- All styles are inline in the `<style>` tag inside `GlobalStyles`. No external `.css` files (App.css and index.css are intentionally empty).
- Scroll-triggered reveals: add the `sa` class to an element; `useInView` appends `visible` on intersection. Stagger with `d1`–`d8` delay classes.
- Responsive breakpoints: 1024px (hero layout), 960px (feature/problem grids), 768px (mobile nav), 720px (stats), 580px (single-column cards).
- The `.wrap` class centers content with `max-width: 1200px`.

## Product context

This is a Spanish-language (es-MX) B2B SaaS landing page for **Check-in Escolar**, a facial-recognition student attendance system for Mexican schools. All UI copy is in Spanish. The page has no backend — it is a static sales funnel (Hero → Problem → How It Works → Features → Pricing → FAQ → CTA).

Deployed on Railway via `npm start` (`serve dist/ -s -p $PORT`).
