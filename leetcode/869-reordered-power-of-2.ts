// https://leetcode.com/problems/reordered-power-of-2
// You are given an integer n. We reorder the digits in any order (including the original order) such that the leading digit is not zero.
// Return true if and only if we can do this so that the resulting number is a power of two.

// Example 1:
// Input: n = 1
// Output: true

// Example 2:
// Input: n = 10
// Output: false

function reorderedPowerOf2(n: number): boolean {
  // Convert the number to a string, sort its digits, and join them back into a string
  const str = n.toString().split('').sort().join('');

  // Check all powers of 2 up to 2^30 (since 10^9 < 2^30)
  for (let i = 0; i < 30; i++) {
    // 10^9 < 2^30
    if ((1 << i).toString().split('').sort().join('') === str) {
      // Convert the current power of 2 to a string, sort its digits, and compare with the sorted digits of `n`
      // If a match is found, return true
      return true;
    }
  }

  // If no match is found after checking all powers of 2, return false
  return false;
}

// using pow
function reorderedPowerOf2Pow(n: number): boolean {
  const guaranteedMoreNumber = 10 ** n.toString().length; // find a guaranteed higher number
  let lastPower = 0; // the power of 2
  n = +n
    .toString()
    .split('')
    .sort((a, b) => +b - +a)
    .join(''); // sorting the incoming `n` in DESC

  while (guaranteedMoreNumber > 2 ** lastPower) {
    if (
      +(2 ** lastPower)
        .toString()
        .split('')
        .sort((a, b) => +b - +a)
        .join('') === n
    ) {
      // sorting the current power of 2 in DESC and comparing with the resulting `n`
      return true;
    }
    lastPower++;
  }

  return false;
}
