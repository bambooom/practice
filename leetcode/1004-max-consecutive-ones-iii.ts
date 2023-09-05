// https://leetcode.com/problems/max-consecutive-ones-iii/
// #Binary-Search #Sliding-Window #Prefix-Sum

// Given a binary array nums and an integer k, return the maximum number of consecutive 1's in the array if you can flip at most k 0's.

// We keep expanding the window by moving the right pointer.
// When the window has reached the limit of 0's allowed, we contract (if possible) and save the longest window till now.
function longestOnes(nums: number[], k: number): number {
  let left = 0;
  let right = 0;
  let flipped = 0;

  for (; right < nums.length; right++) {
    if (nums[right] === 0) {
      flipped++;
    }
    if (flipped > k) {
      if (nums[left] === 0) flipped--;
      left++;
    }
  }

  return right - left;
}

console.log(longestOnes([1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0], 2)); // 6

function longestOnes2(nums: number[], k: number): number {
  let res = Number.MIN_VALUE,
    i = 0,
    j = 0,
    countZero = 0;

  while (j < nums.length) {
    if (nums[j] === 0) {
      //We found 0 then store the count
      countZero++;
    }
    if (countZero <= k) {
      res = Math.max(res, j - i + 1);
    } else if (countZero > k) {
      if (nums[i] === 0) {
        countZero--;
      }
      i++;
    }
    j++;
  }
  return res;
}
