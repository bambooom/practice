// https://leetcode.com/problems/intersection-of-two-arrays-ii
// Given two integer arrays nums1 and nums2, return an array of their intersection. Each element in the result must appear as many times as it shows in both arrays and you may return the result in any order.

/**
 * hashmap methods
 * Time Complexity: O(n+m), where nn and mm are the lengths of the arrays.
 * We iterate through the first, and then through the second array; insert and lookup operations in the hash map take a constant time.
 * Space Complexity: O(min(n,m)). We use hash map to store numbers (and their counts) from the smaller array.
 */
export function intersect(nums1: number[], nums2: number[]): number[] {
  const hash = new Map();
  for (const n of nums1) {
    if (hash.has(n)) {
      hash.set(n, hash.get(n) + 1);
    } else {
      hash.set(n, 1);
    }
  }
  const res = [];
  for (const n of nums2) {
    if (hash.has(n) && hash.get(n) > 0) {
      res.push(n);
      hash.set(n, hash.get(n) - 1);
    }
  }

  return res;
}

/**
 * if input is sorted, can use 3 pointers to compare and get
 *
 * - 1. Sort nums1 and nums2.
 * - 2. Initialize i, j and k with zero.
 * - 3. Move indices i along nums1, and j through nums2:
 *    - Increment i if nums1[i] is smaller.
 *    - Increment j if nums2[j] is smaller.
 *    - If numbers are the same, copy the number into nums1[k], and increment i, j and k.
 * - 4. Return first k elements of nums1.
 *
 *
 * Time Complexity: O(nlogn+mlogm),
 * Space Complexity: from O(logn+logm) to O(n+m), depending on the implementation of the sorting algorithm.
 * For the complexity analysis purposes, we ignore the memory required by inputs and outputs.
 */

export function intersectSorted(nums1: number[], nums2: number[]): number[] {
  let i = 0;
  let j = 0;
  let k = 0;
  while (i < nums1.length || j < nums2.length) {
    if (nums1[i] === nums2[j]) {
      nums1[k] = nums1[i];
      i++;
      j++;
      k++;
    } else if (nums1[i] < nums2[j]) {
      i++;
    } else {
      j++;
    }
  }
  return nums1.slice(0, k);
}

// console.log(intersectSorted([1, 2, 2, 4, 5, 8, 13], [3, 4, 5, 13, 16, 20])); // [4,5,13]
