import { useCallback, useState } from 'react';
import {
  isAboveThreshold,
  useScrollListener,
} from './useScrollThreshold';

/** True while the page is scrolled less than `thresholdVw` from the top. */
export const useScrollVisibility = (thresholdVw: number = 35) => {
  const [isVisible, setIsVisible] = useState(true);

  const update = useCallback(() => {
    setIsVisible(isAboveThreshold(thresholdVw));
  }, [thresholdVw]);

  useScrollListener(update);

  return isVisible;
};
