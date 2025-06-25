// https://leetcode.com/problems/kth-smallest-product-of-two-sorted-arrays
// Given two sorted 0-indexed integer arrays nums1 and nums2 as well as an integer k, return the kth (1-based) smallest product of nums1[i] * nums2[j] where 0 <= i < nums1.length and 0 <= j < nums2.length.

// Example 1:
// Input: nums1 = [2,5], nums2 = [3,4], k = 2
// Output: 8
// Explanation: The 2 smallest products are:
// - nums1[0] * nums2[0] = 2 * 3 = 6
// - nums1[0] * nums2[1] = 2 * 4 = 8
// The 2nd smallest product is 8.

// Example 2:
// Input: nums1 = [-4,-2,0,3], nums2 = [2,4], k = 6
// Output: 0
// Explanation: The 6 smallest products are:
// - nums1[0] * nums2[1] = (-4) * 4 = -16
// - nums1[0] * nums2[0] = (-4) * 2 = -8
// - nums1[1] * nums2[1] = (-2) * 4 = -8
// - nums1[1] * nums2[0] = (-2) * 2 = -4
// - nums1[2] * nums2[0] = 0 * 2 = 0
// - nums1[2] * nums2[1] = 0 * 4 = 0
// The 6th smallest product is 0.

// Example 3:
// Input: nums1 = [-2,-1,0,1,2], nums2 = [-3,-1,2,4,5], k = 3
// Output: -6
// Explanation: The 3 smallest products are:
// - nums1[0] * nums2[4] = (-2) * 5 = -10
// - nums1[0] * nums2[3] = (-2) * 4 = -8
// - nums1[4] * nums2[0] = 2 * (-3) = -6
// The 3rd smallest product is -6.

// https://leetcode.com/problems/kth-smallest-product-of-two-sorted-arrays/solutions/4257169/binary-search-time-o-nlog-r-log-m-space-o-1/?envType=daily-question&envId=2025-06-25
// binary search
function kthSmallestProduct(
  nums1: number[],
  nums2: number[],
  k: number,
): number {
  let min = -1e10;
  let max = 1e10;

  // find the index of the first element that is greater than or equal to the target value
  // If the target value is not found, it returns the index of the first element that is greater than the target value.
  const binarySearch = (
    arr: number[],
    target: number,
    min = 0,
    max = arr.length,
  ): number => {
    while (min < max) {
      const mid = min + Math.floor((max - min) / 2);
      if (target > arr[mid]) {
        min = mid + 1;
      } else {
        max = mid;
      }
    }
    return min;
  };

  // It counts the number of products of elements from nums1 and nums2 that are less than or equal to x.
  const check = (
    nums1: number[],
    nums2: number[],
    negs: number,
    zeroes: number,
    x: number,
  ): number => {
    const N = nums1.length;
    const M = nums2.length;

    // process negatives in nums1 and counting the number of products that are less than x.
    let i = 0;
    let count = M * negs;
    while (i < negs) {
      count -= binarySearch(nums2, Math.ceil(x / nums1[i++]));
    }

    // process zeroes
    // Adding the number of zero values in nums1 if x is non-negative.
    count += x >= 0 ? M * zeroes : 0;
    i += zeroes;

    // process positives  in nums1 and counting the number of products that are less than or equal to x.
    while (i < N) {
      count += binarySearch(nums2, Math.floor(x / nums1[i++]) + 1);
    }

    return count;
  };

  // count the number of negative values negs and zeroes in nums1.
  const negs = binarySearch(nums1, 0);
  const zeroes = binarySearch(nums1, 1, negs) - negs;

  // Perform binary search on the range of possible products
  while (min < max) {
    // calculates the mid value mid and uses the check function to count the number of products less than or equal to mid.
    const mid = min + Math.floor((max - min) / 2);
    if (k > check(nums1, nums2, negs, zeroes, mid)) {
      // If the count is less than k, it updates the minimum value min to mid + 1.
      min = mid + 1;
    } else {
      max = mid;
    }
  }

  return min;
}
