// https://leetcode.com/problems/minimum-number-of-increments-on-subarrays-to-form-a-target-array/
// You are given an integer array target. You have an integer array initial of the same size as target with all elements initially zeros.
// In one operation you can choose any subarray from initial and increment each value by one.
// Return the minimum number of operations to form a target array from initial.
// The test cases are generated so that the answer fits in a 32-bit integer.

// Example 1:
// Input: target = [1,2,3,2,1]
// Output: 3
// Explanation: We need at least 3 operations to form the target array from the initial array.
// [0,0,0,0,0] increment 1 from index 0 to 4 (inclusive).
// [1,1,1,1,1] increment 1 from index 1 to 3 (inclusive).
// [1,2,2,2,1] increment 1 at index 2.
// [1,2,3,2,1] target array is formed.

// Example 2:
// Input: target = [3,1,1,2]
// Output: 4
// Explanation: [0,0,0,0] -> [1,1,1,1] -> [1,1,1,2] -> [2,1,1,2] -> [3,1,1,2]

// Example 3:
// Input: target = [3,1,5,4,2]
// Output: 7
// Explanation: [0,0,0,0,0] -> [1,1,1,1,1] -> [2,1,1,1,1] -> [3,1,1,1,1] -> [3,1,2,2,2] -> [3,1,3,3,2] -> [3,1,4,4,2] -> [3,1,5,4,2].

// Constraints:
// 1 <= target.length <= 10^5
// 1 <= target[i] <= 10^5

// https://leetcode.com/problems/minimum-number-of-increments-on-subarrays-to-form-a-target-array/solutions/4272701/simple-solutionintuition-in-typescript-p-udps/?envType=daily-question&envId=2025-10-30
// The key to solve this problem is to think about neighbours and how they're related to each other.
// We should move only in right direction and at each step we interested in decrementing at most target[i]- s as we can.
// # Example
// target = [3,1,5,4,2]

// # Take a look at first two neighbours.
// a = 3
// b = 1

// # How much 'decrements' we need to make them 0-s?
// # max(a, b) => 3

// # Okay. Let's proceed to the next pair:

// a = 1
// b = 5

// # What about this ones?
// # If you repeat the same process before, it WON'T work
// # since we've already DECREMENTED some points from 3, and 1,
// # respectively. But we have a 'diff' as b > a and b - a = 4
// # Will it help us somehow?

// # At this step try to 'glue' first integer with this pair
// # and figure out the process of decrementing

// seq = [3, 1, 5] => [(2), (0), (4)] => [(1), 0, 4] => [(0), 0, 4] =>
// => [0, 0, (3)] => [0, 0, (2)] => [0, 0, (1)] => [0, 0, (0)]

// # For the first step we make 3 decrements, and at the second step 4.
// # diff[0] + diff[1] = 7

// # Conclusion: at each step we need to take care about cur. maximum.
// # If it's higher than the previous one, increment count of steps as
// # max - min, otherwise continue to move forward.
function minNumberOperations(target: number[]): number {
  let ans = target[0];
  let curMax = target[0];

  for (let i = 1; i < target.length; i++) {
    if (curMax < target[i]) {
      ans += target[i] - curMax;
    }

    curMax = target[i];
  }

  return ans;
}

// Process each subsequent element:
// If target[i] > target[i-1]: We need additional operations to build from height target[i-1] to target[i]
// If target[i] <= target[i-1]: We can reuse the operations that already covered the previous taller sections

// Total operations = target[0] + sum of all positive differences
// For each position i: add max(0, target[i] - target[i-1])
