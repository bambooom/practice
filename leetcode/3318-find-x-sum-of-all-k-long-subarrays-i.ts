// https://leetcode.com/problems/find-x-sum-of-all-k-long-subarrays-is
// You are given an array nums of n integers and two integers k and x.
// The x-sum of an array is calculated by the following procedure:
// Count the occurrences of all elements in the array.
// Keep only the occurrences of the top x most frequent elements. If two elements have the same number of occurrences, the element with the bigger value is considered more frequent.
// Calculate the sum of the resulting array.
// Note that if an array has less than x distinct elements, its x-sum is the sum of the array.
// Return an integer array answer of length n - k + 1 where answer[i] is the x-sum of the subarray nums[i..i + k - 1].

// Example 1:
// Input: nums = [1,1,2,2,3,4,2,3], k = 6, x = 2
// Output: [6,10,12]
// Explanation:
// For subarray [1, 1, 2, 2, 3, 4], only elements 1 and 2 will be kept in the resulting array. Hence, answer[0] = 1 + 1 + 2 + 2.
// For subarray [1, 2, 2, 3, 4, 2], only elements 2 and 4 will be kept in the resulting array. Hence, answer[1] = 2 + 2 + 2 + 4. Note that 4 is kept in the array since it is bigger than 3 and 1 which occur the same number of times.
// For subarray [2, 2, 3, 4, 2, 3], only elements 2 and 3 are kept in the resulting array. Hence, answer[2] = 2 + 2 + 2 + 3 + 3.

// Example 2:
// Input: nums = [3,8,7,8,7,5], k = 2, x = 2
// Output: [11,15,15,15,12]
// Explanation:
// Since k == x, answer[i] is equal to the sum of the subarray nums[i..i + k - 1].

// Constraints:
// 1 <= n == nums.length <= 50
// 1 <= nums[i] <= 50
// 1 <= x <= k <= nums.length

// sliding window
function findXSum(nums: number[], k: number, x: number): number[] {
  const getXSum = (map: Map<number, number>) => {
    const filtered = [...map.entries()]
      .sort((a, b) => {
        if (a[1] !== b[1]) {
          return b[1] - a[1];
        } else {
          return b[0] - a[0];
        }
      })
      .slice(0, x);

    return filtered.reduce((acc, cur) => acc + cur[0] * cur[1], 0);
  };

  const n = nums.length;
  const res: number[] = [];
  const map: Map<number, number> = new Map();

  for (let i = 0; i < k; i++) {
    const num = nums[i];
    map.set(num, (map.get(num) || 0) + 1);
  }
  res.push(getXSum(map));

  for (let i = 0, y = k; i < n - k; i++, y++) {
    const toRemove = nums[i];
    const toAdd = nums[y];
    map.set(toRemove, map.get(toRemove)! - 1);
    map.set(toAdd, (map.get(toAdd) || 0) + 1);
    res.push(getXSum(map));
  }

  return res;
}
