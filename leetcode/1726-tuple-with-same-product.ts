// https://leetcode.com/problems/tuple-with-same-product
// Given an array nums of distinct positive integers, return the number of tuples (a, b, c, d) such that a * b = c * d where a, b, c, and d are elements of nums, and a != b != c != d.

// Example 1:
// Input: nums = [2,3,4,6]
// Output: 8
// Explanation: There are 8 valid tuples:
// (2,6,3,4) , (2,6,4,3) , (6,2,3,4) , (6,2,4,3)
// (3,4,2,6) , (4,3,2,6) , (3,4,6,2) , (4,3,6,2)

// Example 2:
// Input: nums = [1,2,4,5,10]
// Output: 16
// Explanation: There are 16 valid tuples:
// (1,10,2,5) , (1,10,5,2) , (10,1,2,5) , (10,1,5,2)
// (2,5,1,10) , (2,5,10,1) , (5,2,1,10) , (5,2,10,1)
// (2,10,4,5) , (2,10,5,4) , (10,2,4,5) , (10,2,5,4)
// (4,5,2,10) , (4,5,10,2) , (5,4,2,10) , (5,4,10,2)

// https://leetcode.com/problems/tuple-with-same-product/solutions/6384520/fast-clear-solution-o-n-2-beats-99-runtime-memory-all-languages-explained/
function tupleSameProduct(nums: number[]): number {
  const uniqueNums = Array.from(new Set(nums));
  const n = uniqueNums.length;

  let count = 0;
  const counter = new Map<number, number>();

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const multi = uniqueNums[i] * uniqueNums[j];
      if (counter.has(multi)) {
        count += counter.get(multi)!;
        counter.set(multi, counter.get(multi)! + 1);
      } else {
        counter.set(multi, 1);
      }
    }
  }

  return count * 8;
}
