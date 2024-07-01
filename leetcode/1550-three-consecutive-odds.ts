// https://leetcode.com/problems/three-consecutive-odds
// Given an integer array arr, return true if there are three consecutive odd numbers in the array. Otherwise, return false.
// 需要连续3个奇数

// Example 1:
// Input: arr = [2,6,4,1]
// Output: false
// Explanation: There are no three consecutive odds.

// Example 2:
// Input: arr = [1,2,34,3,4,5,7,23,12]
// Output: true
// Explanation: [5,7,23] are three consecutive odds.

function threeConsecutiveOdds(arr: number[]): boolean {
  let count = 0;

  for (const num of arr) {
    if (num % 2 === 0) {
      count = 0;
    } else {
      count++;
    }

    if (count === 3) return true;
  }

  return false;
}
