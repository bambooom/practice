// https://leetcode.com/problems/sum-of-digits-of-string-after-convert

// You are given a string s consisting of lowercase English letters, and an integer k.

// First, convert s into an integer by replacing each letter with its position in the alphabet (i.e., replace 'a' with 1, 'b' with 2, ..., 'z' with 26). Then, transform the integer by replacing it with the sum of its digits. Repeat the transform operation k times in total.

// For example, if s = "zbax" and k = 2, then the resulting integer would be 8 by the following operations:

// Convert: "zbax" ➝ "(26)(2)(1)(24)" ➝ "262124" ➝ 262124
// Transform #1: 262124 ➝ 2 + 6 + 2 + 1 + 2 + 4 ➝ 17
// Transform #2: 17 ➝ 1 + 7 ➝ 8
// Return the resulting integer after performing the operations described above.

// Example 1:

// Input: s = "iiii", k = 1
// Output: 36
// Explanation: The operations are as follows:
// - Convert: "iiii" ➝ "(9)(9)(9)(9)" ➝ "9999" ➝ 9999
// - Transform #1: 9999 ➝ 9 + 9 + 9 + 9 ➝ 36
// Thus the resulting integer is 36.
// Example 2:

// Input: s = "leetcode", k = 2
// Output: 6
// Explanation: The operations are as follows:
// - Convert: "leetcode" ➝ "(12)(5)(5)(20)(3)(15)(4)(5)" ➝ "12552031545" ➝ 12552031545
// - Transform #1: 12552031545 ➝ 1 + 2 + 5 + 5 + 2 + 0 + 3 + 1 + 5 + 4 + 5 ➝ 33
// - Transform #2: 33 ➝ 3 + 3 ➝ 6
// Thus the resulting integer is 6.
// Example 3:

// Input: s = "zbax", k = 2
// Output: 8

// my solytion
function getLucky(s: string, k: number): number {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  let res = '';
  for (const c of s) {
    const i = alphabet.indexOf(c) + 1;
    res += i + '';
  }
  let sum = res.split('').reduce((a, b) => Number(a) + Number(b), 0);

  for (let i = 0; i < k - 1; i++) {
    sum = (sum + '').split('').reduce((a, b) => Number(a) + Number(b), 0);
  }
  return sum;
}

// https://leetcode.com/problems/sum-of-digits-of-string-after-convert/solutions/2643545/typescript-javascript-100-faster-100-memory-less/
function getLucky2(s: string, k: number): number {
  const base = 'a'.charCodeAt(0);

  let sum = 0;
  for (let i = 0; i < s.length; i++) {
    const val = s.charCodeAt(i) - base + 1;
    sum += Math.floor(val / 10) + (val % 10);
  }

  for (let i = 1; i < k; i++) {
    const numStr = sum.toString();
    sum = 0;
    for (let j = 0; j < numStr.length; j++) {
      sum += Number(numStr[j]);
    }
  }

  return sum;
}
