// https://leetcode.com/problems/range-sum-of-sorted-subarray-sums
// You are given the array nums consisting of n positive integers. You computed the sum of all non-empty continuous subarrays from the array and then sorted them in non-decreasing order, creating a new array of n * (n + 1) / 2 numbers.
// Return the sum of the numbers from index left to index right (indexed from 1), inclusive, in the new array. Since the answer can be a huge number return it modulo 10^9 + 7.

// Example 1:
// Input: nums = [1,2,3,4], n = 4, left = 1, right = 5
// Output: 13
// Explanation: All subarray sums are 1, 3, 6, 10, 2, 5, 9, 3, 7, 4. After sorting them in non-decreasing order we have the new array [1, 2, 3, 3, 4, 5, 6, 7, 9, 10]. The sum of the numbers from index le = 1 to ri = 5 is 1 + 2 + 3 + 3 + 4 = 13.
// Example 2:
// Input: nums = [1,2,3,4], n = 4, left = 3, right = 4
// Output: 6
// Explanation: The given array is the same as example 1. We have the new array [1, 2, 3, 3, 4, 5, 6, 7, 9, 10]. The sum of the numbers from index le = 3 to ri = 4 is 3 + 3 = 6.

// brutal force: calculate all subarray sum and sort them
function rangeSum(
  nums: number[],
  n: number,
  left: number,
  right: number,
): number {
  const MOD = 1e9 + 7;
  const subSum = [];
  for (let i = 0; i < n; i++) {
    let sum = 0;
    for (let j = i; j < n; j++) {
      sum += nums[j];
      subSum.push(sum);
    }
  }
  subSum.sort((a, b) => a - b);
  let sum = 0;
  for (let i = left - 1; i < right; i++) {
    sum = (sum + subSum[i]) % MOD;
  }
  return sum;
}

// better solution
// https://leetcode.com/problems/range-sum-of-sorted-subarray-sums/solutions/3153342/javascript-beats-100-binary-search-o-nlogn/?envType=daily-question&envId=2024-08-04
// binary search, no need to calculate all subarray sum
// Here is the idea:
// If we have a subarray a0, a1, a2, a3 and we know the sum a0 + a1 + a2 + a3 should be included in the answer, then all the other subarrays should be included in the answer such as a0 + a1 + a2 or a0 + a1 and so on. The reason is we must sort the sum of the subarray in the non-decreasing order. As the sum of a0 + a1 + a2 + a3 must be larger than a0 + a1 + a2, if a0 + a1 + a2 + a3 is included, then a0 + a1 + a2 must be included.

// If we know this, do we need to calculate the sum of the all the subarrays of a0 + a1 + a2 + a3? The answer is no.
// a0 + a1 + a2 + a3
// a1 + a2 + a3
// a2 + a3
// a3
// So the sum is 4 * a3 + 3 * a2 + 2 * a1 + a0. This is the beauty. We do not need to calculate the sum of all the subarrays. We can use a formula to calculate which will save a lot of time.
//
function rangeSum2(
  nums: number[],
  n: number,
  left: number,
  right: number,
): number {
  const MOD = 1e9 + 7;

  // build prefix sum
  // 前缀和数组中的每个元素表示原数组从开始到该位置的元素和
  const prefix: number[] = nums.reduce((acc, curr) => {
    acc.push((acc[acc.length - 1] || 0) + curr);
    return acc;
  }, [] as number[]);

  // 计算从索引i到j的子数组和
  const subArraySum = (i: number, j: number): number => {
    let sum = 0;
    let windowLen = j - i + 1;
    while (windowLen > 0) {
      sum += nums[j] * windowLen;
      windowLen--;
      j--;
    }
    return sum;
  };

  /**
   * 计算所有和小于等于给定和的子数组的数量
   * 使用二分查找优化时间复杂度
   */
  const countUnderSum = (
    sum: number,
    cb?: (left: number, right: number) => void,
  ): number => {
    let left = 0;
    let count = 0;
    let right = 0;

    while (right < n) {
      let wholeSubSum = prefix[right] - (left === 0 ? 0 : prefix[left - 1]);
      if (wholeSubSum <= sum) {
        count += right - left + 1;
        cb?.(left, right);
      } else {
        while (wholeSubSum > sum && left <= right) {
          wholeSubSum -= nums[left];
          left++;
        }
        count += right - left + 1;
        cb?.(left, right);
      }
      right++;
    }

    return count;
  };

  /**
   * 二分查找满足特定计数的最小和
   * 这个函数找到一个最小的和,使得小于等于这个和的子数组数量恰好等于给定的count
   */
  const findLowestSumForCount = (count: number): number => {
    let low = 0,
      high = prefix[prefix.length - 1];
    while (low < high) {
      const mid = Math.floor((low + high) / 2);
      if (countUnderSum(mid) < count) {
        low = mid + 1;
      } else {
        high = mid;
      }
    }

    return low;
  };

  /**
   * 计算给定计数对应的所有子数组和的总和
   * 这个函数是解决问题的核心,它计算了前count个最小子数组和的总和
   */
  const sumForCount = (count: number): number => {
    const lowSum = findLowestSumForCount(count);
    let sum = 0;

    countUnderSum(lowSum, (i, j) => {
      sum += subArraySum(i, j);
    });

    // 调整sum,去掉多余的部分
    return sum - (countUnderSum(lowSum) - count) * lowSum;
  };

  // 计算从第left小到第right小的子数组和的总和,并对结果取模
  return (sumForCount(right) - sumForCount(left - 1)) % MOD;
}
