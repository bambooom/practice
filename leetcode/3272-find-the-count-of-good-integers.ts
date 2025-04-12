// https://leetcode.com/problems/find-the-count-of-good-integers
// You are given two positive integers n and k.
// An integer x is called k-palindromic if:
// x is a palindrome.
// x is divisible by k.
// An integer is called good if its digits can be rearranged to form a k-palindromic integer. For example, for k = 2, 2020 can be rearranged to form the k-palindromic integer 2002, whereas 1010 cannot be rearranged to form a k-palindromic integer.

// Return the count of good integers containing n digits.
// Note that any integer must not have leading zeros, neither before nor after rearrangement. For example, 1010 cannot be rearranged to form 101.

// Example 1:
// Input: n = 3, k = 5
// Output: 27
// Explanation:
// Some of the good integers are:
// 551 because it can be rearranged to form 515.
// 525 because it is already k-palindromic.

// Example 2:
// Input: n = 1, k = 4
// Output: 2
// Explanation:
// The two good integers are 4 and 8.

// Example 3:
// Input: n = 5, k = 6
// Output: 2468

// https://leetcode.com/problems/find-the-count-of-good-integers/solutions/6641500/3272-find-the-count-of-good-integers/?envType=daily-question&envId=2025-04-12
// Approach:
// 1. generate all palindromic numbers of length n
// 2. check if the number is divisible by k
// 3. for each suck number, count how many n-digit permutations exist
// 4. avoid overcounting by using sets or canonical forms
function countGoodIntegers(n: number, k: number): number {
  const seen = new Set<string>();
  let count = 0;

  const generatePalindromes = (n: number): string[] => {
    const res: string[] = [];
    const half = Math.floor((n + 1) / 2);
    const start = Math.pow(10, half - 1);
    const end = Math.pow(10, half);

    for (let i = start; i < end; ++i) {
      const left = i.toString();
      let right = left;
      if (n % 2 === 1) {
        right = right.slice(0, -1);
      }
      right = right.split('').reverse().join('');
      res.push(left + right);
    }

    return res;
  };

  const factCache: number[] = Array(21).fill(-1);
  const factorial = (x: number): number => {
    if (x === 0 || x === 1) return 1;
    if (factCache[x] !== -1) return factCache[x];
    return (factCache[x] = x * factorial(x - 1));
  };

  const countValidPermutations = (digits: string): number => {
    const freq: Record<string, number> = {};
    for (const c of digits) {
      freq[c] = (freq[c] || 0) + 1;
    }

    let total = factorial(digits.length);
    for (const f of Object.values(freq)) {
      total /= factorial(f);
    }

    // subtract permutations starting with '0'
    if (freq['0']) {
      freq['0']--;
      let sub = factorial(digits.length - 1);
      for (const f of Object.values(freq)) {
        sub /= factorial(f);
      }
      total -= sub;
      freq['0']++; // restore
    }

    return total;
  };

  const palindromes = generatePalindromes(n);

  for (const p of palindromes) {
    if (BigInt(p) % BigInt(k) !== 0n) {
      continue;
    }

    const sortedDigits = p.split('').sort().join('');
    if (seen.has(sortedDigits)) {
      continue;
    }

    seen.add(sortedDigits);
    count += countValidPermutations(sortedDigits);
  }

  return count;
}

// https://leetcode.com/problems/find-the-count-of-good-integers/solutions/6641380/naruto-step-by-step-simple-code-easiest-explanation/?envType=daily-question&envId=2025-04-12
// seems faster
function countGoodIntegers2(n: number, k: number): number {
  const validClones: string[] = [];
  const baseClone = Array(n).fill('0');

  // 🌀 Recursive Symmetry Formation for Clones
  const generatePalindromes = (
    clone: string[],
    index: number,
    validClones: string[],
    k: string | number | bigint | boolean,
  ) => {
    if (index >= Math.floor((clone.length + 1) / 2)) {
      const chakraID = clone.join('');
      if (BigInt(chakraID) % BigInt(k) === 0n) validClones.push(chakraID);
      return;
    }

    if (index !== 0) {
      clone[index] = '0';
      clone[clone.length - 1 - index] = '0';
      generatePalindromes(clone, index + 1, validClones, k);
    }

    for (let i = 1; i <= 9; i++) {
      clone[index] = String(i);
      clone[clone.length - 1 - index] = String(i);
      generatePalindromes(clone, index + 1, validClones, k);
    }
  };

  // 🧠 Factorial Chakra Generator
  const factorial = (num: number | bigint) => {
    let chakra = 1n;
    for (let i = 1n; i <= num; i++) chakra *= i;
    return chakra;
  };

  generatePalindromes(baseClone, 0, validClones, k);

  const chakraPatterns = new Set<string>();

  // 🔍 Chakra Frequency Fingerprint
  for (const clone of validClones) {
    const freq = Array(10).fill(0);
    for (const c of clone) freq[+c]++;
    chakraPatterns.add(freq.join(','));
  }

  const basePerms = factorial(BigInt(n));
  let total = 0n;

  // 🧾 Deduplicate and compute permutations for each frequency
  for (const pattern of chakraPatterns) {
    const parts = pattern.split(',').map(Number);
    let perms = basePerms;

    for (const f of parts) perms /= factorial(BigInt(f));

    if (parts[0] > 0) {
      const zeros = parts[0] - 1;
      let zeroPerms = factorial(BigInt(n - 1));
      for (let j = 1; j < parts.length; j++)
        zeroPerms /= factorial(BigInt(parts[j]));
      zeroPerms /= factorial(BigInt(zeros));
      perms -= zeroPerms;
    }

    total += perms;
  }

  return Number(total);
}
