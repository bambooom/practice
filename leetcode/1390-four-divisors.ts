// https://leetcode.com/problems/four-divisors/
// Given an integer array nums, return the sum of divisors of the integers in that array that have exactly four divisors. If there is no such integer in the array, return 0.

// Example 1:
// Input: nums = [21,4,7]
// Output: 32
// Explanation:
// 21 has 4 divisors: 1, 3, 7, 21
// 4 has 3 divisors: 1, 2, 4
// 7 has 2 divisors: 1, 7
// The answer is the sum of divisors of 21 only.

// Example 2:
// Input: nums = [21,21]
// Output: 64

// Example 3:
// Input: nums = [1,2,3,4,5]
// Output: 0

// Constraints:
// 1 <= nums.length <= 10^4
// 1 <= nums[i] <= 10^5

function sumFourDivisors(nums: number[]): number {
  let ans = 0;

  for (const x of nums) {
    let n = x; // Store the current number
    let p = 0; // First divisor found
    let q = 0; // Second divisor found
    let cnt = 0; // Counter for the number of divisors found

    // Find the divisors of the number
    // loop does not go beyond the square root of n
    // cnt <= 2 part of the condition ensures that the loop does not continue beyond finding two divisors
    // This is because a number with more than two divisors cannot have exactly four divisors.
    for (let i = 2; i * i <= n && cnt <= 2; i++) {
      if (n % i === 0) {
        cnt++;
        if (cnt === 1) {
          p = i; // Assign the first divisor to p
        } else {
          q = i; // Assign the second divisor to q
        }

        // Divide the number by the divisor until it is no longer divisible
        while (n % i === 0) {
          n /= i;
        }
      }
    }

    if (n > 1) {
      cnt++;
      if (cnt === 1) {
        p = n;
      } else {
        q = n;
      }
    }

    // Check if the number has exactly four divisors
    if (cnt === 2 && p * q === x) {
      ans += 1 + p + q + x; // Add the sum of divisors to the total sum
    } else if (cnt === 1 && p * p * p === x) {
      ans += 1 + p + p * p + x; // Add the sum of divisors to the total sum
    }
  }

  return ans; // Return the total sum of divisors
}
