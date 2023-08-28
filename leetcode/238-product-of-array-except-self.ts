// https://leetcode.com/problems/product-of-array-except-self/
// #prefix-sum
// Intuition: For every given index, iii, we will make use of the product of all the numbers to the left of it and multiply it by the product of all the numbers to the right.
// Algorithm: (time O(N), space O(N))
// - Initialize two empty arrays, L and R where for a given index i, L[i] would contain the product of all the numbers to the left of i and R[i] would contain the product of all the numbers to the right of i
// - need two different loops to fill in values for the two arrays.
//    For the array L, L[0] would be 1 since there are no elements to the left of the first element.
//    For the rest of the elements, we simply use L[i] = L[i−1]*nums[i−1]
//    For array R, do reverse, R[RLen - 1] = 1, R[i]=R[i+1]*nums[i+1]
// - iterate over array to get L[i]*R[i]

// Improved Algo: (time O(N), space O(1)):
// - construct answer[] as L array
// - don't explicitly build the R array, but keep track of running product of
//    elements of right to R = R * nums[i], and updating answer[i] by R
function productExceptSelf(nums: number[]): number[] {
  const len = nums.length;
  const answer: number[] = [1];
  for (let i = 1; i < len; i++) {
    answer[i] = nums[i - 1] * answer[i - 1]; // handle left part
  }
  let R = 1;
  for (let i = len - 1; i > -1; i--) {
    // reverse for right
    answer[i] = answer[i] * R;
    R *= nums[i];
  }

  return answer;
}

// not improved solution
function productExceptSelf2(nums: number[]): number[] {
  // answer[i] = L[i] * R[i]
  const L: number[] = [1];
  const R: number[] = [1];
  const ans: number[] = [];
  for (let i = 1; i < nums.length; i++) {
    L[i] = L[i - 1] * nums[i - 1];
  }
  for (let i = nums.length - 2; i >= 0; i--) {
    R.unshift(R[0] * nums[i + 1]);
  }
  for (let i = 0; i < nums.length; i++) {
    ans[i] = L[i] * R[i];
  }

  return ans;
}
