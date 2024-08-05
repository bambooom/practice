// https://leetcode.com/problems/kth-distinct-string-in-an-array
// A distinct string is a string that is present only once in an array.
// Given an array of strings arr, and an integer k, return the kth distinct string present in arr. If there are fewer than k distinct strings, return an empty string "".
// Note that the strings are considered in the order in which they appear in the array.

// Example 1:

// Input: arr = ["d","b","c","b","c","a"], k = 2
// Output: "a"
// Explanation:
// The only distinct strings in arr are "d" and "a".
// "d" appears 1st, so it is the 1st distinct string.
// "a" appears 2nd, so it is the 2nd distinct string.
// Since k == 2, "a" is returned.

// hash table
function kthDistinct(arr: string[], k: number): string {
  const hash: Record<string, number> = {};
  for (const s of arr) {
    hash[s] = (hash[s] ?? 0) + 1;
  }
  for (const key in hash) {
    if (hash[key] === 1) {
      k--;
      if (!k) {
        return key;
      }
    }
  }
  return '';
}
