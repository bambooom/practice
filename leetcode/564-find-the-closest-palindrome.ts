// https://leetcode.com/problems/find-the-closest-palindrome
// Given a string n representing an integer, return the closest integer (not including itself), which is a palindrome. If there is a tie, return the smaller one.
// The closest is defined as the absolute difference minimized between two integers.

// Example 1:
// Input: n = "123"
// Output: "121"
// Example 2:
// Input: n = "1"
// Output: "0"
// Explanation: 0 and 2 are the closest palindromes but we return the smallest which is 0.

// https://leetcode.com/problems/find-the-closest-palindrome/solutions/5675172/o-1-beats-100-0-ms-c-java-python-go-rust-javascript/
function nearestPalindromic(n: string): string {
  const num = BigInt(n);
  if (num <= 10n) {
    return (num - 1n).toString();
  }
  if (num === 11n) {
    return '9';
  }

  const length = n.length;
  const left = BigInt(n.slice(0, (length + 1) / 2));

  const generatePalindrome = (left: bigint, isEvenLength: boolean) => {
    let palindrome = left;
    if (!isEvenLength) {
      left = left / 10n;
    }

    while (left > 0n) {
      palindrome = palindrome * 10n + (left % 10n);
      left = left / 10n;
    }
    return palindrome;
  };

  const palindromeCandidates = [
    generatePalindrome(left - 1n, length % 2 === 0),
    generatePalindrome(left, length % 2 === 0),
    generatePalindrome(left + 1n, length % 2 === 0),
    BigInt(10n ** BigInt(length - 1)) - 1n,
    BigInt(10n ** BigInt(length)) + 1n,
  ];

  let nearest = 0n;
  let minDiff = BigInt(Number.MAX_SAFE_INTEGER);

  for (const candidate of palindromeCandidates) {
    if (candidate === num) {
      continue;
    }
    const diff = candidate > num ? candidate - num : num - candidate;
    if (diff < minDiff || (diff === minDiff && candidate < nearest)) {
      minDiff = diff;
      nearest = candidate;
    }
  }

  return nearest.toString();
}

// https://leetcode.com/problems/find-the-closest-palindrome/solutions/2019506/simple-javascript-solution/
// seems a little faster, but more memory consuming
function nearestPalindromic2(n: string): string {
  const bit = BigInt(n);
  const num = [bit - 1n, bit + 1n];

  const getDistance = (num: bigint) => {
    const s = num + '';
    let i = 0;
    let j = s.length - 1;

    while (i < j) {
      if (s[i++] !== s[j--]) {
        return 10 ** (i - 1);
      }
    }
    return 0;
  };

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const d1 = getDistance(num[0]);
    if (d1 === 0) break;
    num[0] -= BigInt(d1);
  }

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const d2 = getDistance(num[1]);
    if (d2 === 0) break;
    num[1] += BigInt(d2);
  }

  return bit - num[0] <= num[1] - bit ? String(num[0]) : String(num[1]);
}
