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

## Design principles

This is a designer's portfolio. Avoid the visual clichés that make a site read as AI-generated. Do not use:

- Harsh gradients
- Lucide icons
- Pure white backgrounds
- Rainbow coloring
- Drop shadows
- Three feature cards in a row
- Emojis
- Liquid glass effects
- Em dashes (unless genuinely necessary)
- Colored left stripes / accent borders
- Fake testimonials
- Bento grids
- Terminal windows
- "It's not X, it's Y" phrasing
- Checkmark bullets
- Skeleton loaders
- Radial orbs
- Dot grids
- Sparkle icons
- Animated arrows
- Neon colors
- Basic pastel colors

## Writing style

When writing copy, docs, or any prose, avoid these LLM writing patterns. Most are only a problem in aggregate, so the rule is "avoid unless the context genuinely calls for it," not a hard ban.

**Overused words and phrases**
- "delve," "dive into," "unpack," "explore" (as filler verbs)
- "it's worth noting," "it's important to note," "it's worth mentioning"
- "in today's world," "in the modern era," "in an age of"
- "at the end of the day," "when all is said and done"
- "a tapestry of," "a rich tapestry," "the fabric of"
- "navigate" (as in "navigate the complexities of")
- "landscape" (as in "the ever-evolving landscape")
- "realm," "sphere," "domain" (as vague scope-setters)
- "leverage" (when "use" works)
- "robust," "seamless," "streamlined," "cutting-edge," "game-changing"
- "testament to," "stands as a testament"
- "underscores," "highlights," "showcases" (as filler verbs)
- "boasts," "features" (for describing capabilities)
- "elevate," "empower," "unlock," "harness"
- "myriad," "plethora," "a host of"
- "crucial," "vital," "essential," "pivotal" (when overused as intensifiers)
- "resonate," "resonates with"

**Sentence and structure tics**
- The "It's not just X, it's Y" construction
- The "not only... but also" pairing
- "Whether you're a [X] or a [Y]" setups
- Starting sentences with "Indeed," "Moreover," "Furthermore," "Additionally," "That said," "Ultimately"
- Rhetorical questions used as transitions ("But what does this mean?")
- Ending paragraphs with a forward-looking flourish ("The possibilities are endless")
- Tricolons everywhere: forcing ideas into groups of three ("faster, cleaner, and more reliable")
- Excessive parallelism where every sentence mirrors the last
- Restating the prompt back before answering
- Summary sentences that add nothing ("In summary," "To sum up," "All in all")

**Tone and hedging**
- Over-hedging: "may," "might," "could potentially," "arguably" stacked together
- Excessive qualifiers softening every claim
- Empty affirmations: "Great question," "That's a solid point," "Absolutely"
- Reflexive both-sidesing when a direct answer is warranted
- Motivational-poster endings ("The journey is just beginning")
- Over-explaining the obvious or defining terms the reader already knows

**Formatting habits**
- Em dashes as the default connector
- Bold scattered across random keywords for emphasis
- Bullet lists where prose would read better
- Headers on short sections that don't need them
- Emoji as decoration or section markers
- Numbered "key takeaways" appended to everything

Caveats: words like "crucial" or "essential" aren't banned outright; the tell is using them constantly as filler intensifiers. And a few patterns (bullet lists, headers, hedging) are correct in the right context, so avoid them unless the format genuinely calls for it rather than overcorrecting into stilted output.
