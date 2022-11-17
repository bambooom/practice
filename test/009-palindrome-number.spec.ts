import {
  isPalindrome,
  isPalindromeInteger,
} from '../leetcode/009-palindrome-number';

describe('check isPalindrome function', () => {
  test('x=121 is palindrome', () => {
    expect(isPalindrome(121)).toBe(true);
  });
  test('x=120 is not palindrome', () => {
    expect(isPalindrome(120)).toBe(false);
  });
  test('x=-120 is not palindrome', () => {
    expect(isPalindrome(-120)).toBe(false);
  });
  test('x=1221 is not palindrome', () => {
    expect(isPalindrome(1221)).toBe(true);
  });
});

describe('check isPalindromeInteger function', () => {
  test('x=121 is palindrome', () => {
    expect(isPalindromeInteger(121)).toBe(true);
  });
  test('x=120 is not palindrome', () => {
    expect(isPalindromeInteger(120)).toBe(false);
  });
  test('x=-120 is not palindrome', () => {
    expect(isPalindromeInteger(-120)).toBe(false);
  });
  test('x=1221 is not palindrome', () => {
    expect(isPalindromeInteger(1221)).toBe(true);
  });
});
