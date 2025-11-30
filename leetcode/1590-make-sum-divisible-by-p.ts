// https://leetcode.com/problems/make-sum-divisible-by-p
// Given an array of positive integers nums, remove the smallest subarray (possibly empty) such that the sum of the remaining elements is divisible by p. It is not allowed to remove the whole array.
// Return the length of the smallest subarray that you need to remove, or -1 if it's impossible.
// A subarray is defined as a contiguous block of elements in the array.

// Example 1:
// Input: nums = [3,1,4,2], p = 6
// Output: 1
// Explanation: The sum of the elements in nums is 10, which is not divisible by 6. We can remove the subarray [4], and the sum of the remaining elements is 6, which is divisible by 6.
// Example 2:
// Input: nums = [6,3,5,2], p = 9
// Output: 2
// Explanation: We cannot remove a single element to get a sum divisible by 9. The best way is to remove the subarray [5,2], leaving us with [6,3] with sum 9.
// Example 3:
// Input: nums = [1,2,3], p = 3
// Output: 0
// Explanation: Here the sum is 6. which is already divisible by 3. Thus we do not need to remove anything.

function minSubarray(nums: number[], p: number): number {
  // Calculate the target remainder by reducing the nums array and taking the modulo p of the sum of its elements
  const targetRemainder = nums.reduce((a, b) => (a + b) % p, 0);

  // If the target remainder is 0, the sum of the elements is already divisible by p, so return 0
  if (targetRemainder === 0) {
    return 0;
  }

  // Initialize a map to store the remainders of the prefix sums and their corresponding indices
  const map = new Map<number, number>();

  let curRemainder = 0;
  let minLen = Infinity;
  let curLen = 0;

  map.set(0, -1);

  for (let i = 0; i < nums.length; i++) {
    // Update the current remainder by adding the current element and taking the modulo p
    curRemainder = (curRemainder + nums[i]) % p;

    // Calculate the target remainder by subtracting the targetRemainder from the current remainder and taking the modulo p
    const target = (curRemainder - targetRemainder + p) % p;

    // If the target remainder exists in the map, calculate the length of the subarray and update the minimum length if necessary
    if (map.has(target)) {
      curLen = i - map.get(target)!;
      minLen = Math.min(curLen, minLen);
    }

    // Update the map with the current remainder and its index
    map.set(curRemainder, i);
  }

  // Return the minimum length of the subarray, or -1 if no subarray needs to be removed
  return minLen === Infinity || minLen === nums.length ? -1 : minLen;
}

function minSubarray2(nums: number[], p: number): number {
  let total = nums.reduce((a, b) => a + b, 0);
  let need = total % p;
  if (need === 0) return 0;

  let mp = new Map<number, number>();
  mp.set(0, -1);

  let prefix = 0;
  let res = nums.length;

  for (let i = 0; i < nums.length; i++) {
    prefix = (prefix + nums[i]) % p;
    let target = (prefix - need + p) % p;
    if (mp.has(target)) res = Math.min(res, i - mp.get(target)!);
    mp.set(prefix, i);
  }

  return res === nums.length ? -1 : res;
}
