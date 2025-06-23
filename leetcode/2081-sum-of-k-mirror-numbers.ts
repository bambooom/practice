// https://leetcode.com/problems/sum-of-k-mirror-numbers
// A k-mirror number is a positive integer without leading zeros that reads the same both forward and backward in base-10 as well as in base-k.
// For example, 9 is a 2-mirror number. The representation of 9 in base-10 and base-2 are 9 and 1001 respectively, which read the same both forward and backward.
// On the contrary, 4 is not a 2-mirror number. The representation of 4 in base-2 is 100, which does not read the same both forward and backward.
// Given the base k and the number n, return the sum of the n smallest k-mirror numbers.

// Example 1:
// Input: k = 2, n = 5
// Output: 25
// Explanation:
// The 5 smallest 2-mirror numbers and their representations in base-2 are listed as follows:
//   base-10    base-2
//     1          1
//     3          11
//     5          101
//     7          111
//     9          1001
// Their sum = 1 + 3 + 5 + 7 + 9 = 25.

// Example 2:
// Input: k = 3, n = 7
// Output: 499
// Explanation:
// The 7 smallest 3-mirror numbers are and their representations in base-3 are listed as follows:
//   base-10    base-3
//     1          1
//     2          2
//     4          11
//     8          22
//     121        11111
//     151        12121
//     212        21212
// Their sum = 1 + 2 + 4 + 8 + 121 + 151 + 212 = 499.

// Example 3:
// Input: k = 7, n = 17
// Output: 20379000
// Explanation: The 17 smallest 7-mirror numbers are:
// 1, 2, 3, 4, 5, 6, 8, 121, 171, 242, 292, 16561, 65656, 2137312, 4602064, 6597956, 6958596

// editorial
// binary search
// Since i itself must be a palindrome, we can construct i by first generating the first half of the digits, denoted as i′
// then reversing i′ and appending it to itself to form i.
function kMirror(k: number, n: number): number {
  const digits: number[] = new Array(100); // store the digits of a number in base-k.

  let left = 1; // used to generate numbers in the range [left, right)
  let count = 0; // keep track of the number of k-mirror numbers found
  let ans = 0n; // store the sum

  // check x is a palindrome in base-k
  const isPalindrome = (x: bigint, k: number, digit: number[]): boolean => {
    let length = -1;

    while (x > 0n) {
      length++;
      digit[length] = Number(x % BigInt(k));
      x = x / BigInt(k);
    }

    for (let i = 0, j = length; i < j; ++i, --j) {
      if (digit[i] !== digit[j]) {
        return false;
      }
    }
    return true;
  };

  while (count < n) {
    // In each iteration, the range [left, right) is used to generate numbers.
    const right = left * 10;
    // op = 0 indicates enumerating odd-length palindromes
    // op = 1 indicates enumerating even-length palindromes

    for (let op = 0; op < 2; ++op) {
      // enumerate i'
      for (let i = left; i < right && count < n; ++i) {
        // Constructing k-mirror numbers
        let combined = BigInt(i);
        let x = op === 0 ? Math.floor(i / 10) : i;

        while (x > 0) {
          combined = combined * 10n + BigInt(x % 10);
          x = Math.floor(x / 10);
        }
        //A k-mirror number is constructed by appending the reverse of the first half of the number to itself.

        if (isPalindrome(combined, k, digits)) {
          count++;
          ans += combined;
        }
      }
    }
    left = right; // updating the range
  }

  return Number(ans);
}
