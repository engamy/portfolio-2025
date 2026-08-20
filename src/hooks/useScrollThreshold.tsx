import { useEffect } from 'react';

/**
 * Shared plumbing for every scroll-driven behaviour in the app.
 *
 * Registers a single passive scroll listener and coalesces bursts of scroll
 * events into one callback per animation frame, so handlers that read layout
 * (getBoundingClientRect) do not force a reflow on every event.
 *
 * Pass null to skip listening entirely.
 */
export const useScrollListener = (onScroll: (() => void) | null) => {
  useEffect(() => {
    if (!onScroll) return;

    let frame: number | null = null;

    const schedule = () => {
      if (frame !== null) return;
      frame = window.requestAnimationFrame(() => {
        frame = null;
        onScroll();
      });
    };

    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });

    // Run once so the initial state matches the current scroll position.
    onScroll();

    return () => {
      if (frame !== null) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [onScroll]);
};

/** The app's shared scroll threshold, expressed in vw. */
export const SCROLL_THRESHOLD_VW = 30;

/** Converts a vw threshold to pixels against the current viewport width. */
export const thresholdInPixels = (thresholdVw: number = SCROLL_THRESHOLD_VW) =>
  window.innerWidth * (thresholdVw / 100);

/** True while the page is scrolled less than `thresholdVw` from the top. */
export const isAboveThreshold = (thresholdVw: number = SCROLL_THRESHOLD_VW) =>
  window.scrollY < thresholdInPixels(thresholdVw);
