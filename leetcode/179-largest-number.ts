// https://leetcode.com/problems/largest-number
// Given a list of non-negative integers nums, arrange them such that they form the largest number and return it.
// Since the result may be very large, so you need to return a string instead of an integer.

// Example 1:
// Input: nums = [10,2]
// Output: "210"
// Example 2:
// Input: nums = [3,30,34,5,9]
// Output: "9534330"

// https://leetcode.com/problems/largest-number/solutions/5802117/cocaine-compare-lexi/
function largestNumber(nums: number[]): string {
  const numStrs = nums.map(String);

  numStrs.sort((a, b) => {
    const ab = a + b;
    const ba = b + a;

    return ab > ba ? -1 : ab < ba ? 1 : 0; // campare string
  });

  if (numStrs[0] === '0') return '0';
  return numStrs.join('');
}
