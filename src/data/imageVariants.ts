// Smaller copies of heavy images, for the page to show in place of the
// original. Each entry maps an original's local path to its downscaled copy.
//
// An entry belongs here only once its copy has been uploaded to S3 (see
// CLAUDE.md, "Adding a new image or video"); a path with no entry resolves to
// the original, so an unlisted image never breaks.

/** Original path -> copy sized for inline display on the page. */
const INLINE: Record<string, string> = {};

/** Original path -> copy sized for the lightbox, where the original is huge. */
const FULL: Record<string, string> = {};

/** The copy to show inline, or the original if none is registered. */
export const inlineVariant = (path: string): string => INLINE[path] ?? path;

/** The copy to open in a lightbox, or the original if none is registered. */
export const fullVariant = (path: string): string => FULL[path] ?? path;
