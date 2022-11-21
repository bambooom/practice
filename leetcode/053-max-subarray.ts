// bad solution, nest loop
function maxSubArray(nums: number[]): number {
  let sum = 0,
    start = 0,
    end = 0;
  for (let i = 0; i < nums.length; i++) {
    let subsum = nums[i];
    for (let j = i + 1; j < nums.length; j++) {
      subsum += nums[j];
      if (subsum > sum) {
        start = i;
        end = j;
        sum = subsum;
      }
    }
  }
  console.log(nums.slice(start, end + 1));
  return sum;
}

// better solution,
const maxSubArray2 = (nums: number[]): number => {
  let prev = 0; // no prev when we start so make it 0
  let max = -Infinity; // no max when we start so anything will be the new max

  for (let i = 0; i < nums.length; i++) {
    // loop through in vanilla way starting at 0 and going to end by 1
    const curr = nums[i]; // set our current value as a variable to make it easy to understand
    prev = Math.max(prev + curr, curr); // basically poses the question: build or start over?
    max = Math.max(prev, max); // basically poses the question: update max or not?
  }
  return max;
};

console.log(maxSubArray2([-2, 1, -3, 4, -1, 2, 1, -5, 4]));
// expected: 6, subarray is [4,-1,2,1]
