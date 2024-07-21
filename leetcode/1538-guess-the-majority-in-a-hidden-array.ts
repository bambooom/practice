// https://leetcode.com/problems/guess-the-majority-in-a-hidden-array
// We have an integer array nums, where all the integers in nums are 0 or 1. You will not be given direct access to the array, instead, you will have an API ArrayReader which have the following functions:

import { count } from 'console';
import { read } from 'fs';

// int query(int a, int b, int c, int d): where 0 <= a < b < c < d < ArrayReader.length(). The function returns the distribution of the value of the 4 elements and returns:
// 4 : if the values of the 4 elements are the same (0 or 1).
// 2 : if three elements have a value equal to 0 and one element has value equal to 1 or vice versa.
// 0 : if two element have a value equal to 0 and two elements have a value equal to 1.
// int length(): Returns the size of the array.
// You are allowed to call query() 2 * n times at most where n is equal to ArrayReader.length().

// Return any index of the most frequent value in nums, in case of tie, return -1.

// Example 1:
// Input: nums = [0,0,1,0,1,1,1,1]
// Output: 5
// Explanation: The following calls to the API
// reader.length() // returns 8 because there are 8 elements in the hidden array.
// reader.query(0,1,2,3) // returns 2 this is a query that compares the elements nums[0], nums[1], nums[2], nums[3]
// // Three elements have a value equal to 0 and one element has value equal to 1 or viceversa.
// reader.query(4,5,6,7) // returns 4 because nums[4], nums[5], nums[6], nums[7] have the same value.
// we can infer that the most frequent value is found in the last 4 elements.
// Index 2, 4, 6, 7 is also a correct answer.

// Example 2:
// Input: nums = [0,0,1,1,0]
// Output: 0

// Example 3:
// Input: nums = [1,0,1,0,1,0,1,0]
// Output: -1

/**
 * // This is the ArrayReader's API interface.
 * // You should not implement it, or speculate about its implementation
 * class ArrayReader {
 *     // Compares 4 different elements in the array
 *     // return 4 if the values of the 4 elements are the same (0 or 1).
 *     // return 2 if three elements have a value equal to 0 and one element has value equal to 1 or vice versa.
 *     // return 0 if two element have a value equal to 0 and two elements have a value equal to 1.
 *     query(a: number, b: number, c: number, d: number): number { };
 *
 *     // Returns the length of the array
 *     length(): number { };
 * };
 */

interface ArrayReader {
  query(a: number, b: number, c: number, d: number): number; // 4, 2, 0
  length(): number;
}

// https://leetcode.com/problems/guess-the-majority-in-a-hidden-array/solutions/3469450/js-with-comments/?envType=study-plan-v2&envId=premium-algo-100
// if query 0123 = query 123i -> nums[0] === nums[i]
// this way we can check all values with index 4+
function guessMajority(reader: ArrayReader): number {
  const q0123 = reader.query(0, 1, 2, 3);

  const n = reader.length();
  let counter = 1; // count of elements = nums[0]
  let diffIndex = 0;

  for (let i = 4; i < n; i++) {
    const q123i = reader.query(1, 2, 3, i);
    if (q0123 === q123i) {
      counter++;
    } else {
      diffIndex = i;
    }
  }

  /*
    compare q1234 with other queries to check elements 1-3 in nums
    indeces=0,2,3,4 - to check if nums[1] === nums[0]
    indeces=0,1,3,4 - to check if nums[2] === nums[0]
    indeces=0,1,2,4 - to check if nums[3] === nums[0]
  */
  const q1234 = reader.query(1, 2, 3, 4);
  const check = (indexes: [number, number, number, number], index: number) => {
    if (q1234 === reader.query(...indexes)) {
      // check index 1
      counter++;
    } else {
      diffIndex = index;
    }
  };

  check([0, 2, 3, 4], 1);
  check([0, 1, 3, 4], 2);
  check([0, 1, 2, 4], 3);

  const diffElemCount = n - counter;

  if (counter > diffElemCount) {
    return 0;
  } else if (counter === diffElemCount) {
    return -1;
  }
  return diffIndex;
}
