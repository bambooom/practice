// Two Sum II - Input Array Is Sorted
// Input: numbers = [2,7,11,15], target = 9
// Output: [1,2]
// Explanation: The sum of 2 and 7 is 9. Therefore, index1 = 1, index2 = 2. We return [1, 2].
// must use only constant extra space

// use two pointer:
// We use two indices, initially pointing to the first and the last element, respectively.
// Compare the sum of these two elements with target.
// If the sum is equal to target, we found the exactly only solution.
// If it is less than target, we increase the smaller index by one.
// If it is greater than target, we decrease the larger index by one.
// Move the indices and repeat the comparison until the solution is found.
function twoSum(numbers: number[], target: number): number[] {
  if (!numbers || numbers.length <= 1) return [];
  let left = 0;
  let right = numbers.length - 1;
  while (left < right) {
    if (target === numbers[left] + numbers[right]) {
      return [left, right];
    } else if (target < numbers[left] + numbers[right]) {
      right--;
    } else {
      left++;
    }
  }
  return left !== right ? [left, right] : [];
}

// console.log(twoSum([2, 7, 11, 15], 9));
console.log(
  twoSum(
    [
      -1, -1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1,
    ],
    -2,
  ),
);
