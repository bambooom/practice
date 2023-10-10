// https://leetcode.com/problems/guess-number-higher-or-lower/
// #binary-search

/**
 * Forward declaration of guess API.
 * @param {number} num   your guess
 * @return 	     -1 if num is higher than the picked number
 *			      1 if num is lower than the picked number
 *               otherwise return 0
 * var guess = function(num) {}
 */

const guess = function (num: number): -1 | 1 | 0 {
  // fake code
  if (num > 6) {
    return 1;
  } else if (num < 6) {
    return -1;
  } else {
    return 0;
  }
};
function guessNumber(n: number): number {
  let low = 1;
  let high = n;

  while (low <= high) {
    const middle = Math.floor((low + high) / 2);
    if (guess(middle) === -1) {
      high = middle - 1;
    } else if (guess(middle) === 1) {
      low = middle + 1;
    } else {
      return middle;
    }
  }

  return -1;
}
