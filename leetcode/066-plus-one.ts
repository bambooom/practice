// https://leetcode.com/problems/plus-one/
// You are given a large integer represented as an integer array digits, where each digits[i] is the ith digit of the integer. The digits are ordered from most significant to least significant in left-to-right order. The large integer does not contain any leading 0's.
// Increment the large integer by one and return the resulting array of digits.

// Example 1:
// Input: digits = [1,2,3]
// Output: [1,2,4]
// Explanation: The array represents the integer 123.
// Incrementing by one gives 123 + 1 = 124.
// Thus, the result should be [1,2,4].

// Example 2:
// Input: digits = [4,3,2,1]
// Output: [4,3,2,2]
// Explanation: The array represents the integer 4321.
// Incrementing by one gives 4321 + 1 = 4322.
// Thus, the result should be [4,3,2,2].

// Example 3:
// Input: digits = [9]
// Output: [1,0]
// Explanation: The array represents the integer 9.
// Incrementing by one gives 9 + 1 = 10.
// Thus, the result should be [1,0].

// Constraints:
// 1 <= digits.length <= 100
// 0 <= digits[i] <= 9
// digits does not contain any leading 0's.

export function plusOne(digits: number[]): number[] {
  const len = digits.length;
  digits[len - 1]++;
  if (digits.at(-1) !== 10) {
    return digits;
  }
  // last digit is 9=>10, then check prev one by one
  digits[len - 1] = 0;
  for (let i = 2; i <= len; i++) {
    digits[len - i]++;
    if (digits[len - i] === 10) {
      digits[len - i] = 0;
    } else {
      break;
    }
  }
  // if first digit is 0, then add 1 to the beginning
  if (digits[0] === 0) {
    digits.unshift(1);
  }
  return digits;
}

// kind of brute force, just add 1 to the last digit, if it's 9, then set it to 0 and add 1 to the prev digit, if it's 9, then set it to 0 and add 1 to the prev digit, until the first digit, if it's 9, then set it to 0 and add 1 to the beginning
function plusOne2(digits: number[]): number[] {
  for (let i = digits.length - 1; i >= 0; i--) {
    if (digits[i] < 9) {
      digits[i]++;
      return digits;
    }
    digits[i] = 0;
  }
  return [1, ...digits];
}

// console.log(plusOne([1, 2, 3])); // [1,2,4]
// console.log(plusOne([9])); // [1,0]
// 19
// 99
// 91
// 919
// 999
// 199
// 123
