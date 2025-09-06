// https://leetcode.com/problems/minimum-operations-to-make-array-elements-zero/
// You are given a 2D array queries, where queries[i] is of the form [l, r]. Each queries[i] defines an array of integers nums consisting of elements ranging from l to r, both inclusive.
// In one operation, you can:
// Select two integers a and b from the array.
// Replace them with floor(a / 4) and floor(b / 4).
// Your task is to determine the minimum number of operations required to reduce all elements of the array to zero for each query. Return the sum of the results for all queries.

// Example 1:
// Input: queries = [[1,2],[2,4]]
// Output: 3
// Explanation:
// For queries[0]:
// The initial array is nums = [1, 2].
// In the first operation, select nums[0] and nums[1]. The array becomes [0, 0].
// The minimum number of operations required is 1.
// For queries[1]:
// The initial array is nums = [2, 3, 4].
// In the first operation, select nums[0] and nums[2]. The array becomes [0, 3, 1].
// In the second operation, select nums[1] and nums[2]. The array becomes [0, 0, 0].
// The minimum number of operations required is 2.
// The output is 1 + 2 = 3.

// Example 2:
// Input: queries = [[2,6]]
// Output: 4
// Explanation:
// For queries[0]:
// The initial array is nums = [2, 3, 4, 5, 6].
// In the first operation, select nums[0] and nums[3]. The array becomes [0, 3, 4, 1, 6].
// In the second operation, select nums[2] and nums[4]. The array becomes [0, 3, 1, 1, 1].
// In the third operation, select nums[1] and nums[2]. The array becomes [0, 0, 0, 1, 1].
// In the fourth operation, select nums[3] and nums[4]. The array becomes [0, 0, 0, 0, 0].
// The minimum number of operations required is 4.
// The output is 4.

// Constraints:
// 1 <= queries.length <= 10^5
// queries[i].length == 2
// queries[i] == [l, r]
// 1 <= l < r <= 10^9

// https://leetcode.com/problems/minimum-operations-to-make-array-elements-zero/solutions/6568597/group-in-pow-of-4s/?envType=daily-question&envId=2025-09-06
// To reduce a number n to 0 by repeated division by say x we need floor(logₓn) + 1 operations. So we can group numbers based on the no. of operations they need.
// All numbers in [1, 3] (i.e., from 4⁰ to 4¹ - 1) require 1 division.
// All numbers in [4, 15] (i.e., from 4¹ to 4² - 1) require 2 divisions.
// All numbers in [16, 63] (i.e., from 4² to 4³ - 1) require 3 divisions.
// and so on
// Approach:
// Now 4¹⁶ is greater than 1e9 so we need to atmost 16 intervals which is sufficient to cover all the numbers given in the range [l, r] of each query.

function minOperations(queries: number[][]): number {
  let ans = 0;

  for (const [start, end] of queries) {
    let ops = 0;
    let prev = 1; //. set to 4^(d - 1) start of the interval

    // d represents the number of divisions required for numbers in a particular range.
    for (let d = 1; d < 21; d++) {
      const cur = prev * 4; // 4^d, so the interval is [prev, cur - 1]
      const l = Math.max(start, prev);
      const r = Math.min(end, cur - 1);
      if (r >= l) {
        ops += (r - l + 1) * d;
        // we check overlap of numbers with each interval and add to operations the no. of divisions required i.e., (length of interval) * d.
      }
      prev = cur;
    }
    ans += Math.floor((ops + 1) / 2); // since we can choose 2 numbers at a time we would need ceil(total operations / 2).
  }

  return ans;
}

// Editorial
function minOperations2(queries: number[][]): number {
  // Calculates the total number of operations required to reduce all numbers from 1 to `num` to zero.
  function countReductionSteps(num: number): bigint {
    // Initialize the count of operations
    let cnt = 0n;
    // Initialize the current group index (starts at 1)
    let i = 1;
    // Initialize the base of the current group (starts at 1)
    let base = 1;

    // Continue grouping numbers until we've covered the entire range
    while (base <= num) {
      // Calculate the end of the current group (minimum of twice the base minus one, or the input number)
      const end = Math.min(base * 2 - 1, num);

      // Calculate the number of operations required for the current group
      // This is the number of pairs in the group (i + 1) / 2, multiplied by the size of the group (end - base + 1)
      cnt += BigInt(Math.floor((i + 1) / 2)) * BigInt(end - base + 1);

      // Move on to the next group
      i++;
      base *= 2;
    }
    return cnt;
  }

  let res = 0n;
  for (const q of queries) {
    const count1 = countReductionSteps(q[1]);
    const count2 = countReductionSteps(q[0] - 1);
    res += (count1 - count2 + 1n) / 2n;
  }
  return Number(res);
}
