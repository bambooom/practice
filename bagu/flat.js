/**
 * @param { Array } arr
 * @param { number } depth
 * @returns { Array }
 */
// recursive solution
function flat_r(arr, depth = 1) {
  const res = [];
  arr.forEach(item => {
    if (Array.isArray(item) && depth) {
      res.push(...flat(item, depth - 1));
    } else {
      res.push(item);
    }
  });
  return res;
}

// recursive reduce
function flat_reduce(arr, depth = 1) {
  return depth
    ? arr.reduce((acc, cur) => {
        return [
          ...acc,
          ...(Array.isArray(cur) ? flat_reduce(cur, depth - 1) : [cur]),
        ];
      }, [])
    : arr;
}

// iterative solution
function flat_i(arr, depth = 1) {
  while (arr.some(Array.isArray) && depth-- > 0) {
    arr = [].concat(...arr);
  }
  return arr;
}
// iterative using stack
/**
 * Iterative
 * S(max stack size == depth * items at depth)
 * O(items at depth * depth)
 */
function flat_stack(arr, depth = 1) {
  const stack = arr.map(item => [item, depth]);
  const res = [];

  while (stack.length > 0) {
    const [item, itemDepth] = stack.pop();
    if (Array.isArray(item) && itemDepth > 0) {
      stack.push(...item.map(i => [i, itemDepth - 1]));
    } else {
      res.push(item);
    }
  }

  return res.reverse();
}

const arr = [1, [2], [3, [4], [5, [6]]]];

// console.log(flat_i(arr));
// // [ 1, 2, 3, [ 4 ], [ 5, [ 6 ] ] ]
// console.log(flat_i(arr, 1));
// // [ 1, 2, 3, [ 4 ], [ 5, [ 6 ] ] ]
// console.log(flat_i(arr, 2));
// [ 1, 2, 3, 4, 5, [ 6 ] ]
console.log(flat_stack(arr, 3));
// [ 1, 2, 3, 4, 5, 6 ]
