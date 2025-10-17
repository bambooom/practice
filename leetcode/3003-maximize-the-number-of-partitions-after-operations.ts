// https://leetcode.com/problems/maximize-the-number-of-partitions-after-operations
// You are given a string s and an integer k.
// First, you are allowed to change at most one index in s to another lowercase English letter.
// After that, do the following partitioning operation until s is empty:
// - Choose the longest prefix of s containing at most k distinct characters.
// - Delete the prefix from s and increase the number of partitions by one. The remaining characters (if any) in s maintain their initial order.
// Return an integer denoting the maximum number of resulting partitions after the operations by optimally choosing at most one index to change.

// Example 1:
// Input: s = "accca", k = 2
// Output: 3
// Explanation:
// The optimal way is to change s[2] to something other than a and c, for example, b. then it becomes "acbca".
// Then we perform the operations:
// The longest prefix containing at most 2 distinct characters is "ac", we remove it and s becomes "bca".
// Now The longest prefix containing at most 2 distinct characters is "bc", so we remove it and s becomes "a".
// Finally, we remove "a" and s becomes empty, so the procedure ends.
// Doing the operations, the string is divided into 3 partitions, so the answer is 3.

// Example 2:
// Input: s = "aabaab", k = 3
// Output: 1
// Explanation:
// Initially s contains 2 distinct characters, so whichever character we change, it will contain at most 3 distinct characters, so the longest prefix with at most 3 distinct characters would always be all of it, therefore the answer is 1.

// Example 3:
// Input: s = "xxyz", k = 1
// Output: 4
// Explanation:
// The optimal way is to change s[0] or s[1] to something other than characters in s, for example, to change s[0] to w.
// Then s becomes "wxyz", which consists of 4 distinct characters, so as k is 1, it will divide into 4 partitions.

// Constraints:
// 1 <= s.length <= 10^4
// s consists only of lowercase English letters.
// 1 <= k <= 26

// https://leetcode.com/problems/maximize-the-number-of-partitions-after-operations/solutions/6296978/beats-100-on-runtime-and-memory-explained/?envType=daily-question&envId=2025-10-17
// Use a greedy approach with bitwise operations to track which characters have been used in each partition. As we traverse the string, we count distinct characters in the current partition and switch to a new partition when the limit k is exceeded. This is done with arrays to store the number of partitions possible at each point and bitwise sets to efficiently track the characters in each partition.
function maxPartitionsAfterOperations(s: string, k: number): number {
  // if k is great enough to contain all distinct characters, we can just return 1
  if (k === 26 || k > new Set([...s]).size) {
    return 1;
  }

  // If k is 1, we can iterate over the characters of the string and keep track of the current longest prefix with at most 1 distinct character.
  if (k === 1) {
    let mx = 0; // The maximum length of the current longest prefix with at most 1 distinct character.
    let cur = 0; // The current length of the prefix.
    let cnt = -1; // The current count of distinct characters in the prefix.
    let prev = ''; // The previous character in the prefix.
    for (let c of s) {
      // If the current character is the same as the previous character, increment the current length of the prefix.
      if (c === prev) {
        cur++;
      } else {
        // If the current character is different from the previous character, update the maximum length of the current longest prefix with at most 1 distinct character.
        mx = Math.max(mx, cur);
        cur = 1;
        prev = c;
        cnt++;
      }
      mx = Math.max(mx, cur);
      // Return the number of partitions by adding the minimum of the current longest prefix length and 3 to the current count.
      return cnt + Math.min(mx, 3);
    }
  }

  const n = s.length;
  // Create a binary representation of each character in the string.
  const sArr = Array.from(s).map((c) => 1 << (c.charCodeAt(0) - 97));

  const suff1: number[] = Array(n).fill(0); // Initialize an array to store the suffixes of the string.
  const suff2: number[] = Array(n).fill(0); // Initialize an array to store the suffixes of the string.
  const setMap: number[] = Array(n).fill(0); // Initialize an array to store the set of distinct characters in each suffix.
  const indexes: { [key: number]: number } = Object.fromEntries(
    Array.from({ length: 26 }).map((_, i) => [1 << i, n]),
  ); // Initialize a map to store the index of each character in the string.

  let set1 = 0, // The set of distinct characters in the suffixes.
    cnt1 = 0, // The count of distinct characters in the suffixes.
    par1 = 1, // The parent of the current suffix.
    ptr1 = n - 1; // The pointer to the current suffix.
  let set2 = 0, // The set of distinct characters in the suffixes.
    cnt2 = 0, // The count of distinct characters in the suffixes.
    par2 = 1, // The parent of the current suffix.
    ptr2 = n - 1; // The pointer to the current suffix.

  for (let i = n - 1; i >= 0; i--) {
    suff2[i] = par2; // Set the parent of the current suffix.
    setMap[i] = set1; // Set the set of distinct characters in the suffix.

    // If the current character is not in the set of distinct characters in the suffixes, add it to the set and increment the count.
    if (!(set2 & sArr[i])) {
      if (cnt2 === k - 1) {
        while (ptr2 > indexes[sArr[ptr2]]) ptr2 -= 1;
        par2 = suff1[ptr2] + 1;
        set2 ^= sArr[ptr2]; // Remove the previous character from the set of distinct characters in the suffixes.
        ptr2 -= 1;
        cnt2 -= 1;
      }
      set2 |= sArr[i]; // Add the current character to the set of distinct characters in the suffixes.
      cnt2 += 1;
    }

    if (!(set1 & sArr[i])) {
      if (cnt1 === k) {
        while (ptr1 > indexes[sArr[ptr1]]) ptr1 -= 1;
        par1 = suff1[ptr1] + 1;
        set1 ^= sArr[ptr1];
        ptr1 -= 1;
        cnt1 -= 1;
      }
      set1 |= sArr[i];
      cnt1 += 1;
    }

    suff1[i] = par1;
    indexes[sArr[i]] = i;
  }

  let res = suff1[0];
  let mode1 = false,
    mode2 = false;
  let set0 = 0,
    cnt0 = 0,
    par0 = 1,
    mask = (1 << 26) - 1;

  for (let i = 0; i < n; i++) {
    if (!(set0 & sArr[i])) {
      if (cnt0 === k - 1) {
        if (mode1) {
          res = Math.max(res, par0 + suff1[i]);
        }
        mode2 = true;
      } else if (cnt0 === k) {
        mode1 = mode2 = false;
        set0 = 0;
        cnt0 = 0;
        par0 += 1;
      }

      set0 |= sArr[i];
      cnt0 += 1;
    } else if (mode2) {
      if ((set0 | setMap[i]) < mask) {
        res = Math.max(res, par0 + suff2[i]);
      } else {
        res = Math.max(res, par0 + suff1[i]);
      }
      mode2 = false;
    } else if (!mode1) {
      mode1 = true;
    }
  }

  return res;
}
