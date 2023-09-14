// https://leetcode.com/problems/removing-stars-from-a-string/
// #stack

// You are given a string s, which contains stars *.
// In one operation, you can:
// Choose a star in s.
// Remove the closest non-star character to its left, as well as remove the star itself.
// Return the string after all stars have been removed.

// Example:
// Input: s = "leet**cod*e"
// Output: "lecoe"

function removeStars(s: string): string {
  const stack: string[] = [];

  for (let i = 0; i < s.length; i++) {
    if (s[i] !== '*') {
      stack.push(s[i]);
    } else {
      stack.pop();
    }
  }

  return stack.join('');
}
