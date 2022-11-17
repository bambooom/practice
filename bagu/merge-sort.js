function mergeSort(arr) {
  // 采用自上而下的递归方法
  const len = arr.length;
  if (len < 2) {
    return arr;
  }
  let middle = Math.floor(len / 2),
    left = arr.slice(0, middle),
    right = arr.slice(middle);
  return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
  const result = [];

  while (left.length && right.length) {
    result.push(left[0] <= right[0] ? left.shift() : right.shift());
  }

  // while (left.length) result.push(left.shift());

  // while (right.length) result.push(right.shift());

  return result.concat(left, right);
}

console.log(mergeSort([4, 3, 5, 1, 7, 9]));
