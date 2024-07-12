// https://leetcode.com/problems/maximum-score-from-removing-substrings
// You are given a string s and two integers x and y. You can perform two types of operations any number of times.
// - Remove substring "ab" and gain x points.
// For example, when removing "ab" from "cabxbae" it becomes "cxbae".
// - Remove substring "ba" and gain y points.
// For example, when removing "ba" from "cabxbae" it becomes "cabxe".
//
// Return the maximum points you can gain after applying the above operations on s.

// Example 1:
// Input: s = "cdbcbbaaabab", x = 4, y = 5
// Output: 19
// Explanation:
// - Remove the "ba" underlined in "cdbcbbaaabab". Now, s = "cdbcbbaaab" and 5 points are added to the score.
// - Remove the "ab" underlined in "cdbcbbaaab". Now, s = "cdbcbbaa" and 4 points are added to the score.
// - Remove the "ba" underlined in "cdbcbbaa". Now, s = "cdbcba" and 5 points are added to the score.
// - Remove the "ba" underlined in "cdbcba". Now, s = "cdbc" and 5 points are added to the score.
// Total score = 5 + 4 + 5 + 5 = 19.

// Example 2:
// Input: s = "aabbaaxybbaabb", x = 5, y = 4
// Output: 20

// https://leetcode.com/problems/maximum-score-from-removing-substrings/solutions/5463219/simple-stack-bro/?envType=daily-question&envId=2024-07-12
function maximumGain(s: string, x: number, y: number): number {
  // Determine which substring to remove first based on the higher score
  const [first, second, firstScore, secondScore] =
    x > y ? ['ab', 'ba', x, y] : ['ba', 'ab', y, x];

  let score = 0;
  const stack: string[] = [];

  // First pass: remove the higher scoring substring
  for (const char of s) {
    if (stack.length > 0 && stack[stack.length - 1] + char === first) {
      stack.pop();
      score += firstScore;
    } else {
      stack.push(char);
    }
  }

  // second pass: remove the lower scroing substring
  const newStack: string[] = [];
  for (const char of stack) {
    if (
      newStack.length > 0 &&
      newStack[newStack.length - 1] + char === second
    ) {
      newStack.pop();
      score += secondScore;
    } else {
      newStack.push(char);
    }
  }

  return score;
}
