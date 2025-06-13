// https://leetcode.com/problems/minimize-the-maximum-difference-of-pairs
// You are given a 0-indexed integer array nums and an integer p. Find p pairs of indices of nums such that the maximum difference amongst all the pairs is minimized. Also, ensure no index appears more than once amongst the p pairs.
// Note that for a pair of elements at the index i and j, the difference of this pair is |nums[i] - nums[j]|, where |x| represents the absolute value of x.
// Return the minimum maximum difference among all p pairs. We define the maximum of an empty set to be zero.

// Example 1:
// Input: nums = [10,1,2,7,1,3], p = 2
// Output: 1
// Explanation: The first pair is formed from the indices 1 and 4, and the second pair is formed from the indices 2 and 5.
// The maximum difference is max(|nums[1] - nums[4]|, |nums[2] - nums[5]|) = max(0, 1) = 1. Therefore, we return 1.

// Example 2:
// Input: nums = [4,2,1,2], p = 1
// Output: 0
// Explanation: Let the indices 1 and 3 form a pair. The difference of that pair is |2 - 2| = 0, which is the minimum we can attain.

// https://leetcode.com/problems/minimize-the-maximum-difference-of-pairs/solutions/3884320/using-binary-search-typescript-solution-100-beats-all/?envType=daily-question&envId=2025-06-13
// binary search
function minimizeMax(nums: number[], p: number): number {
  if (p === 0) return 0;

  const sortedArray: number[] = nums.sort((n1, n2) => n1 - n2);

  const checkValue = (value: number): boolean => {
    let i = 0;
    let count = 0;

    while (i < nums.length - 1) {
      if (Math.floor(sortedArray[i + 1] - sortedArray[i]) <= value) {
        count++;
        i += 2;
      } else {
        i++;
      }
      if (count === p) return true;
    }

    return false;
  };

  let left = 0;
  let right = 10 ** 9 - 1;
  let ans = 10 ** 9;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (checkValue(mid)) {
      right = mid - 1;
      ans = mid;
    } else {
      left = mid + 1;
    }
  }

  return ans;
}
