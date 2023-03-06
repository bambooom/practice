// https://leetcode.com/problems/majority-element/
// Given an array nums of size n, return the majority element.
// The majority element is the element that appears more than ⌊n / 2⌋ times. You may assume that the majority element always exists in the array.

function majorityElement(nums: number[]): number {
  const hash: { [key: number]: number } = {};
  const len = nums.length;
  for (let i = 0; i < len; i++) {
    const n = nums[i];
    if (hash[n]) {
      hash[n]++;
    } else {
      hash[n] = 1;
    }

    if (hash[n] > len / 2) {
      return n;
    }
  }

  return NaN;
}
