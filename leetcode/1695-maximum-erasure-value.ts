// https://leetcode.com/problems/maximum-erasure-value
// You are given an array of positive integers nums and want to erase a subarray containing unique elements. The score you get by erasing the subarray is equal to the sum of its elements.
// Return the maximum score you can get by erasing exactly one subarray.
// An array b is called to be a subarray of a if it forms a contiguous subsequence of a, that is, if it is equal to a[l],a[l+1],...,a[r] for some (l,r).

// Example 1:
// Input: nums = [4,2,4,5,6]
// Output: 17
// Explanation: The optimal subarray here is [2,4,5,6].

// Example 2:
// Input: nums = [5,2,1,2,5,2,1,2,5]
// Output: 8
// Explanation: The optimal subarray here is [5,2,1] or [1,2,5].

function maximumUniqueSubarray(nums: number[]): number {
  const map = new Map<number, number>();
  let sum = 0;
  let max = 0;
  let left = 0;

  for (let i = 0; i < nums.length; i++) {
    map.set(nums[i], (map.get(nums[i]) || 0) + 1); // count freq
    sum += nums[i]; // add to sum

    // if not unique, move left pointer
    while (map.get(nums[i])! > 1) {
      map.set(nums[left], map.get(nums[left])! - 1);
      sum -= nums[left];
      left++;
    }
    max = Math.max(max, sum);
  }

  return max;
}

// https://leetcode.com/problems/maximum-erasure-value/solutions/4102082/two-pointers-with-hashset-solution-with-step-by-step-explanationtwo/?envType=daily-question&envId=2025-07-22
function maximumUniqueSubarray2(nums: number[]): number {
  // declare window HashSet
  const window = new Set<number>();
  // declare left pointer
  let left = 0;
  // declare max variable that will store result
  let max = 0;
  // declare count variable that will store current window sum
  let count = 0;
  // iterate over nums array:
  for (let right = 0; right < nums.length; right++) {
    // if number at right pointer are not unique to our window:
    while (window.has(nums[right])) {
      // we delete number on left pointer from set
      window.delete(nums[left]);
      // we subtract num from window sum
      count -= nums[left];
      // we increment left pointer
      left++;
    }
    // if number unique we add it to our window set
    window.add(nums[right]);
    // and add number to window sum
    count += nums[right];
    // check current sum and max and find bigger
    max = Math.max(max, count);
  }
  // return result
  return max;
}
