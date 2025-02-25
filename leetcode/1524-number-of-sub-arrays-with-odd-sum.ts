// https://leetcode.com/problems/number-of-sub-arrays-with-odd-sum/description/
// Given an array of integers arr, return the number of subarrays with an odd sum.
// Since the answer can be very large, return it modulo 10^9 + 7.

// Example 1:

// Input: arr = [1,3,5]
// Output: 4
// Explanation: All subarrays are [[1],[1,3],[1,3,5],[3],[3,5],[5]]
// All sub-arrays sum are [1,4,9,3,8,5].
// Odd sums are [1,9,3,5] so the answer is 4.
// Example 2:

// Input: arr = [2,4,6]
// Output: 0
// Explanation: All subarrays are [[2],[2,4],[2,4,6],[4],[4,6],[6]]
// All sub-arrays sum are [2,6,12,4,10,6].
// All sub-arrays have even sum and the answer is 0.
// Example 3:

// Input: arr = [1,2,3,4,5,6,7]
// Output: 16

function numOfSubarrays(arr: number[]): number {
  let even = 1; // keep track of the number of subarrays with even sum
  let odd = 0; // keep track of the number of subarrays with odd sum
  let ans = 0;
  let prefix = 0; // keep track of the cumulative sum of the array elements

  const mod = 10 ** 9 + 7;

  for (const num of arr) {
    prefix += num;
    if (prefix & 1) {
      // check prefix sum is odd by using bitwise AND operator
      ans += even;
      odd++;
    } else {
      ans += odd;
      even++;
    }
  }

  return ans % mod;
}

// https://leetcode.com/problems/number-of-sub-arrays-with-odd-sum/solutions/6464405/easy-to-understand-solution/
function numOfSubarrays2(arr: number[]): number {
  const MOD = 10 ** 9 + 7;
  let ans = 0;
  let odd = 0;
  let even = 0;
  for (const e of arr) {
    const isOdd = e % 2 === 1;
    if (isOdd) {
      const temp = odd;
      odd = even + 1;
      even = temp;
    } else {
      even += 1;
    }
    ans = (ans + odd) % MOD;
  }
  return ans;
}
