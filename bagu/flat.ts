/* 数组扁平化 */

// 1. builtin flat()
const arr = [1, [2, [3, [4, 5]]], 6];
//  方法一：数组自带的扁平化方法，flat 的参数代表的是需要展开几层，如果是 Infinity 的话，就是不管嵌套几层，全部都展开
console.log(arr.flat(Infinity)); // [1, 2, 3, 4, 5, 6]

// 2. use regex with string
const res = JSON.stringify(arr).replace(/\[|\]/g, '');
const res2 = JSON.parse('[' + res + ']');
console.log(res2); // [1, 2, 3, 4, 5, 6]

// 3. recursive solution
function flat_r(arr: number[], depth = 1): number[] {
  const res: number[] = [];
  arr.forEach((item) => {
    if (Array.isArray(item) && depth) {
      res.push(...flat_r(item, depth - 1));
    } else {
      res.push(item);
    }
  });
  return res;
}

// 4. recursive reduce
function flat_reduce(arr: number[], depth = 1) {
  return depth
    ? arr.reduce((acc: any[], cur) => {
        return [
          ...acc,
          ...(Array.isArray(cur) ? flat_reduce(cur, depth - 1) : [cur]),
        ];
      }, [])
    : arr;
}

// 5. iterative solution
function flat_i(arr: any[], depth = 1) {
  while (arr.some(Array.isArray) && depth-- > 0) {
    arr = [].concat(...arr);
  }
  return arr;
}
// 6. iterative using stack
/**
 * Iterative
 * S(max stack size == depth * items at depth)
 * O(items at depth * depth)
 */
function flat_stack(arr: any[], depth = 1) {
  const stack = arr.map((item) => [item, depth]);
  const res: number[] = [];

  while (stack.length > 0) {
    // const item = stack.pop() as any[];
    const [item, itemDepth] = stack.pop() as [any[] | number, number];
    if (Array.isArray(item) && itemDepth > 0) {
      stack.push(...item.map((i) => [i, itemDepth - 1]));
    } else {
      res.unshift(item as number);
    }
  }

  return res;
}

// const arr = [1, [2], [3, [4], [5, [6]]]];
// console.log(flat_i(arr));
// // [ 1, 2, 3, [ 4 ], [ 5, [ 6 ] ] ]
// console.log(flat_i(arr, 1));
// // [ 1, 2, 3, [ 4 ], [ 5, [ 6 ] ] ]
// console.log(flat_i(arr, 2));
// [ 1, 2, 3, 4, 5, [ 6 ] ]
// console.log(flat_stack(arr, 3));
// [ 1, 2, 3, 4, 5, 6 ]
