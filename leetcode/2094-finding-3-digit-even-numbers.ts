// https://leetcode.com/problems/finding-3-digit-even-numbers/
// You are given an integer array digits, where each element is a digit. The array may contain duplicates.
// You need to find all the unique integers that follow the given requirements:
// The integer consists of the concatenation of three elements from digits in any arbitrary order.
// The integer does not have leading zeros.
// The integer is even.
// For example, if the given digits were [1, 2, 3], integers 132 and 312 follow the requirements.
// Return a sorted array of the unique integers.

// Example 1:
// Input: digits = [2,1,3,0]
// Output: [102,120,130,132,210,230,302,310,312,320]
// Explanation: All the possible integers that follow the requirements are in the output array.
// Notice that there are no odd integers or integers with leading zeros.

// Example 2:
// Input: digits = [2,2,8,8,2]
// Output: [222,228,282,288,822,828,882]
// Explanation: The same digit can be used as many times as it appears in digits.
// In this example, the digit 8 is used twice each time in 288, 828, and 882.

// Example 3:
// Input: digits = [3,7,5]
// Output: []
// Explanation: No even integers can be formed using the given digits.

function findEvenNumbers(digits: number[]): number[] {
  const n = digits.length;
  const res = new Set<number>();
  const visited = new Array(digits.length).fill(false); // track visited digits

  for (let i = 0; i < n; i++) {
    if (digits[i] === 0) continue; // skip leading zero

    visited[i] = true;

    for (let j = 0; j < n; j++) {
      if (visited[j]) continue;
      visited[j] = true;

      for (let k = 0; k < n; k++) {
        if (digits[k] & 1 || visited[k]) continue; // skip odd numbers

        res.add(digits[i] * 100 + digits[j] * 10 + digits[k]);
      }

      visited[j] = false;
    }
    visited[i] = false;
  }

  return Array.from(res).sort((a, b) => a - b);
}
