// https://leetcode.com/problems/can-place-flowers/
// Given an integer array flowerbed containing 0's and 1's, where 0 means empty and 1 means not empty, and an integer n, return true if n new flowers can be planted in the flowerbed without violating the no-adjacent-flowers rule and false otherwise.

// Input: flowerbed = [1,0,0,0,1], n = 1
// Output: true

// Input: flowerbed = [1,0,0,0,1], n = 2
// Output: false

function canPlaceFlowers(flowerbed: number[], n: number): boolean {
  const len = flowerbed.length;
  let seats = 0;
  for (let i = 0; i < len; i++) {
    if (flowerbed[i] === 0) {
      // if (
      //   (i === 0 && len === 1) ||
      //   (i === 0 && len > 1 && flowerbed[i + 1] === 0) ||
      //   (i > 0 &&
      //     i < len - 1 &&
      //     flowerbed[i - 1] === 0 &&
      //     flowerbed[i + 1] === 0) ||
      //   (i === len - 1 && flowerbed[i - 1] === 0)
      // )
      // simplify the above code:
      if (
        (i === 0 || flowerbed[i - 1] === 0) &&
        (i === len - 1 || flowerbed[i + 1] === 0)
      ) {
        seats++;
        flowerbed[i] = 1;
      }
    }
  }

  return seats >= n;
}
