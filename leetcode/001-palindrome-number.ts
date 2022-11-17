// Q: Given an integer x, return true if x is a palindrome, and false otherwise.
// palindrome means
// 121, reversed => 121, same
// 10, reversed => 01, different, not palindrome

// simple approach: convert the integer to string
function isPalindrome(x: number): boolean {
  if (x < 0) return false;
  const s = x.toString();
  return s.split('').reverse().join('') === s;
};
