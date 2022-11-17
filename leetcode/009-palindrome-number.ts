// Q: Given an integer x, return true if x is a palindrome, and false otherwise.
// palindrome means
// 121, reversed => 121, same
// 10, reversed => 01, different, not palindrome

// simple approach: convert the integer to string
// but it requires extra memory for string and array
// this maybe wasteful
function isPalindrome(x: number): boolean {
  if (x < 0) return false;
  const s = x.toString();
  return s.split('').reverse().join('') === s;
}

/**
 * Solution: not using string
 * but using / and % to revert half of the integer from right
 * then compare to the previous half
 */
function isPalindromeInteger(x: number): boolean {
  // Special cases:
  // when x < 0, x is not a palindrome.
  // Also if the last digit of the number is 0, in order to be a palindrome,
  // the first digit of the number also needs to be 0.
  // Only 0 satisfy this property.
  if (x < 0 || (x % 10 === 0 && x !== 0)) return false;

  let revertedNumber = 0;
  while (x > revertedNumber) {
    revertedNumber = revertedNumber * 10 + (x % 10); // add last digit to reverted
    x = Math.floor(x / 10); // remove last digit
  }
  return x === revertedNumber || x === revertedNumber / 10;
  //if even digits, then x === revertedNumber, 1221, 12=12
  //if odd digits, last step, x === revertedNumber / 10; 121, 1 = floor(12/10)
}
