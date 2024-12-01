// https://leetcode.com/problems/check-if-n-and-its-double-exist/

// Given an array arr of integers, check if there exist two indices i and j such that :
// i != j
// 0 <= i, j < arr.length
// arr[i] == 2 * arr[j]

// Example 1:
// Input: arr = [10,2,5,3]
// Output: true
// Explanation: For i = 0 and j = 2, arr[i] == 10 == 2 * 5 == 2 * arr[j]
// Example 2:
// Input: arr = [3,1,7,11]
// Output: false
// Explanation: There is no i and j that satisfy the conditions.

// wrong answer, [0, 0] should return true as there are 2 zeros with different indices
function checkIfExist_wrong(arr: number[]): boolean {
  const set = new Set(arr);

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== 0 && set.has(arr[i] * 2)) {
      return true;
    }
  }

  return false;
}

function checkIfExist(arr: number[]): boolean {
  const set = new Set();

  for (const num of arr) {
    if (set.has(num / 2) || set.has(num * 2)) {
      return true;
    } else {
      set.add(num);
    }
  }

  return false;
}
