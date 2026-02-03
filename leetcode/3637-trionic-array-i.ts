// https://leetcode.com/problems/trionic-array-i/
// You are given an integer array nums of length n.
// An array is trionic if there exist indices 0 < p < q < n − 1 such that:
// nums[0...p] is strictly increasing,
// nums[p...q] is strictly decreasing,
// nums[q...n − 1] is strictly increasing.
// Return true if nums is trionic, otherwise return false.

// Example 1:
// Input: nums = [1,3,5,4,2,6]
// Output: true
// Explanation:
// Pick p = 2, q = 4:
// nums[0...2] = [1, 3, 5] is strictly increasing (1 < 3 < 5).
// nums[2...4] = [5, 4, 2] is strictly decreasing (5 > 4 > 2).
// nums[4...5] = [2, 6] is strictly increasing (2 < 6).

// Example 2:
// Input: nums = [2,1,3]
// Output: false
// Explanation:
// There is no way to pick p and q to form the required three segments.

// Constraints:
// 3 <= n <= 100
// -1000 <= nums[i] <= 1000

// https://leetcode.com/problems/trionic-array-i/solutions/7546983/one-pass-state-transition-0ms-100-beats-1dxdf/?envType=daily-question&envId=2026-02-03
// We use a Three-Phase Pointer (or State Machine) approach to ensure each segment is strictly monotonic:
// Phase 1 (Up): Move the pointer as long as elements are strictly increasing. We must ensure it actually increases at least once and doesn't reach the end immediately.
// Phase 2 (Down): Move the pointer from the first peak as long as elements are strictly decreasing. We must ensure it decreases at least once and doesn't end the array there.
// Phase 3 (Up Again): Move the pointer from the valley as long as elements are strictly increasing.
// Verification: If the pointer reaches the very last index after these three specific phases, the array is Trionic.

function isTrionic(nums: number[]): boolean {
  const n = nums.length;
  let i = 0;

  while (i + 1 < n && nums[i] < nums[i + 1]) {
    i++;
  }
  if (i === 0 || i === n - 1) {
    return false;
  }

  let p = i;
  while (i + 1 < n && nums[i] > nums[i + 1]) {
    i++;
  }
  if (i === p || i === n - 1) {
    return false;
  }

  while (i + 1 < n && nums[i] < nums[i + 1]) {
    i++;
  }

  return i === n - 1;
}
