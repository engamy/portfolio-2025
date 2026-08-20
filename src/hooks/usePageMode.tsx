import { useCallback, useEffect } from 'react';
import { useDarkMode } from '../contexts/DarkModeContext';
import { isAboveThreshold, useScrollListener } from './useScrollThreshold';

interface PageModeOptions {
  /** The mode the page uses at the top of the document. */
  initial: boolean;
  /**
   * Selector for the section whose top edge reaching the top of the viewport
   * flips the page out of its initial mode. Omit for pages that never flip.
   */
  flipAt?: string;
  /**
   * Flip after the shared 30vw scroll threshold rather than at a specific
   * element. For pages with no distinct panel boundary.
   */
  flipAfterScroll?: boolean;
}

/**
 * Declares a page's dark mode behaviour in one call.
 *
 * Replaces the older usePageDarkMode + useScrollDarkMode pairing, where the two
 * had to agree with each other and one wrong argument silently disabled the
 * scroll response with no visible error.
 */
export const usePageMode = ({
  initial,
  flipAt,
  flipAfterScroll = false,
}: PageModeOptions) => {
  const { setDarkMode } = useDarkMode();
  const flips = Boolean(flipAt) || flipAfterScroll;

  const applyMode = useCallback(() => {
    if (flipAt) {
      const target = document.querySelector(flipAt);
      // Until the target exists there is nothing to measure against, so hold
      // the initial mode rather than guessing.
      if (!target) {
        setDarkMode(initial);
        return;
      }
      const reachedTarget = target.getBoundingClientRect().top <= 0;
      setDarkMode(reachedTarget ? !initial : initial);
      return;
    }

    setDarkMode(isAboveThreshold() ? initial : !initial);
  }, [flipAt, initial, setDarkMode]);

  useScrollListener(flips ? applyMode : null);

  // Pages that never flip only need their mode set once, on mount.
  useEffect(() => {
    if (flips) return;
    setDarkMode(initial);
  }, [flips, initial, setDarkMode]);
};
