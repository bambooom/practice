// https://leetcode.com/problems/string-to-integer-atoi/
// Implement the myAtoi(string s) function, which converts a string to a 32-bit signed integer.
// The algorithm for myAtoi(string s) is as follows:
// 1. Whitespace: Ignore any leading whitespace (" ").
// 2. Signedness: Determine the sign by checking if the next character is '-' or '+', assuming positivity is neither present.
// 3. Conversion: Read the integer by skipping leading zeros until a non-digit character is encountered or the end of the string is reached. If no digits were read, then the result is 0.
// 4. Rounding: If the integer is out of the 32-bit signed integer range [-231, 231 - 1], then round the integer to remain in the range. Specifically, integers less than -231 should be rounded to -231, and integers greater than 231 - 1 should be rounded to 231 - 1.
// Return the integer as the final result.

// just do as steps, not the best way
function myAtoi(s: string): number {
  const len = s.length;
  let result = 0;
  let sign = 1;

  for (let i = 0; i < len; i++) {
    // skip whitespace
    if (s[i] === ' ') continue;
    // sign
    if (s[i] === '+' || s[i] === '-') {
      sign = s[i] === '-' ? -1 : 1;
      if (!/[0-9]/.test(s[i + 1])) {
        return 0;
      }
    }

    if (/[0-9]/.test(s[i])) {
      result = result * 10 + +s[i];
      if (!/[0-9]/.test(s[i + 1])) {
        break;
      }
    }

    // break point
    if (/[a-zA-Z.]/.test(s[i])) {
      return 0;
    }
  }

  return sign === -1
    ? Math.max(-(2 ** 31), -result)
    : Math.min(2 ** 31 - 1, result);
}

// parse by regex
function myAtoi2(s: string): number {
  return Math.min(
    Math.pow(2, 31) - 1,
    Math.max(
      parseInt(s.match(/^\s*([-+]?\d+)/)?.[1] ?? '0', 10),
      -Math.pow(2, 31),
    ),
  );
}

// not one-liner
function myAtoi3(s: string): number {
  const MIN_NUM = -Math.pow(2, 31);
  const MAX_NUM = Math.pow(2, 31) - 1;
  const res = parseInt(s) || 0;

  if (!(res >= MIN_NUM && res <= MAX_NUM)) {
    return res < 0 ? MIN_NUM : MAX_NUM;
  }

  return res;
}

//
function myAtoi4(s: string): number {
  let atoiString = '';
  let isNegative = false;

  s = s.trimStart();
  for (let i = 0; i < s.length; i++) {
    if (i == 0 && s[0] == '-') {
      isNegative = true;
      continue;
    } else if (i == 0 && s[0] == '+') continue;

    if (isNaN(parseInt(s[i]))) break;
    atoiString += s[i];
  }

  if (atoiString == '' || atoiString == '0') return 0;
  if (parseInt(atoiString) > 2147483647)
    return isNegative ? -2147483648 : 2147483647;
  return isNegative ? parseInt(atoiString) * -1 : parseInt(atoiString);
}
