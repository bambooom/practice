// https://leetcode.com/problems/4-keys-keyboard
// Imagine you have a special keyboard with the following keys:
// A: Print one 'A' on the screen.
// Ctrl-A: Select the whole screen.
// Ctrl-C: Copy selection to buffer.
// Ctrl-V: Print buffer on screen appending it after what has already been printed.
// Given an integer n, return the maximum number of 'A' you can print on the screen with at most n presses on the keys.

// Example 1:
// Input: n = 3
// Output: 3
// Explanation: We can at most get 3 A's on screen by pressing the following key sequence:
// A, A, A
// Example 2:
// Input: n = 7
// Output: 9
// Explanation: We can at most get 9 A's on screen by pressing following key sequence:
// A, A, A, Ctrl A, Ctrl C, Ctrl V, Ctrl V

function maxA(n: number): number {
  if (n <= 6) {
    return n; // if n <= 6, just all press A, won't be more than n
  }

  const nums = Array.from({ length: n + 1 }).fill(0) as number[];
  for (let i = 1; i <= 6; i++) {
    nums[i] = i;
  }

  // for n from 7, calculate the max number of 'A' with at most ready for copy & paste
  for (let i = 7; i <= n; i++) {
    nums[i] = nums[i - 1] + 1;
    for (let j = i - 3; j >= 1; j--) {
      // 3 means ctrl-A, ctrl-c, ctrl-v, 3 presses
      nums[i] = Math.max(nums[i], nums[j] * (i - j - 1));
    }
  }

  return nums[n];
}
