// https://leetcode.com/problems/plus-one/
/**
 * Q: given a large integer represented as an integer array digits
 *  Example:
 * Input: digits = [1,2,3], Output: [1,2,4]
 * Explanation: The array represents the integer 123.
 * Incrementing by one gives 123 + 1 = 124.
 * Thus, the result should be [1,2,4].
 *
 * [9] -> [1, 0]
 */

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
  if (digits[0] === 0) {
    digits.unshift(1);
  }
  return digits;
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
