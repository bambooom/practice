// https://leetcode.com/problems/next-greater-numerically-balanced-number/
// An integer x is numerically balanced if for every digit d in the number x, there are exactly d occurrences of that digit in x.
// Given an integer n, return the smallest numerically balanced number strictly greater than n.

// Example 1:
// Input: n = 1
// Output: 22
// Explanation:
// 22 is numerically balanced since:
// - The digit 2 occurs 2 times.
// It is also the smallest numerically balanced number strictly greater than 1.

// Example 2:
// Input: n = 1000
// Output: 1333
// Explanation:
// 1333 is numerically balanced since:
// - The digit 1 occurs 1 time.
// - The digit 3 occurs 3 times.
// It is also the smallest numerically balanced number strictly greater than 1000.
// Note that 1022 cannot be the answer because 0 appeared more than 0 times.

// Example 3:
// Input: n = 3000
// Output: 3133
// Explanation:
// 3133 is numerically balanced since:
// - The digit 1 occurs 1 time.
// - The digit 3 occurs 3 times.
// It is also the smallest numerically balanced number strictly greater than 3000.

// Constraints:
// 0 <= n <= 10^6

// https://leetcode.com/problems/next-greater-numerically-balanced-number/solutions/7296058/next-greater-numerically-balanced-number-most-efficient-java-c-python3-c-c-go-js/?envType=daily-question&envId=2025-10-24
// Use backtracking to generate all valid numerically balanced numbers.
// Maintain an array count[d] to track how many times each digit d has been used.
// Only add a digit d if it has been used fewer than d times.
// Stop recursion once the number exceeds a reasonable upper bound (e.g., 1224444), since all valid balanced numbers are smaller than this.
// During generation, if the current number is valid (each non-zero digit d appears exactly d times), add it to the list.
// After generating all numbers, sort them and return the smallest number that is strictly greater than n.
function nextBeautifulNumber(n: number): number {
  const list: number[] = []; // Array to store the generated numerically balanced numbers.

  // Helper function to check if a number is numerically balanced.
  const isBeautiful = (count: number[]): boolean => {
    for (let d = 1; d <= 7; d++) {
      // Iterate over the digits from 1 to 7.
      if (count[d] !== 0 && count[d] !== d) {
        // Check if the count of a digit is not zero and not equal to the digit itself.
        return false; // The number is not numerically balanced.
      }
    }
    return true; // The number is numerically balanced.
  };

  // Recursive helper function to generate all valid numerically balanced numbers.
  const generate = (num: number, count: number[]) => {
    if (num > 0 && isBeautiful(count)) {
      // Check if the current number is numerically balanced.
      list.push(num); // Add the number to the list.
    }
    if (num > 1224444) {
      // Stop recursion if the current number exceeds a predefined upper bound.
      return;
    }

    for (let d = 1; d <= 7; d++) {
      // Iterate over the digits from 1 to 7.
      if (count[d] < d) {
        // Check if the count of a digit is less than the digit itself.
        count[d]++; // Increment the count of the digit.
        generate(num * 10 + d, count); // Recursively call generate with the current number multiplied by 10 and the digit appended.
        count[d]--; // Decrement the count of the digit.
      }
    }
  };

  generate(0, new Array(10).fill(0)); // Start generating numbers with an empty number and an array filled with zeros.
  list.sort((a, b) => a - b); // Sort the list in ascending order.

  for (const num of list) {
    // Iterate over the sorted list.
    if (num > n) {
      // Check if the number is greater than n.
      return num; // Return the first number greater than n.
    }
  }

  return -1; // No number greater than n was found.
}
