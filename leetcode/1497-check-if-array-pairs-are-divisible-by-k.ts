// https://leetcode.com/problems/check-if-array-pairs-are-divisible-by-k

// Given an array of integers arr of even length n and an integer k.
// We want to divide the array into exactly n / 2 pairs such that the sum of each pair is divisible by k.
// Return true If you can find a way to do that or false otherwise.

// Example 1:
// Input: arr = [1,2,3,4,5,10,6,7,8,9], k = 5
// Output: true
// Explanation: Pairs are (1,9),(2,8),(3,7),(4,6) and (5,10).
// Example 2:
// Input: arr = [1,2,3,4,5,6], k = 7
// Output: true
// Explanation: Pairs are (1,6),(2,5) and(3,4).
// Example 3:
// Input: arr = [1,2,3,4,5,6], k = 10
// Output: false
// Explanation: You can try all possible pairs to see that there is no way to divide arr into 3 pairs each with sum divisible by 10.

// think in terms of remainders and sums of remainders, not by sum of elements
// for each element, we calculate the remainder and count the frequency of that remainder
function canArrange(arr: number[], k: number): boolean {
  const freq: number[] = new Array(k).fill(0);

  // count freq of remainders
  for (const num of arr) {
    // handle negative numbers correctly
    const remainder = ((num % k) + k) % k;
    freq[remainder]++;
  }

  // checl if count of elements with remainders 0 is even
  if (freq[0] % 2 !== 0) return false;

  // check if counts of complementary remainders are equal
  for (let i = 1; i <= k / 2; i++) {
    if (freq[i] !== freq[k - i]) {
      return false;
    }
  }

  return true;
}
