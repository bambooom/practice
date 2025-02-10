// https://leetcode.com/problems/clear-digits
// You are given a string s.
// Your task is to remove all digits by doing this operation repeatedly:
// Delete the first digit and the closest non-digit character to its left.
// Return the resulting string after removing all digits.

// Example 1:
// Input: s = "abc"
// Output: "abc"
// Explanation:
// There is no digit in the string.

// Example 2:
// Input: s = "cb34"
// Output: ""
// Explanation:
// First, we apply the operation on s[2], and s becomes "c4".
// Then we apply the operation on s[1], and s becomes "".

function clearDigits(s: string): string {
  let r: RegExpMatchArray | null;
  while ((r = s.match(/\d/))) {
    const index = r.index!;
    s = s.slice(0, Math.max(index - 1, 0)) + s.slice(index + 1);
  }
  return s;
}

function clearDigits2(s: string): string {
  const output: string[] = [];
  for (let i = s.length - 1, count = 0; i >= 0; i--) {
    isNaN(parseInt(s[i]))
      ? (count > 0 && count--) || output.push(s[i])
      : count++;
  }
  // return output.reduce((str, char) => char + str, '');
  return output.reverse().join('');
}

// use stack

function clearDigits3(s: string): string {
  let stack = '';

  for (let i = 0; i < s.length; i++) {
    const char = s[i];
    if (Number.isNaN(Number(char))) {
      stack += char;
    } else {
      stack = stack.slice(0, -1);
    }
  }
  return stack;
}
