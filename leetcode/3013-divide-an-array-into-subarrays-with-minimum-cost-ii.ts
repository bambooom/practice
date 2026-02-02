// https://leetcode.com/problems/divide-an-array-into-subarrays-with-minimum-cost-ii/
// You are given a 0-indexed array of integers nums of length n, and two positive integers k and dist.
// The cost of an array is the value of its first element. For example, the cost of [1,2,3] is 1 while the cost of [3,4,1] is 3.
// You need to divide nums into k disjoint contiguous subarrays, such that the difference between the starting index of the second subarray and the starting index of the kth subarray should be less than or equal to dist. In other words, if you divide nums into the subarrays nums[0..(i1 - 1)], nums[i1..(i2 - 1)], ..., nums[ik-1..(n - 1)], then ik-1 - i1 <= dist.
// Return the minimum possible sum of the cost of these subarrays.

// Example 1:
// Input: nums = [1,3,2,6,4,2], k = 3, dist = 3
// Output: 5
// Explanation: The best possible way to divide nums into 3 subarrays is: [1,3], [2,6,4], and [2]. This choice is valid because ik-1 - i1 is 5 - 2 = 3 which is equal to dist. The total cost is nums[0] + nums[2] + nums[5] which is 1 + 2 + 2 = 5.
// It can be shown that there is no possible way to divide nums into 3 subarrays at a cost lower than 5.

// Example 2:
// Input: nums = [10,1,2,2,2,1], k = 4, dist = 3
// Output: 15
// Explanation: The best possible way to divide nums into 4 subarrays is: [10], [1], [2], and [2,2,1]. This choice is valid because ik-1 - i1 is 3 - 1 = 2 which is less than dist. The total cost is nums[0] + nums[1] + nums[2] + nums[3] which is 10 + 1 + 2 + 2 = 15.
// The division [10], [1], [2,2,2], and [1] is not valid, because the difference between ik-1 and i1 is 5 - 1 = 4, which is greater than dist.
// It can be shown that there is no possible way to divide nums into 4 subarrays at a cost lower than 15.

// Example 3:
// Input: nums = [10,8,18,9], k = 3, dist = 1
// Output: 36
// Explanation: The best possible way to divide nums into 4 subarrays is: [10], [8], and [18,9]. This choice is valid because ik-1 - i1 is 2 - 1 = 1 which is equal to dist.The total cost is nums[0] + nums[1] + nums[2] which is 10 + 8 + 18 = 36.
// The division [10], [8,18], and [9] is not valid, because the difference between ik-1 and i1 is 3 - 1 = 2, which is greater than dist.
// It can be shown that there is no possible way to divide nums into 3 subarrays at a cost lower than 36.

// Constraints:
// 3 <= n <= 10^5
// 1 <= nums[i] <= 10^9
// 3 <= k <= n
// k - 2 <= dist <= n - 2

import {
  MaxPriorityQueue,
  MinPriorityQueue,
} from '@datastructures-js/priority-queue';
// https://leetcode.com/problems/divide-an-array-into-subarrays-with-minimum-cost-ii/solutions/7544348/with-builed-in-maxpriorityqueue-by-erzhi-z41b/?envType=daily-question&envId=2026-02-02

type Used = [number, number]; // [value, index]

function minimumCostII(nums: number[], k: number, dist: number): number {
  const n = nums.length;
  let sum = 0;
  let ans = Number.MAX_SAFE_INTEGER;
  const used = new Set<number>();

  // max heap by value
  const heapUsed = new MaxPriorityQueue<Used>((item: Used) => item[0]);
  // min heap by value
  const heapUnused = new MinPriorityQueue<Used>((item: Used) => item[0]);

  for (let right = 1; right < n; right++) {
    const left = right - dist - 1;

    // move left border
    if (left > 0 && used.has(left)) {
      used.delete(left);
      sum -= nums[left];

      // Remove elements from heapUnused that are not within the left index range
      while (!heapUnused.isEmpty() && heapUnused.front()[1] < left) {
        heapUnused.dequeue();
      }

      // Add the element back to heapUsed if it is not already in the used set
      if (!heapUnused.isEmpty()) {
        const [v, i] = heapUnused.dequeue()!;
        heapUsed.enqueue([v, i]);
        used.add(i);
        sum += v;
      }
    }

    // move right border
    if (used.size < k - 1) {
      heapUsed.enqueue([nums[right], right]);
      used.add(right);
      sum += nums[right];
    } else {
      // Remove elements from heapUsed that are not in the used set
      while (!heapUsed.isEmpty() && !used.has(heapUsed.front()[1])) {
        heapUsed.dequeue();
      }

      // If the value of the current element is smaller than the smallest value in heapUsed,
      // replace the smallest value with the current element and update the sum
      if (!heapUsed.isEmpty() && nums[right] < heapUsed.front()[0]) {
        const [v, i] = heapUsed.dequeue();

        used.delete(i);
        heapUnused.enqueue([v, i]);

        heapUsed.enqueue([nums[right], right]);
        used.add(right);

        sum += nums[right] - v;
      } else {
        // Add the current element
        heapUnused.enqueue([nums[right], right]);
      }
    }

    if (left >= 0) {
      ans = Math.min(ans, sum);
    }
  }

  return nums[0] + ans;
}
