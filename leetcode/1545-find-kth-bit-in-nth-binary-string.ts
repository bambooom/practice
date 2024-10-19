// https://leetcode.com/problems/find-kth-bit-in-nth-binary-string

// Given two positive integers n and k, the binary string Sn is formed as follows:
// S[1] = '0';
// S[i] = S[i - 1] + "1" + reverse(invert(S[i - 1])) for i > 1
// Where + denotes the concatenation operation, reverse(x) returns the reversed string x, and invert(x) inverts all the bits in x (0 changes to 1 and 1 changes to 0).
// For example, the first four strings in the above sequence are:
// S1 = "0"
// S2 = "011"
// S3 = "0111001"
// S4 = "011100110110001"
// Return the kth bit in Sn. It is guaranteed that k is valid for the given n.

// Example 1:
// Input: n = 3, k = 1
// Output: "0"
// Explanation: S3 is "0111001".
// The 1st bit is "0".

// Example 2:
// Input: n = 4, k = 11
// Output: "1"
// Explanation: S4 is "011100110110001".
// The 11th bit is "1".

// https://leetcode.com/problems/find-kth-bit-in-nth-binary-string/solutions/5935309/6-lines-of-code-beats-96-00/?envType=daily-question&envId=2024-10-19
// recursive
function findKthBit(n: number, k: number): string {
  if (n === 1) return '0';

  const length = (1 << n) - 1;
  const mid = Math.floor(length / 2) + 1;

  if (k === mid) {
    return '1';
  }
  if (k < mid) {
    return findKthBit(n - 1, k);
  }
  return findKthBit(n - 1, length - k + 1) === '0' ? '1' : '0';
}

// https://leetcode.com/problems/find-kth-bit-in-nth-binary-string/solutions/5936707/i-believe-code-should-be-readable-enough/?envType=daily-question&envId=2024-10-19
// straightforward, but slow
function findKthBit2(n: number, k: number): string {
  if (n === 1) return '0';

  const map: Record<string, string> = {
    1: '0',
  };

  const reverse = (s: string): string => {
    return s.split('').reverse().join('');
  };
  const invert = (s: string): string => {
    const answer: string[] = [];
    for (const char of s) {
      if (char === '0') {
        answer.push('1');
      } else {
        answer.push('0');
      }
    }

    return answer.join('');
  };

  for (let i = 2; i <= n; i++) {
    map[i] = map[i - 1] + '1' + reverse(invert(map[i - 1]));
  }
  return map[n][k - 1];
}
