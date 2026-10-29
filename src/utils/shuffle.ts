/**
 * Fisher-Yates shuffle, returning a new array rather than sorting in place.
 *
 * `[...items].sort(() => Math.random() - 0.5)` is the usual shortcut and it is
 * biased: comparison sorts assume a consistent comparator, so some orderings
 * come up far more often than others.
 */
export const shuffle = <T,>(items: T[]): T[] => {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};
