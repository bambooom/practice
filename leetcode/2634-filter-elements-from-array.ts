// https://leetcode.com/problems/filter-elements-from-array/

function filter(arr: number[], fn: (n: number, i: number) => any): number[] {
  const filteredArr: number[] = [];
  for (let i = 0; i < arr.length; i++) {
    const el = fn(arr[i], i);
    if (el) filteredArr.push(arr[i]);
  }
  return filteredArr;
}

// Pushing elements onto an array can be a slow operation.
// This is because the array may not have space for the new element and will need to be resized.
// Initializing the array with new Array(size) can avoid these expensive resizing operations.
function filter2(arr: number[], fn: (n: number, i: number) => any): number[] {
  let size = 0;
  const newArr: number[] = new Array(arr.length);
  for (let i = 0; i < arr.length; ++i) {
    if (fn(arr[i], i)) {
      newArr[size] = arr[i];
      size++;
    }
  }
  // Ensure new array is of length size
  while (newArr.length > size) {
    newArr.pop();
  }
  return newArr;
}

// in-place
function filter3(arr: number[], fn: (n: number, i: number) => any): number[] {
  let size = 0;
  for (let i = 0; i < arr.length; ++i) {
    if (fn(arr[i], i)) {
      arr[size] = arr[i];
      size++;
    }
  }
  // Ensure array is of length size
  while (arr.length > size) {
    arr.pop();
  }
  return arr;
}
