// https://leetcode.com/problems/palindrome-permutation/
// 检查 string 是否是 palindrome 回文，正着读和倒着读相同
// #hash-table

function canPermutePalindrome(s: string): boolean {
  const charset: Record<string, boolean> = {};

  // maintain a set of charactors that occur odd number of times
  for (const c of s) {
    if (charset[c]) delete charset[c];
    else charset[c] = true;
  }

  // return true if zero or one charactor that occur odd number of times
  return Object.keys(charset).length <= 1;
}
