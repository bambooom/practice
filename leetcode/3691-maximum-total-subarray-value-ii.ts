// https://leetcode.com/problems/maximum-total-subarray-value-ii/
// You are given an integer array nums of length n and an integer k.
// You must select exactly k distinct non-empty subarrays nums[l..r] of nums. Subarrays may overlap, but the exact same subarray (same l and r) cannot be chosen more than once.
// The value of a subarray nums[l..r] is defined as: max(nums[l..r]) - min(nums[l..r]).
// The total value is the sum of the values of all chosen subarrays.
// Return the maximum possible total value you can achieve.

import { PriorityQueue } from "@datastructures-js/priority-queue";

// Example 1:
// Input: nums = [1,3,2], k = 2
// Output: 4
// Explanation:
// One optimal approach is:
// Choose nums[0..1] = [1, 3]. The maximum is 3 and the minimum is 1, giving a value of 3 - 1 = 2.
// Choose nums[0..2] = [1, 3, 2]. The maximum is still 3 and the minimum is still 1, so the value is also 3 - 1 = 2.
// Adding these gives 2 + 2 = 4.

// Example 2:
// Input: nums = [4,2,5,1], k = 3
// Output: 12
// Explanation:
// One optimal approach is:
// Choose nums[0..3] = [4, 2, 5, 1]. The maximum is 5 and the minimum is 1, giving a value of 5 - 1 = 4.
// Choose nums[1..3] = [2, 5, 1]. The maximum is 5 and the minimum is 1, so the value is also 4.
// Choose nums[2..3] = [5, 1]. The maximum is 5 and the minimum is 1, so the value is again 4.
// Adding these gives 4 + 4 + 4 = 12.

// Constraints:
// 1 <= n == nums.length <= 5 * 10​​​​​​​^4
// 0 <= nums[i] <= 10^9
// 1 <= k <= min(10^5, n * (n + 1) / 2)

// https://leetcode.com/problems/maximum-total-subarray-value-ii/solutions/8324860/draft-by-la_castille-f93m/?envType=daily-question&envId=2026-06-10
function maxTotalValue(nums: number[], k: number): number {
    
    // The sparseTable function constructs a sparse table data structure for the input array nums, which allows for efficient range queries to find the maximum and minimum values in any subarray. The function initializes two 2D arrays, min and max, to store the minimum and maximum values for different intervals of the input array. It then fills these arrays using a bottom-up approach, where each level of the sparse table corresponds to intervals of length 2^i. Finally, it returns an object with a query method that can be used to retrieve the maximum and minimum values for any given range [left, right] in constant time.
    const sparseTable = (nums: number[]) => {
      const n = nums.length;
      const bitW = 32 - Math.clz32(n); // Returns the number of leading zero bits in the 32-bit binary representation of a number
      const min = Array.from({ length: bitW }, () => Array(n));
      const max = Array.from({ length: bitW }, () => Array(n));

      nums.forEach((cur, i) => {
        min[0][i] = max[0][i] = cur;
      });

      for (let i = 1; i < bitW; i++) {
        // The outer loop iterates through the levels of the sparse table, where i represents the power of 2 for the interval length (2^i).
        for (let j = 0; j + (1 << i) <= n; j++) {
          // The inner loop iterates through the starting indices of the intervals for the current level i. It calculates the minimum and maximum values for the interval starting at index j and having a length of 2^i by combining the results from the previous level (i - 1).
          // The condition j + (1 << i) <= n ensures that we do not go out of bounds when calculating the intervals for the current level. It checks that the starting index j plus the length of the interval (2^i) does not exceed the length of the input array n.
          min[i][j] = Math.min(min[i - 1][j], min[i - 1][j + (1 << (i - 1))]);
          // This line calculates the minimum value for the interval starting at index j and having a length of 2^i by taking the minimum of the two overlapping intervals from the previous level (i - 1).
          max[i][j] = Math.max(max[i - 1][j], max[i - 1][j + (1 << (i - 1))]);
          // This line calculates the maximum value for the interval starting at index j and having a length of 2^i by taking the maximum of the two overlapping intervals from the previous level (i - 1).
        }
      }

      return {
        query: (left: number, right: number) => {
          const k = 31 - Math.clz32(right - left) // Returns the number of leading zero bits in the 32-bit binary representation of a number
          return Math.max(max[k][left], max[k][right - (1 << k)]) - Math.min(min[k][left], min[k][right - (1 << k)]);
          // This line calculates the maximum value for the interval [left, right] by taking the maximum of the two overlapping intervals from the sparse table. It also calculates the minimum value for the same interval and returns the difference between the maximum and minimum values, which represents the value of the subarray defined by [left, right].
        }
      }
    }

    const n = nums.length;
    const LUT = sparseTable(nums);
    const pq = new PriorityQueue<[a: number, b: number, c: number]>(([a], [b]) => b - a);
    nums.forEach((_, i) => pq.enqueue([LUT.query(i, n), i, n]));

    let res = 0;
    while (pq.front()[0] && k--) {
      const [value, left, right] = pq.dequeue();
      res += value;
      pq.enqueue([LUT.query(left, right - 1), left, right - 1]);
    }
    return res;
};
