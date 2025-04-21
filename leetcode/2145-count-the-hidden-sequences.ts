// https://leetcode.com/problems/count-the-hidden-sequences
// You are given a 0-indexed array of n integers differences, which describes the differences between each pair of consecutive integers of a hidden sequence of length (n + 1). More formally, call the hidden sequence hidden, then we have that differences[i] = hidden[i + 1] - hidden[i].
// You are further given two integers lower and upper that describe the inclusive range of values [lower, upper] that the hidden sequence can contain.
// For example, given differences = [1, -3, 4], lower = 1, upper = 6, the hidden sequence is a sequence of length 4 whose elements are in between 1 and 6 (inclusive).
// [3, 4, 1, 5] and [4, 5, 2, 6] are possible hidden sequences.
// [5, 6, 3, 7] is not possible since it contains an element greater than 6.
// [1, 2, 3, 4] is not possible since the differences are not correct.
// Return the number of possible hidden sequences there are. If there are no possible sequences, return 0.

// Example 1:
// Input: differences = [1,-3,4], lower = 1, upper = 6
// Output: 2
// Explanation: The possible hidden sequences are:
// - [3, 4, 1, 5]
// - [4, 5, 2, 6]
// Thus, we return 2.

// Example 2:
// Input: differences = [3,-4,5,1,-2], lower = -4, upper = 5
// Output: 4
// Explanation: The possible hidden sequences are:
// - [-3, 0, -4, 1, 2, 0]
// - [-2, 1, -3, 2, 3, 1]
// - [-1, 2, -2, 3, 4, 2]
// - [0, 3, -1, 4, 5, 3]
// Thus, we return 4.

// Example 3:
// Input: differences = [4,-7,2], lower = 3, upper = 6
// Output: 0
// Explanation: There are no possible hidden sequences. Thus, we return 0.

function numberOfArrays(
  differences: number[],
  lower: number,
  upper: number,
): number {
  // use prefix sum differences to reconstruct val, find the min and max val
  const n = differences.length;
  let prefdiff = 0;
  let min = 0;
  let max = 0;

  for (let i = 1; i < n + 1; i++) {
    prefdiff += differences[i - 1];
    min = Math.min(prefdiff, min);
    max = Math.max(prefdiff, max);
  }

  // determine number of valid based on min and max
  const validToMin = lower - min;
  const validToMax = upper - max;
  // if the valid min is greater than max, return 0
  return Math.max(0, validToMax - validToMin + 1);
  // We can consider it as the number of positions where a small window of length aj −ai can be placed while sliding within a large window of length upper−lower.
}
