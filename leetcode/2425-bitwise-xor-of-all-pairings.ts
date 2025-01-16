// https://leetcode.com/problems/bitwise-xor-of-all-pairings
// You are given two 0-indexed arrays, nums1 and nums2, consisting of non-negative integers. There exists another array, nums3, which contains the bitwise XOR of all pairings of integers between nums1 and nums2 (every integer in nums1 is paired with every integer in nums2 exactly once).
// Return the bitwise XOR of all integers in nums3.

// Example 1:
// Input: nums1 = [2,1,3], nums2 = [10,2,5,0]
// Output: 13
// Explanation:
// A possible nums3 array is [8,0,7,2,11,3,4,1,9,1,6,3].
// The bitwise XOR of all these numbers is 13, so we return 13.

// Example 2:
// Input: nums1 = [1,2], nums2 = [3,4]
// Output: 0
// Explanation:
// All possible pairs of bitwise XORs are nums1[0] ^ nums2[0], nums1[0] ^ nums2[1], nums1[1] ^ nums2[0],
// and nums1[1] ^ nums2[1].
// Thus, one possible nums3 array is [2,5,1,6].
// 2 ^ 5 ^ 1 ^ 6 = 0, so we return 0.

// https://leetcode.com/problems/bitwise-xor-of-all-pairings/solutions/6286331/two-lines-solution/
function xorAllNums(nums1: number[], nums2: number[]): number {
  // calculate the XOR of all elements b if the length of a is odd
  // if the length of a is even, return 0
  const xor = (a: number[], b: number[]) =>
    a.length % 2 ? b.reduce((x, y) => x ^ y) : 0;
  return xor(nums1, nums2) ^ xor(nums2, nums1);
}

// https://leetcode.com/problems/bitwise-xor-of-all-pairings/solutions/6286412/2425-bitwise-xor-of-all-pairings-in-depth-explanation/
// XOR
// A ^ A = 0 (XOR with self gives 0)
// A ^ 0 = A (XOR with 0 gives the number itself)
// A ^ B ^ A = B (XOR is reversible)
// XOR is associative: (A ^ B) ^ C = A ^ (B ^ C)
// XOR is commutative: A ^ B = B ^ A
