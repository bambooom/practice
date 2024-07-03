// https://leetcode.com/problems/missing-number-in-arithmetic-progression/
// In some array arr, the values were in arithmetic progression: the values arr[i + 1] - arr[i] are all equal for every 0 <= i < arr.length - 1.
// #binary-search
// A value from arr was removed that was not the first or last value in the array.
// Given arr, return the removed value.

// Example 1:
// Input: arr = [5,7,11,13]
// Output: 9
// Explanation: The previous array was [5,7,9,11,13].
// Example 2:
// Input: arr = [15,13,12]
// Output: 14
// Explanation: The previous array was [15,14,13,12].

function missingNumber(arr: number[]): number {
  const diff = (arr[arr.length - 1] - arr[0]) / arr.length;
  if (diff === 0) {
    return arr[0];
  }
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] - arr[i - 1] !== diff) {
      return arr[i] - diff;
    }
  }
  return NaN;
}

// binary search approach
function missingNumber2(arr: number[]): number {
  const len = arr.length;
  const diff = (arr[len - 1] - arr[0]) / len;

  let start = 0;
  let end = len - 1;

  while (start <= end) {
    const mid = Math.floor((end - start) / 2) + start;
    const expectedMidVal = diff * mid + arr[0];
    if (expectedMidVal !== arr[mid]) {
      end = mid - 1;
    } else {
      start = mid + 1;
    }
  }

  return diff * start + arr[0];
}
