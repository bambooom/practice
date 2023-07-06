// https://leetcode.com/problems/apply-transform-over-each-element-in-array/
// Basic Array Transformations
// returnedArray[i] = fn(arr[i], i)
// solve it without the built-in Array.map method

function map(arr: number[], fn: (n: number, i: number) => number): number[] {
  const res: number[] = [];

  for (let i = 0; i < arr.length; i++) {
    const el = fn(arr[i], i);
    res.push(el);
  }

  return res;
}
