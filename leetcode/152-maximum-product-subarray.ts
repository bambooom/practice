// https://leetcode.com/problems/maximum-product-subarray/
// Given an integer array nums, find a subarray that has the largest product, and return the product.
// #dynamic-programming

// https://leetcode.com/problems/maximum-product-subarray/solutions/416395/javascript-solution-w-explanation/
function maxProduct(nums: number[]): number {
  let prevMax = nums[0];
  let prevMin = nums[0];
  let result = nums[0];
  for (let i = 1; i < nums.length; i++) {
    // given the new number, the new maximun can have 3 conditions
    // 1. number(+) * prevMax(+) is the largest
    // 2. number(+) it self is the largest
    // 3. number(-) * prevMin(-) is the largest
    const curMax = Math.max(nums[i] * prevMax, nums[i], nums[i] * prevMin);

    const curMin = Math.min(nums[i] * prevMin, nums[i], nums[i] * prevMax);

    // updating the prevMax & prevMin, these two may swap locations
    prevMax = curMax;
    prevMin = curMin;

    result = Math.max(curMax, result);
  }
  return result;
}

// https://leetcode.com/problems/maximum-product-subarray/solutions/1609300/how-to-approach-product-sum-of-subarray-problems/
function maxProduct2(nums: number[]): number {
  if (nums.length == 1) {
    return nums[0];
  }
  // 1 is a number "neutral" to multiplication
  let firstNegative = 1; // No negatives yet
  let curPrefix = 1; // Empty yet
  let maxProduct = 0; // In case we found 0

  for (let i = 0; i < nums.length; i++) {
    curPrefix *= nums[i];
    maxProduct = Math.max(curPrefix, maxProduct);

    if (curPrefix < 0) {
      // divide to the first negative
      maxProduct = Math.max(curPrefix / firstNegative, maxProduct);
      // set the first negative product, if it wasn't set yet
      firstNegative = firstNegative == 1 ? curPrefix : firstNegative;
    } else if (curPrefix == 0) {
      // start all over again
      curPrefix = 1;
      firstNegative = 1;
    }
  }
  return maxProduct;
}

// https://leetcode.com/problems/maximum-product-subarray/solutions/1598311/javascript-solution-using-dynamic-programming-in-o-n-time-w-explanation/
function maxProduct3(nums: number[]): number {
  let res = Math.max(...nums),
    currMin = 1,
    currMax = 1,
    prevMax = 1;

  for (const num of nums) {
    prevMax = currMax * num;
    currMax = Math.max(prevMax, currMin * num, num);
    currMin = Math.min(prevMax, currMin * num, num);

    res = Math.max(res, currMax);
  }
  return res;
}
