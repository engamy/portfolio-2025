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

### Adding a new image or video

`.env.local` sets `REACT_APP_USE_S3_VIDEOS=true`, so `getAssetPath()` returns S3 URLs **even in local dev**. A file that only exists on disk will 404. Every new asset has to be uploaded before it appears anywhere.

1. **Put the file in the local tree**, under `public/pictures/portfolio-content_spring2026/...`, in the folder for its section (e.g. `02_DESIGN/02_NEXT/`). The S3 key mirrors this path exactly, so the local folder structure is the source of truth.
2. **Name it in lowercase with hyphens** (`acumatica-mrp.png`), matching the existing files. Avoid spaces; they survive the upload but make URLs awkward.
3. **Reference it through `getAssetPath()`**, never as a bare path:
   ```tsx
   <img src={getAssetPath(`${ASSET_BASE}/acumatica-mrp.png`)} alt="..." />
   ```
   `getAssetPath` strips the leading `/pictures/` and prefixes `assets/`, so `/pictures/foo/bar.png` becomes `<bucket>/assets/foo/bar.png`.
4. **Upload.** For the whole tree, run `./upload-all-assets-to-s3.ps1` from the repo root. It walks `public/pictures/portfolio-content_spring2026` recursively and uploads by extension with the right `Content-Type`. Either way you need the AWS CLI configured with credentials for the `portfolio2025-assets` bucket in `us-east-2`; check with `aws sts get-caller-identity`.

   For one or two new files, copy them directly instead of re-walking everything. The S3 key is the local path with `public/pictures/` replaced by `assets/`:

   ```bash
   aws s3 cp \
     "public/pictures/portfolio-content_spring2026/02_DESIGN/02_NEXT/acumatica-mrp.png" \
     "s3://portfolio2025-assets/assets/portfolio-content_spring2026/02_DESIGN/02_NEXT/acumatica-mrp.png" \
     --content-type "image/png" --region us-east-2
   ```

   Content types: `image/png`, `image/jpeg`, `image/gif`, `image/svg+xml`, `video/mp4`, `video/quicktime`. Passing the wrong one (or omitting it, which defaults to `binary/octet-stream`) makes the browser download the file instead of rendering it.
5. **Verify** the object is public before assuming the page is broken:
   ```bash
   curl -I https://portfolio2025-assets.s3.amazonaws.com/assets/portfolio-content_spring2026/<path>/<file>
   ```
   200 means good. 404 means the upload didn't happen or the key differs from the local path. 403 means the bucket policy isn't applied — see `aws-config/README.md`.

**Lightbox images:** `lightbox.trigger(...)` stores the path verbatim, so the src has to be wrapped: `lightbox.trigger(getAssetPath(path), alt, caption)`. Without the wrap the lightbox loads from the local origin while the inline `<img>` loads from S3, which looks like "the thumbnail is broken but the lightbox works".

**If the file type is new**, add it to `upload-all-assets-to-s3.ps1` with its correct MIME type, or the script silently skips it. Currently handled: `jpg`/`jpeg`, `png`, `gif`, `svg`, `mp4`, `mov`. SVG needs `image/svg+xml`; uploading it as `application/octet-stream` makes the browser download it instead of rendering it.

**Videos:** browsers need an MP4 container, not just H.264 inside a `.mov`. Do not declare a `.mov` as `type="video/mp4"` in a `<source>` — the browser commits to that source and then fails. Either omit the `type` and let it sniff, or remux to `.mp4` (lossless with `ffmpeg -i in.mov -c copy out.mp4` when the codecs are already H.264/AAC).

`upload-videos-to-s3.ps1` is stale and writes to a `videos/*` prefix the bucket policy does not cover. Use `upload-all-assets-to-s3.ps1`.

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
- "It's not X, it's Y" phrasing, and every variant of that shape (see Writing style)
- Checkmark bullets
- Skeleton loaders
- Radial orbs
- Dot grids
- Sparkle icons
- Animated arrows
- Neon colors
- Basic pastel colors
- All-caps labels with wide letter-spacing (eyebrows, kickers, field labels, small
  captions). Never set `text-transform: uppercase` together with a large
  `letter-spacing`. If a label needs to recede, use size, weight, or opacity.

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
- The "It's not X, it's Y" construction. This is a hard ban, and it covers every
  variant of the shape, not just the literal wording: "not X, only Y," "X rather
  than Y," "not X so much as Y," "less about X than about Y," "X, not Y." If a
  sentence defines something by first saying what it isn't, rewrite it to state
  what it is and stop.
- The "not only... but also" pairing
- Punchy two-beat aphorisms used as openers or headings ("Talk first, build
  after," "Measure twice, cut once"). State the actual point in a full sentence.
- "The X mattered more than the Y" and other manufactured-insight framings that
  rank two things to sound profound
- Adverbs that editorialize on what people did, especially "quietly," "simply,"
  "merely," "just." Describe the action plainly.
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
