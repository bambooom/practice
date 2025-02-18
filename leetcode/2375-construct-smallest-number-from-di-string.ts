// https://leetcode.com/problems/construct-smallest-number-from-di-string
// You are given a 0-indexed string pattern of length n consisting of the characters 'I' meaning increasing and 'D' meaning decreasing.

// A 0-indexed string num of length n + 1 is created using the following conditions:
// num consists of the digits '1' to '9', where each digit is used at most once.
// If pattern[i] == 'I', then num[i] < num[i + 1].
// If pattern[i] == 'D', then num[i] > num[i + 1].
// Return the lexicographically smallest possible string num that meets the conditions.

// Example 1:
// Input: pattern = "IIIDIDDD"
// Output: "123549876"
// Explanation:
// At indices 0, 1, 2, and 4 we must have that num[i] < num[i+1].
// At indices 3, 5, 6, and 7 we must have that num[i] > num[i+1].
// Some possible values of num are "245639871", "135749862", and "123849765".
// It can be proven that "123549876" is the smallest possible num that meets the conditions.
// Note that "123414321" is not possible because the digit '1' is used more than once.

// Example 2:
// Input: pattern = "DDD"
// Output: "4321"
// Explanation:
// Some possible values of num are "9876", "7321", and "8742".
// It can be proven that "4321" is the smallest possible num that meets the conditions.

// https://leetcode.com/problems/construct-smallest-number-from-di-string/solutions/5211613/ts-solution/
function smallestNumber(pattern: string): string {
  let idx = -1;
  const len = pattern.length;
  const nums = Array(len + 1)
    .fill(0)
    .map((_, i) => i + 1);

  const swap = (start: number, end: number, nums: number[]) => {
    for (let i = 0; i < (start - end) / 2; i++) {
      [nums[start - i], nums[end + i]] = [nums[end + i], nums[start - i]];
    }

    idx = -1;
  };

  for (let i = len; i >= 0; i--) {
    if (pattern[i] === 'D' && idx === -1) {
      idx = i;
    }
    if (pattern[i] === 'I' && idx > -1) {
      swap(idx + 1, i + 1, nums);
    }
    if (i === 0 && pattern[i] === 'D' && idx > -1) {
      swap(idx + 1, i, nums);
    }
  }

  return nums.join('');
}

// using stack, easier to understand
function smallestNumber2(pattern: string): string {
  const stack: number[] = [];
  const results: number[] = [];

  for (let i = 0; i <= pattern.length; i++) {
    stack.push(i + 1);
    if (pattern[i] === 'I' || i === pattern.length) {
      while (stack.length > 0) {
        results.push(stack.pop()!);
      }
    }
  }
  return results.join('');
}
