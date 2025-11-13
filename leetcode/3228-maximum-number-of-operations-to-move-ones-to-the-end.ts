// https://leetcode.com/problems/maximum-number-of-operations-to-move-ones-to-the-end/
// You are given a binary string s.
// You can perform the following operation on the string any number of times:
// Choose any index i from the string where i + 1 < s.length such that s[i] == '1' and s[i + 1] == '0'.
// Move the character s[i] to the right until it reaches the end of the string or another '1'. For example, for s = "010010", if we choose i = 1, the resulting string will be s = "000110".
// Return the maximum number of operations that you can perform.

// Example 1:
// Input: s = "1001101"
// Output: 4
// Explanation:
// We can perform the following operations:
// Choose index i = 0. The resulting string is s = "0011101".
// Choose index i = 4. The resulting string is s = "0011011".
// Choose index i = 3. The resulting string is s = "0010111".
// Choose index i = 2. The resulting string is s = "0001111".

// Example 2:
// Input: s = "00111"
// Output: 0

// Constraints:
// 1 <= s.length <= 10^5
// s[i] is either '0' or '1'.

// https://leetcode.com/problems/maximum-number-of-operations-to-move-ones-to-the-end/solutions/7344834/solution-by-la_castille-vdqt/?envType=daily-question&envId=2025-11-13
// Prefix Sum | with Extra Space (concise)
function maxOperations(s: string): number {
  const prefix: number[] = [];
  for (const c of s) {
    // the sum of all the binary digits up to and including the ith digit in the string s
    prefix.push((prefix.at(-1) ?? 0) + +c);
  }

  // Initialize a Set to store the prefix sums that end with '0'
  const seen = new Set<number>();

  for (let i = 0; i < s.length; i++) {
    // If the character is '0', add the prefix sum at that index to the seen set
    if (s[i] === '0') {
      seen.add(prefix[i]);
    }
  }

  // Convert the seen set into an array and sum all the values to get the maximum number of operations
  return [...seen].reduce((a, c) => a + c, 0);
}

// counting with no extra space
function maxOperations2(s: string): number {
  let ones = 0,
    res = 0;
  for (let i = 0; i < s.length; i++) {
    if (s[i] === '1') ones++;
    else if (i > 0 && s[i - 1] === '1') res += ones;
  }
  return res;
}
