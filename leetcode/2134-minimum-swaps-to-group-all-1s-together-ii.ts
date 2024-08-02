// https://leetcode.com/problems/minimum-swaps-to-group-all-1s-together-ii
// A swap is defined as taking two distinct positions in an array and swapping the values in them.
// A circular array is defined as an array where we consider the first element and the last element to be adjacent.
// Given a binary circular array nums, return the minimum number of swaps required to group all 1's present in the array together at any location.

// Example 1:

// Input: nums = [0,1,0,1,1,0,0]
// Output: 1
// Explanation: Here are a few of the ways to group all the 1's together:
// [0,0,1,1,1,0,0] using 1 swap.
// [0,1,1,1,0,0,0] using 1 swap.
// [1,1,0,0,0,0,1] using 2 swaps (using the circular property of the array).
// There is no way to group all 1's together with 0 swaps.
// Thus, the minimum number of swaps required is 1.
// Example 2:

// Input: nums = [0,1,1,1,0,0,1,1,0]
// Output: 2
// Explanation: Here are a few of the ways to group all the 1's together:
// [1,1,1,0,0,0,0,1,1] using 2 swaps (using the circular property of the array).
// [1,1,1,1,1,0,0,0,0] using 2 swaps.
// There is no way to group all 1's together with 0 or 1 swaps.
// Thus, the minimum number of swaps required is 2.
// Example 3:

// Input: nums = [1,1,0,0,1]
// Output: 0
// Explanation: All the 1's are already grouped together due to the circular property of the array.
// Thus, the minimum number of swaps required is 0.

// # slideing window

// https://leetcode.com/problems/minimum-swaps-to-group-all-1s-together-ii/solutions/4121623/java-python-typescript-sliding-window-technique-time-complexity-o-n-space-complexity-o-1/?envType=daily-question&envId=2024-08-02
function minSwaps(nums: number[]): number {
  // count the total number of 1s, which help to determine the size of window
  let totalOnes = 0;
  for (const one of nums) {
    if (one === 1) {
      totalOnes++;
    }
  }

  const n = nums.length;
  let startIndex = 0;
  let endIndex = 0;
  let currentWindowOnes = 0; // count 1s in current window
  let swaps = n;

  while (endIndex < 2 * n) {
    // 2n -> consider circular property of the array
    if (endIndex < totalOnes) {
      // first window of size `totalOnes`
      // 增量到 window size 达到 `totalOnes`
      if (nums[endIndex] === 1) {
        currentWindowOnes++;
      }

      endIndex++;
      swaps = totalOnes - currentWindowOnes; // 在这个window 里有多少非1 就是需要的 swaps count
    } else {
      // window size reach to`totalOnes`, then we start to move the window

      // 左侧 startIndex 为1，就减小 currentWindowOnes
      if (nums[startIndex % n] === 1) {
        currentWindowOnes--;
      }
      // 右侧 startIndex 为1，就增加 currentWindowOnes
      if (nums[endIndex % n] === 1) {
        currentWindowOnes++;
      }

      // 移动窗口
      startIndex++;
      endIndex++;

      swaps = Math.min(swaps, totalOnes - currentWindowOnes);
    }
  }

  return swaps;
}
