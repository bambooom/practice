// function insertionSort(arr) {
//   for (let i = 0; i < arr.length - 1; i++) {
//     for (let j = 0; j < i; j++) {
//       if (arr[i] < arr[j]) { //  仅能用于最小的往前排
//         let tmp = arr[i];
//         arr.splice(i, 1);
//         arr.splice(j, 0, tmp);
//       }
//     }
//   }

//   return arr;
// }

function insertionSort(arr) {
  let preIndex, current;
  for (let i = 1; i < arr.length; i++) {
    preIndex = i - 1;
    current = arr[i];
    while (preIndex >= 0 && arr[preIndex] > current) {
      arr[preIndex + 1] = arr[preIndex];
      preIndex--;
    }
    arr[preIndex + 1] = current;
  }
  return arr;
}


console.log(insertionSort([4, 3, 5, 1, 7, 9]));
