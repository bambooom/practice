// https://leetcode.com/problems/maximum-swap
// You are given an integer num. You can swap two digits at most once to get the maximum valued number.
// Return the maximum valued number you can get.

// Example 1:
// Input: num = 2736
// Output: 7236
// Explanation: Swap the number 2 and the number 7.

// Example 2:
// Input: num = 9973
// Output: 9973
// Explanation: No swap.

// wrong answer, only considered first digit, one can also swap other digits to get max number
// input=98368, output should be 98863
// function maximumSwap(num: number): number {
//   const arr = num.toString().split('').map(Number);
//   const max = Math.max(...arr);
//   const maxIdx = arr.indexOf(max);

//   const first = arr[0];
//   arr[maxIdx] = first;
//   arr[0] = max;

//   return Number(arr.join(''));
// }

// https://leetcode.com/problems/maximum-swap/solutions/1776901/javascript-o-n-with-comments/?envType=daily-question&envId=2024-10-17
function maximumSwap(num: number): number {
  // convert number to digits string
  const digits = num.toString().split('');

  // track the current max, it's location, and the best swap as left and right
  let max = -1;
  let maxIdx = -1;
  let leftIdx = -1;
  let rightIdx = -1;

  // iterate from right to left
  for (let i = digits.length - 1; i >= 0; i--) {
    const digit = parseInt(digits[i]);

    // if digit > max, set it and its location to the new max
    if (digit > max) {
      max = digit;
      maxIdx = i;
    } else if (digit < max) {
      // if digit < max, set this index to the left and max to the right as it's the best swap
      leftIdx = i;
      rightIdx = maxIdx;
    }
  }

  // if the left is -1, it's already the best
  if (leftIdx === -1) {
    return num;
  }

  // swap left and right index number
  [digits[leftIdx], digits[rightIdx]] = [digits[rightIdx], digits[leftIdx]];

  return parseInt(digits.join(''));
}

// https://leetcode.com/problems/maximum-swap/solutions/5922913/solution-daily-challenge-17oct2024-this-solution-worked-for-1993/?envType=daily-question&envId=2024-10-17
function maximumSwap2(num: number): number {
  // this logic works but the usual aproach (bruteforce/ two pointers and finding the largest number breaks for 1993 test case)

  const numArray = num.toString().split('');
  const lastIndex = new Array(10).fill(-1);
  for (let i = 0; i < numArray.length; i++) {
    lastIndex[parseInt(numArray[i])] = i;
  }

  for (let i = 0; i < numArray.length; i++) {
    for (let d = 9; d > parseInt(numArray[i]); d--) {
      if (lastIndex[d] > i) {
        [numArray[i], numArray[lastIndex[d]]] = [
          numArray[lastIndex[d]],
          numArray[i],
        ];
        return parseInt(numArray.join(''), 10);
      }
    }
  }
  return num;
}
