// https://leetcode.com/problems/minimum-operations-to-make-binary-array-elements-equal-to-one-i/
// You are given a binary array nums.
// You can do the following operation on the array any number of times (possibly zero):
// Choose any 3 consecutive elements from the array and flip all of them.
// Flipping an element means changing its value from 0 to 1, and from 1 to 0.
// Return the minimum number of operations required to make all elements in nums equal to 1. If it is impossible, return -1.

// Example 1:
// Input: nums = [0,1,1,1,0,0]
// Output: 3
// Explanation:
// We can do the following operations:
// Choose the elements at indices 0, 1 and 2. The resulting array is nums = [1,0,0,1,0,0].
// Choose the elements at indices 1, 2 and 3. The resulting array is nums = [1,1,1,0,0,0].
// Choose the elements at indices 3, 4 and 5. The resulting array is nums = [1,1,1,1,1,1].

// Example 2:
// Input: nums = [0,1,1,1]
// Output: -1
// Explanation:
// It is impossible to make all elements equal to 1.

function minOperations(nums: number[]): number {
  const n = nums.length;
  let flips = 0;

  for (let i = 0; i <= n - 3; i++) {
    if (nums[i] === 0) {
      for (let j = 0; j < 3; j++) {
        // bitwise XOR assignment operator
        // compare each bit of the two operands, if bits are same, the result is 0, if bits are different, result is 1
        // here used to flip the value of nums[i + j], change 0 to 1 and 1 to 0
        nums[i + j] ^= 1;
      }
      flips++;
    }
  }

  for (const num of nums) {
    if (num === 0) return -1;
  }
  return flips;
}

// sliding window
function minOperations2(nums: number[]): number {
  let count = 0;
  const k = 3;
  let right = 0;
  const high = nums.length;

  while (right < high - k + 1) {
    if (nums[right] == 0) {
      count++;
      nums[right] = 1;
      nums[right + 1] = nums[right + 1] == 0 ? 1 : 0;
      nums[right + 2] = nums[right + 2] == 0 ? 1 : 0;
    } else {
      right++;
    }
  }

  if (nums[high - 1] == 0 || nums[high - 2] == 0 || nums[high - 3] == 0) {
    return -1;
  }

  return count;
}

// greedy approach, when we see a 0, flip the next 3 elements
function minOperations3(nums: number[]): number {
  const length = nums.length - 3;
  let result = 0;

  for (let i = 0; i <= length; i++) {
    if (nums[i] === 1) continue;
    result++;
    nums[i] = 1;
    nums[i + 1] = +!nums[i + 1];
    nums[i + 2] = +!nums[i + 2];
  }

  return nums[length] && nums[length + 1] && nums[length + 2] ? result : -1;
}
