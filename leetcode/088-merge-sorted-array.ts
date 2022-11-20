/**
 *
 * Input: nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3
 * Output: [1,2,2,3,5,6]
 * Explanation: The arrays we are merging are [1,2,3] and [2,5,6].
 * The result of the merge is [1,2,2,3,5,6] with the underlined elements coming from nums1.
 */

export function merge(
  nums1: number[],
  m: number,
  nums2: number[],
  n: number,
): void {
  let insertPos = m + n - 1; // last index of nums1
  m -= 1;
  n -= 1;
  while (n >= 0) {
    if (nums1[m] > nums2[n]) {
      nums1[insertPos] = nums1[m]; // insert the larger one at the last
      m -= 1;
    } else {
      nums1[insertPos] = nums2[n];
      n -= 1;
    }
    insertPos -= 1;
  }
}
