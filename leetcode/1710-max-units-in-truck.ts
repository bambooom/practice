function maximumUnits(boxTypes: number[][], truckSize: number): number {
  boxTypes.sort((a, b) => b[1] - a[1]);

  let total = 0;
  let i = 0;

  while (truckSize && i < boxTypes.length) {
    let [count, units] = boxTypes[i];
    if (count < truckSize) {
      total += count * units;
      truckSize -= count;
    } else {
      while (count && truckSize) {
        total += units;
        count--;
        truckSize--;
      }
    }
    i++;
  }

  return total;
}

const boxTypes = [
  [5, 10],
  [2, 5],
  [4, 7],
  [3, 9],
];

// console.log(maximumUnits(boxTypes, 10));

// const arr = [
//   [1, 3],
//   [5, 5],
//   [2, 5],
//   [4, 2],
//   [4, 1],
//   [3, 1],
//   [2, 2],
//   [1, 3],
//   [2, 5],
//   [3, 2],
// ];

// console.log(maximumUnits(arr, 35));
