// https://leetcode.com/problems/count-the-number-of-substrings-with-dominant-ones/
// You are given a binary string s.
// Return the number of substrings with dominant ones.
// A string has dominant ones if the number of ones in the string is greater than or equal to the square of the number of zeros in the string.

// Example 1:
// Input: s = "00011"
// Output: 5
// Explanation:
// The substrings with dominant ones are shown in the table below.
// i	j	s[i..j]	Number of Zeros	Number of Ones
// 3	3	1	0	1
// 4	4	1	0	1
// 2	3	01	1	1
// 3	4	11	0	2
// 2	4	011	1	2

// Example 2:
// Input: s = "101101"
// Output: 16
// Explanation:
// The substrings with non-dominant ones are shown in the table below.
// Since there are 21 substrings total and 5 of them have non-dominant ones, it follows that there are 16 substrings with dominant ones.
// i	j	s[i..j]	Number of Zeros	Number of Ones
// 1	1	0	1	0
// 4	4	0	1	0
// 1	4	0110	2	2
// 0	4	10110	2	3
// 1	5	01101	2	3

// Constraints:
// 1 <= s.length <= 4 * 10^4
// s consists only of characters '0' and '1'.

function numberOfSubstrings(s: string): number {
  const n = s.length;
  // Initialize the prefix array with -1
  const pre: number[] = new Array(n + 1);
  pre[0] = -1;

  // Calculate the prefix array
  for (let i = 0; i < n; i++) {
    // If this is the first character or the previous character is '0',
    // set the prefix of the current character to the current index
    if (i === 0 || (i > 0 && s[i - 1] === '0')) {
      pre[i + 1] = i;
    } else {
      // Otherwise, set the prefix of the current character to the prefix of the previous character
      pre[i + 1] = pre[i];
    }
  }

  let res = 0;

  // Iterate over the string
  for (let i = 1; i <= n; i++) {
    // Calculate the number of zeros in the substring ending at index i
    let cnt0 = s[i - 1] === '0' ? 1 : 0;
    let j = i;

    // Use a sliding window approach to find the number of substrings with dominant ones
    while (j > 0 && cnt0 * cnt0 <= n) {
      // Calculate the number of ones in the substring ending at index i
      const cnt1 = i - pre[j] - cnt0;

      // If the number of ones is greater than or equal to the square of the number of zeros,
      // add the number of substrings with dominant ones to the result
      if (cnt0 * cnt0 <= cnt1) {
        res += Math.min(j - pre[j], cnt1 - cnt0 * cnt0 + 1);
      }
      // Move the window to the right
      j = pre[j];
      // Increment the number of zeros
      cnt0++;
    }
  }

  return res;
}
