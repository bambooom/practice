// https://leetcode.com/problems/maximum-69-number/
// You are given a positive integer num consisting only of digits 6 and 9.
// Return the maximum number you can get by changing at most one digit (6 becomes 9, and 9 becomes 6).

// Example 1:
// Input: num = 9669
// Output: 9969
// Explanation:
// Changing the first digit results in 6669.
// Changing the second digit results in 9969.
// Changing the third digit results in 9699.
// Changing the fourth digit results in 9666.
// The maximum number is 9969.

// Example 2:
// Input: num = 9996
// Output: 9999
// Explanation: Changing the last digit 6 to 9 results in the maximum number.

// Example 3:
// Input: num = 9999
// Output: 9999
// Explanation: It is better not to apply any change.

// string manipulation
function maximum69Number(num: number): number {
  return Number(num.toString().replace('6', '9'));
}

// math loop digit
function maximum69Number2(num: number): number {
  let temp = num;
  let index = -1;
  let pos = 0;

  while (temp > 0) {
    if (temp % 10 === 6) index = pos;
    temp = Math.floor(temp / 10);
    pos++;
  }

  return index === -1 ? num : num + 3 * Math.pow(10, index);
}
