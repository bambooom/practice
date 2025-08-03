// https://leetcode.com/problems/maximum-fruits-harvested-after-at-most-k-steps
// Fruits are available at some positions on an infinite x-axis. You are given a 2D integer array fruits where fruits[i] = [positioni, amounti] depicts amounti fruits at the position positioni. fruits is already sorted by positioni in ascending order, and each positioni is unique.
// You are also given an integer startPos and an integer k. Initially, you are at the position startPos. From any position, you can either walk to the left or right. It takes one step to move one unit on the x-axis, and you can walk at most k steps in total. For every position you reach, you harvest all the fruits at that position, and the fruits will disappear from that position.
// Return the maximum total number of fruits you can harvest.

// Example 1:
// Input: fruits = [[2,8],[6,3],[8,6]], startPos = 5, k = 4
// Output: 9
// Explanation:
// The optimal way is to:
// - Move right to position 6 and harvest 3 fruits
// - Move right to position 8 and harvest 6 fruits
// You moved 3 steps and harvested 3 + 6 = 9 fruits in total.

// Example 2:
// Input: fruits = [[0,9],[4,1],[5,7],[6,2],[7,4],[10,9]], startPos = 5, k = 4
// Output: 14
// Explanation:
// You can move at most k = 4 steps, so you cannot reach position 0 nor 10.
// The optimal way is to:
// - Harvest the 7 fruits at the starting position 5
// - Move left to position 4 and harvest 1 fruit
// - Move right to position 6 and harvest 2 fruits
// - Move right to position 7 and harvest 4 fruits
// You moved 1 + 3 = 4 steps and harvested 7 + 1 + 2 + 4 = 14 fruits in total.

// Example 3:
// Input: fruits = [[0,3],[6,4],[8,5]], startPos = 3, k = 2
// Output: 0
// Explanation:
// You can move at most k = 2 steps and cannot reach any position with fruits.

// https://leetcode.com/problems/maximum-fruits-harvested-after-at-most-k-steps/solutions/7038436/2106-maximum-fruits-harvested-after-at-most-k-steps/?envType=daily-question&envId=2025-08-03
function maxTotalFruits(
  fruits: number[][],
  startPos: number,
  k: number,
): number {
  const n = fruits.length; // total number of fruits
  const positions = fruits.map((f) => f[0]); // // Extract the positions of the fruits into a separate array
  const prefixSum: number[] = new Array(n + 1).fill(0); // Initialize an array to store the cumulative sum of fruits at each position

  // Calculate the cumulative sum of fruits
  for (let i = 0; i < n; i++) {
    prefixSum[i + 1] = prefixSum[i] + fruits[i][1];
  }

  // Helper function to calculate the sum of fruits between two positions
  const getSum = (l: number, r: number): number => {
    return prefixSum[r + 1] - prefixSum[l];
  };

  // Helper function to find the first position that is greater than or equal to the target
  const lowerBound = (target: number): number => {
    let lo = 0;
    let hi = n;
    while (lo < hi) {
      const mid = Math.floor((lo + hi) / 2);
      if (positions[mid] >= target) {
        hi = mid;
      } else {
        lo = mid + 1;
      }
    }
    return lo;
  };

  // Helper function to find the first position that is greater than the target
  const upperBound = (target: number): number => {
    let lo = 0;
    let hi = n;
    while (lo < hi) {
      const mid = Math.floor((lo + hi) / 2);
      if (positions[mid] > target) {
        lo = mid + 1;
      } else {
        hi = mid;
      }
    }
    return lo;
  };

  let res = 0;

  // Iterate through all possible combinations of steps
  for (let x = 0; x <= k; x++) {
    // left then right
    // Calculate the range of positions that can be reached by moving x steps to the left and k-2x steps to the right
    let left = startPos - x;
    let right = startPos + Math.max(k - 2 * x, 0);
    let l = lowerBound(left); // Find the first position that is greater than or equal to the left boundary
    let r = upperBound(right) - 1; // Find the last position that is less than or equal to the right boundary

    // Calculate the sum of fruits in this range and update the maximum total number of fruits
    if (l <= r) {
      res = Math.max(res, getSum(l, r));
    }

    // right then left
    // Calculate the range of positions that can be reached by moving x steps to the right and k-2x steps to the left
    right = startPos + x;
    left = startPos - Math.max(k - 2 * x, 0);
    l = lowerBound(left); // Find the first position that is greater than or equal to the left boundary
    r = upperBound(right) - 1; // Find the last position that is less than or equal to the right boundary

    // Calculate the sum of fruits in this range and update the maximum total number of fruits
    if (l <= r) {
      res = Math.max(res, getSum(l, r));
    }
  }

  return res;
}
