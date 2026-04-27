# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start          # dev server at http://localhost:3000
npm run build      # production build → build/
npm test           # Jest test runner (watch mode)
```

## Architecture

**Stack**: React 19 + TypeScript, Create React App (react-scripts), React Router DOM v6, React Spring for animations.

**Entry point**: `src/index.tsx` → `BrowserRouter` → `App.tsx` → `DarkModeProvider` wraps all routes.

**Routes** are defined in `App.tsx`. Top-level pages live in `src/components/mainpages/`. Individual project pages live in `src/components/art-collections/` and `src/components/design-collections/`. All routes share the same `<Navbar>` and `<Footer>` rendered at the app level.

**Dark mode** is a global context (`src/contexts/DarkModeContext.tsx`). Individual pages set their mode on mount via `usePageDarkMode`, trigger transitions on scroll via `useScrollDarkMode`, or use the About-specific hook `useAboutNavbarMode`. The Navbar reads this context to swap its own styles.

**Assets** are hosted on AWS S3. The `src/utils/assetUtils.ts` `getAssetPath()` helper resolves paths to either local `/pictures/` or `https://portfolio2025-assets.s3.amazonaws.com/...` depending on the environment. AWS credentials live in `.env.local`.

**Styling** uses plain CSS files co-located with each component (no Tailwind, no Sass). Responsive layouts use `vw` units and media queries; max content width is ~1200px.

**Gallery/display components** in `src/components/page-components/` are reusable across project pages: `MasonryGrid`, `ImageLightbox` (keyboard-navigable, Esc/arrow keys), `SimplePDFViewer`, `BeforeAfterComparison`, `InstagramPosts`, `SignageInStore`, and several specialized grid layouts. When adding a new project page, compose from these existing components rather than building new display primitives.

**Physics / parallax**: `matter-js` is used for interactive physics animations. A device-tilt parallax effect is wired on mobile (added in recent commits). Custom type definitions are in `src/matter-js.d.ts`.
