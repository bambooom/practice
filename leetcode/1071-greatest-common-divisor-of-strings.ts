// https://leetcode.com/problems/greatest-common-divisor-of-strings/

// For two strings s and t, we say "t divides s" if and only if s = t + ... + t (i.e., t is concatenated with itself one or more times).
// Given two strings str1 and str2, return the largest string x such that x divides both str1 and str2.
// str1 and str2 consist of English uppercase letters.

// bruteforce, check shorter string first, and then substring one by one
// Time complexity: O(min⁡(m,n)⋅(m+n))
// Space complexity: O(min⁡(m,n))
function gcdOfStrings(str1: string, str2: string): string {
  let res = '';
  const shortLen = Math.min(str1.length, str2.length);
  let shorter = str1;
  if (shortLen === str2.length) {
    shorter = str2;
  }

  for (let i = 0; i < shorter.length; i++) {
    const substring = shorter.slice(0, shortLen - i);
    if (
      str1.replaceAll(substring, '') === '' &&
      str2.replaceAll(substring, '') === ''
    ) {
      res = substring;
      break;
    }
  }

  return res;
}

//Approach 2: Greatest Common Divisor
// Since both strings contains multiples of the identical segment base, their concatenation must be consistent,
// regardless of the order:
// => str1 + str2 = str2 + str1

// We focus on the substring gcdBase whose length equals the greatest common divisor of the lengths of str1 and str2 (take the above picture as an example, the lengths of str1 and str2 are 9 and 6, so we focus on the substring of length 3, which is gcdBase = ABC).
// We will show that if there exists divisible strings, then the gcdBase must be the GCD string.
// 从数学角度来看，比如一个str1长度是9，另一个str2长度是6，那么最大公约数是3，gcd string 的长度只可能是0 或者3

function gcdOfStrings2(str1: string, str2: string): string {
  // If the concatenated strings are not equal,
  // then a common divisor cannot be found
  if (str1 + str2 !== str2 + str1) {
    return '';
  }

  // Calculate the greatest common divisor of the string lengths
  const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
  const len = gcd(str1.length, str2.length);

  // Return the substring that is a common divisor
  return str1.substring(0, len);
}
