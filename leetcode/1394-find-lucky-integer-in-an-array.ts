// https://leetcode.com/problems/find-lucky-integer-in-an-array
// Given an array of integers arr, a lucky integer is an integer that has a frequency in the array equal to its value.
// Return the largest lucky integer in the array. If there is no lucky integer return -1.

// Example 1:
// Input: arr = [2,2,3,4]
// Output: 2
// Explanation: The only lucky number in the array is 2 because frequency[2] == 2.

// Example 2:
// Input: arr = [1,2,2,3,3,3]
// Output: 3
// Explanation: 1, 2 and 3 are all lucky numbers, return the largest of them.

// Example 3:
// Input: arr = [2,2,2,3,3]
// Output: -1
// Explanation: There are no lucky numbers in the array.

function findLucky(arr: number[]): number {
  const freq = new Map<number, number>();
  for (const n of arr) {
    freq.set(n, (freq.get(n) || 0) + 1);
  }
  let result = -1;
  for (const [num, count] of freq.entries()) {
    if (num === count && num > result) {
      result = num;
    }
  }
  return result;
}
