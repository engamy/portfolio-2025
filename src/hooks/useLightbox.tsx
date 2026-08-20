import { useCallback, useMemo, useState } from 'react';

/** The shape ImageLightbox renders. */
export interface LightboxImage {
  id: number;
  src: string;
  alt: string;
  caption: string;
}

/**
 * Makes a non-button element behave like one: clickable, focusable, and
 * operable with Enter or Space. Galleries that manage their own selection
 * state use this directly; the rest get it via useLightbox.triggerProps.
 */
export const activateProps = (onActivate: () => void, label: string) => ({
  role: 'button',
  tabIndex: 0,
  'aria-label': `View ${label}`,
  onClick: onActivate,
  onKeyDown: (event: React.KeyboardEvent) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    onActivate();
  },
});

/**
 * Owns the open/close/step state that every gallery in the app needs, plus the
 * props that make a thumbnail keyboard-operable.
 *
 * Previously each gallery kept its own pair of useState calls and its own
 * open/close handlers, and none of them were reachable without a mouse.
 */
export const useLightbox = (images: LightboxImage[]) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const open = useCallback((index: number) => setOpenIndex(index), []);
  const close = useCallback(() => setOpenIndex(null), []);

  const step = useCallback(
    (delta: number) => {
      setOpenIndex(current => {
        if (current === null || images.length === 0) return current;
        // Wrap around in both directions.
        return (current + delta + images.length) % images.length;
      });
    },
    [images.length]
  );

  const next = useCallback(() => step(1), [step]);
  const previous = useCallback(() => step(-1), [step]);

  /**
   * Spread onto a thumbnail to make it behave like a button: clickable,
   * focusable, and operable with Enter or Space.
   */
  const triggerProps = useCallback(
    (index: number, label: string) => activateProps(() => open(index), label),
    [open]
  );

  const currentImage = openIndex === null ? null : images[openIndex] ?? null;

  return useMemo(
    () => ({
      isOpen: openIndex !== null && currentImage !== null,
      currentImage,
      openIndex,
      open,
      close,
      next,
      previous,
      triggerProps,
    }),
    [openIndex, currentImage, open, close, next, previous, triggerProps]
  );
};

/**
 * For pages that open one arbitrary image at a time rather than stepping
 * through a gallery.
 *
 * `trigger(src, alt, caption)` returns the props for the element that opens it,
 * including the keyboard handling.
 */
export const useSingleImageLightbox = () => {
  const [currentImage, setCurrentImage] = useState<LightboxImage | null>(null);

  const close = useCallback(() => setCurrentImage(null), []);

  const trigger = useCallback(
    (src: string, alt: string, caption: string = '') =>
      activateProps(
        () => setCurrentImage({ id: Date.now(), src, alt, caption }),
        alt
      ),
    []
  );

  return { isOpen: currentImage !== null, currentImage, close, trigger };
};
