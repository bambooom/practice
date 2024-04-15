// https://leetcode.com/problems/sign-of-the-product-of-an-array/
// You are given an integer array nums. Let product be the product of all values in the array nums.

function arraySign(nums: number[]): number {
  const zero = nums.filter((i) => i === 0).length;
  const neg = nums.filter((i) => i < 0).length;
  return zero > 0 ? 0 : neg % 2 === 0 ? 1 : -1;
}

function arraySign2(nums: number[]): number {
  return nums.reduce((sign, cur) => sign * Math.sign(cur), 1);
}
