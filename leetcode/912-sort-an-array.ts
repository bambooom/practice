// https://leetcode.com/problems/sort-an-array
// Given an array of integers nums, sort the array in ascending order and return it.
// You must solve the problem without using any built-in functions in O(nlog(n)) time complexity and with the smallest space complexity possible.

// merge sort
const mergeSort = (arr: number[], left: number, right: number) => {
  if (left < right) {
    const mid = Math.floor((left + right) / 2);
    mergeSort(arr, left, mid);
    mergeSort(arr, mid + 1, right);
    mergeA(arr, left, mid, right);
  }
};
const mergeA = (arr: number[], left: number, mid: number, right: number) => {
  const leftArr: number[] = [];
  const rightArr: number[] = [];
  const M = mid - left + 1;
  const N = right - mid;

  for (let i = 0; i < M; i++) {
    leftArr.push(arr[left + i]);
  }
  for (let i = 0; i < N; i++) {
    rightArr.push(arr[mid + 1 + i]);
  }

  let i = 0;
  let j = 0;
  let k = left;

  while (i < M && j < N) {
    if (leftArr[i] <= rightArr[j]) {
      arr[k++] = leftArr[i++];
    } else {
      arr[k++] = rightArr[j++];
    }
  }

  while (i < M) {
    arr[k++] = leftArr[i++];
  }

  while (j < N) {
    arr[k++] = rightArr[j++];
  }
};
function sortArray(nums: number[]): number[] {
  mergeSort(nums, 0, nums.length - 1);
  return nums;
}

// insertion sort, time limit exceeded
function sortArray2(nums: number[]): number[] {
  for (let i = 1; i <= nums.length; i++) {
    let j = i;
    while (j > 0 && nums[j] < nums[j - 1]) {
      const tmp = nums[j - 1];
      nums[j - 1] = nums[j];
      nums[j] = tmp;
      j--;
    }
  }

  return nums;
}
