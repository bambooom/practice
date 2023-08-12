// https://leetcode.com/problems/flatten-deeply-nested-array/?

type MultiDimensionalArray = (number | MultiDimensionalArray)[];

// recursive approach
// n is depth
const flat = function (
  arr: MultiDimensionalArray,
  n: number,
): MultiDimensionalArray {
  if (n == 0) {
    return arr;
  }
  const res: MultiDimensionalArray = [];
  arr.forEach((item) => {
    if (Array.isArray(item) && n) {
      res.push(...flat(item, n - 1));
    } else {
      res.push(item);
    }
  });
  return res;
};
