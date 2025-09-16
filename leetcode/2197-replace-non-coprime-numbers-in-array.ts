// https://leetcode.com/problems/replace-non-coprime-numbers-in-array/description
// You are given an array of integers nums. Perform the following steps:
// Find any two adjacent numbers in nums that are non-coprime.
// If no such numbers are found, stop the process.
// Otherwise, delete the two numbers and replace them with their LCM (Least Common Multiple).
// Repeat this process as long as you keep finding two adjacent non-coprime numbers.
// Return the final modified array. It can be shown that replacing adjacent non-coprime numbers in any arbitrary order will lead to the same result.
// The test cases are generated such that the values in the final array are less than or equal to 108.
// Two values x and y are non-coprime if GCD(x, y) > 1 where GCD(x, y) is the Greatest Common Divisor of x and y.

// Example 1:
// Input: nums = [6,4,3,2,7,6,2]
// Output: [12,7,6]
// Explanation:
// - (6, 4) are non-coprime with LCM(6, 4) = 12. Now, nums = [12,3,2,7,6,2].
// - (12, 3) are non-coprime with LCM(12, 3) = 12. Now, nums = [12,2,7,6,2].
// - (12, 2) are non-coprime with LCM(12, 2) = 12. Now, nums = [12,7,6,2].
// - (6, 2) are non-coprime with LCM(6, 2) = 6. Now, nums = [12,7,6].
// There are no more adjacent non-coprime numbers in nums.
// Thus, the final modified array is [12,7,6].
// Note that there are other ways to obtain the same resultant array.

// Example 2:
// Input: nums = [2,2,1,1,3,3,3]
// Output: [2,1,1,3]
// Explanation:
// - (3, 3) are non-coprime with LCM(3, 3) = 3. Now, nums = [2,2,1,1,3,3].
// - (3, 3) are non-coprime with LCM(3, 3) = 3. Now, nums = [2,2,1,1,3].
// - (2, 2) are non-coprime with LCM(2, 2) = 2. Now, nums = [2,1,1,3].
// There are no more adjacent non-coprime numbers in nums.
// Thus, the final modified array is [2,1,1,3].
// Note that there are other ways to obtain the same resultant array.

// https://leetcode.com/problems/replace-non-coprime-numbers-in-array/solutions/7194482/beats-100-straightforward-clean-direct-approach-with-just-lists/?envType=daily-question&envId=2025-09-16
// Iterate through the input array, push each element onto the list, and whenever the last two elements are non‑coprime (gcd > 1) replace them with their LCM. After each replacement, immediately recheck the new last element against its previous neighbor (local backtrack). This avoids restarting a full scan after every merge and is straightforward to implement.
function replaceNonCoprimes(nums: number[]): number[] {
  // Euclidean algorithm to repeatedly divide b by the remainder of a divided by b
  const gcd = (a: number, b: number): number => {
    while (b !== 0) {
      const tmp = b;
      b = a % b;
      a = tmp;
    }
    return a;
  };

  const result: number[] = []; //used as a stack

  for (const num of nums) {
    result.push(num);
    // while has at least two elements and gcd(last, second_last) > 1
    while (result.length > 1) {
      // repeat the new last two elements are non-coprime
      const a = result[result.length - 1];
      const b = result[result.length - 2];
      const g = gcd(a, b);
      if (g > 1) {
        // pop last two elements and compute LCM and push LCM back
        result.pop();
        result.pop();
        const lcm = Math.floor((a / g) * b);
        result.push(lcm);
      } else {
        break;
      }
    }
  }

  return result;
}
