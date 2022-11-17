// in-place 版本

function quickSort(arr, left, right) {
  if (right === left + 1) {
    if (arr[left] > arr[right]) {
      let tmp = arr[right];
      arr[right] = arr[left];
      arr[left] = tmp;
      return;
    }
    return;
  }
  let pivot = arr[left];
  let current = left + 1;
  for (let i = current; i <= right; i++) {
    if (arr[i] < pivot) {
      if (i !== current) {
        let tmp = arr[i];
        arr[i] = arr[current];
        arr[current] = tmp;
      }
      current++;
    }
  }

  if (left !== current - 1) {
    let tmp = arr[left];
    arr[left] = arr[current - 1];
    arr[current - 1] = tmp;
    quickSort(arr, left, current - 1);
  }

  if (right !== current) {
    quickSort(arr, current, right);
  }
}

// 非 in-place版
// function quickSort (arr) {
//   const rec = (arr) => {
//     if (arr.length <= 1) {
//       return arr;
//     }
//     const left = [];
//     const right = [];
//     const pivot = arr[0]; // 基准元素, 从左边 0 开始当基准
//     for (let i = 1; i < arr.length; i++){
//       if (arr[i] < pivot) {
//         left.push(arr[i]);
//       } else {
//         right.push(arr[i]);
//       }
//     }
//     return [...rec(left), pivot, ...rec(right)] // 这个实现好像重新创建了很多数组，空间上不划算？
//   }
//   return rec(arr)
// };

let arr = [4, 3, 5, 1, 1, 9, 7, 23,0, -2, 34, 13];
// console.log(quickSort(arr));

// let arr = [1,3,5,4,9,7]
// in-place
quickSort(arr, 0, arr.length - 1);
console.log(arr);
