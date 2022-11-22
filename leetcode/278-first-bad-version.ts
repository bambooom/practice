/**
 * Suppose you have n versions [1, 2, ..., n] and you want to find out the first bad one, which causes all the following ones to be bad.
 *
 * The knows API is defined in the parent class Relation.
 * isBadVersion(version: number): boolean {
 *     ...
 * };
 */

// binary search
// Time complexity : O(logn).
// Space: O(1)
const solution = function (isBadVersion: (version: number) => boolean) {
  return function (n: number): number {
    let low = 1,
      high = n;
    if (isBadVersion(low)) return low;
    while (low < high) {
      const mid = Math.floor((low + high) / 2);
      if (isBadVersion(mid)) {
        high = mid;
      } else {
        low = mid + 1;
      }
    }

    return low;
  };
};
