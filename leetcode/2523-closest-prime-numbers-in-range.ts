// https://leetcode.com/problems/closest-prime-numbers-in-range/description/
// Given two positive integers left and right, find the two integers num1 and num2 such that:
// left <= num1 < num2 <= right .
// Both num1 and num2 are prime numbers.
// num2 - num1 is the minimum amongst all other pairs satisfying the above conditions.
// Return the positive integer array ans = [num1, num2]. If there are multiple pairs satisfying these conditions, return the one with the smallest num1 value. If no such numbers exist, return [-1, -1].

// Example 1:
// Input: left = 10, right = 19
// Output: [11,13]
// Explanation: The prime numbers between 10 and 19 are 11, 13, 17, and 19.
// The closest gap between any pair is 2, which can be achieved by [11,13] or [17,19].
// Since 11 is smaller than 17, we return the first pair.

// Example 2:
// Input: left = 4, right = 6
// Output: [-1,-1]
// Explanation: There exists only one prime number in the given range, so the conditions cannot be satisfied.

// trivial solution, but slow
function closestPrimes(left: number, right: number): number[] {
  const isPrime = (n: number): boolean => {
    if (n < 2) return false;
    for (let i = 2; i <= Math.sqrt(n); i++) {
      if (n % i === 0) return false;
    }
    return true;
  };

  const primes: number[] = [];

  for (let i = left; i <= right; i++) {
    if (isPrime(i)) primes.push(i);
  }

  if (primes.length < 2) return [-1, -1];

  let idx1 = 0;
  let idx2 = 1;
  let minDiff = Infinity;

  for (let i = 0; i < primes.length - 1; i++) {
    const diff = primes[i + 1] - primes[i];
    if (diff < minDiff) {
      minDiff = diff;
      idx1 = i;
      idx2 = i + 1;
    }
  }

  return [primes[idx1], primes[idx2]];
}

// https://leetcode.com/problems/closest-prime-numbers-in-range/solutions/3043273/typescript-sieve-of-eratosthenes/
// sieve of eratosthenes:
//  an algorithm for finding all prime numbers less than or equal to a given limit n.
//  The algorithm works by marking all multiples of prime numbers as composite,
//  each step can start from p^2, and left over are prime numbers

// faster, but seems use more memory
function closestPrimes2(left: number, right: number): number[] {
  // generate primes from left to right range
  const getPrimes = (left: number, right: number): number[] => {
    const res: boolean[] = Array(right).fill(true);

    for (let i = 2; i <= Math.sqrt(right); i++) {
      if (!res[i]) continue;

      for (let j = i * i; j < right; j += i) {
        res[j] = false;
      }
    }

    // primes from [left, right]
    const primes: number[] = [];
    for (let i = Math.max(2, left); i < right; i++) {
      if (res[i]) {
        primes.push(i);
      }
    }

    return primes;
  };

  const primes = getPrimes(left, right + 1);

  let res: number[] = [-1, -1];
  let minDiff = Infinity;

  for (let i = 1; i < primes.length; i++) {
    if (primes[i] - primes[i - 1] < minDiff) {
      minDiff = primes[i] - primes[i - 1];
      res = [primes[i - 1], primes[i]];
    }
  }

  return res;
}
