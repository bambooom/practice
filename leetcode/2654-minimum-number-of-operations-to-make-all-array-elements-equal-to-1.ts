// https://leetcode.com/problems/minimum-number-of-operations-to-make-all-array-elements-equal-to-1/
// You are given a 0-indexed array nums consisiting of positive integers. You can do the following operation on the array any number of times:
// Select an index i such that 0 <= i < n - 1 and replace either of nums[i] or nums[i+1] with their gcd value.
// Return the minimum number of operations to make all elements of nums equal to 1. If it is impossible, return -1.
// The gcd of two integers is the greatest common divisor of the two integers.

// Example 1:
// Input: nums = [2,6,3,4]
// Output: 4
// Explanation: We can do the following operations:
// - Choose index i = 2 and replace nums[2] with gcd(3,4) = 1. Now we have nums = [2,6,1,4].
// - Choose index i = 1 and replace nums[1] with gcd(6,1) = 1. Now we have nums = [2,1,1,4].
// - Choose index i = 0 and replace nums[0] with gcd(2,1) = 1. Now we have nums = [1,1,1,4].
// - Choose index i = 2 and replace nums[3] with gcd(1,4) = 1. Now we have nums = [1,1,1,1].

// Example 2:
// Input: nums = [2,10,6,14]
// Output: -1
// Explanation: It can be shown that it is impossible to make all the elements equal to 1.

// Constraints:
// 2 <= nums.length <= 50
// 1 <= nums[i] <= 10^6

// https://leetcode.com/problems/minimum-number-of-operations-to-make-all-array-elements-equal-to-1/solutions/7342559/solution-of-the-day-9967-beats-all-in-on-s0w3/?envType=daily-question&envId=2025-11-12
// If the array already contains some 1s, we can use them to "spread" 1s across the array using minimal operations.
// Otherwise, we must find a subarray whose GCD equals 1 — because only then can we generate a 1 that can be used to make others 1.
// Idea:
// - If there are already cnt1 ones, we can make all elements 1 in (n - cnt1) operations (each non-1 can be merged with a nearby 1).
// - Otherwise, find the shortest subarray whose GCD is 1.
// - Once you find such a subarray of length L, you can make one 1 in L - 1 operations, and then make all others 1 in (n - 1) more operations.
//    Hence total = (L - 1) + (n - 1) = L + n - 2.

function minOperations(nums: number[]): number {
  const n = nums.length;
  let num1 = 0; // Number of elements already equal to 1
  let g = 0; // GCD of all elements

  // Calculates the greatest common divisor (gcd) of two numbers using the Euclidean algorithm.
  const gcd = (a: number, b: number): number => {
    while (b !== 0) {
      [a, b] = [b, a % b];
    }
    return a;
  };

  for (const x of nums) {
    if (x === 1) {
      num1++; // Count the number of 1s in the array
    }
    g = gcd(g, x); // Calculate the GCD of all elements
  }

  if (num1 > 0) {
    // If there are already elements equal to 1, return the difference between the length of the array and num1
    return n - num1;
  }

  if (g > 1) {
    // if g is > 1, it means gcd of all elements is > 1, so we can't make all elements equal to 1
    return -1;
  }

  // Otherwise, find the shortest subarray whose GCD is 1.
  let minLen = n;
  for (let i = 0; i < n; i++) {
    let currentGcd = 0;
    // Iterate through the remaining elements of the array
    for (let j = i; j < n; j++) {
      // Update the gcd of the current element and currentGcd
      currentGcd = gcd(currentGcd, nums[j]);

      // If the gcd is 1, update minLen with the minimum value between minLen and the length of the current subarray
      if (currentGcd === 1) {
        minLen = Math.min(minLen, j - i + 1);
        break;
      }
    }
  }

  return minLen + n - 2;
}
