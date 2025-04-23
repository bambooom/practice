// https://leetcode.com/problems/count-largest-group
// You are given an integer n.
// Each number from 1 to n is grouped according to the sum of its digits.
// Return the number of groups that have the largest size.

// Example 1:
// Input: n = 13
// Output: 4
// Explanation: There are 9 groups in total, they are grouped according sum of its digits of numbers from 1 to 13:
// [1,10], [2,11], [3,12], [4,13], [5], [6], [7], [8], [9].
// There are 4 groups with largest size.

// Example 2:
// Input: n = 2
// Output: 2
// Explanation: There are 2 groups [1], [2] of size 1.

function countLargestGroup(n: number): number {
  let maxSize = 1;
  let groupCount = 0;

  const freq = new Map<number, number>(); // key is the sum of digits, value is the count of numbers with that sum

  for (let i = 1; i <= n; i++) {
    const sum = i
      .toString()
      .split('')
      .reduce((a, b) => a + +b, 0);
    const count = (freq.get(sum) || 0) + 1;
    if (count > maxSize) {
      maxSize = count;
      groupCount = 1;
    } else if (count === maxSize) {
      groupCount++;
    }
    freq.set(sum, count);
  }

  return groupCount;
}

// seems a little faster
function countLargestGroup2(n: number): number {
  const groups: Map<number, number> = new Map();
  let prevSum = 0; // 前一个数字的数位和，初始值为 0

  // 对于连续的数字（如 21,22,23,24...），它们的数位和是连续递增的
  // 只有在遇到 10 的倍数时（如从 29 到 30），才需要重新计算数位和
  // 这样避免了对每个数字都进行字符串转换和数位分割的操作，提高了性能
  for (let i = 1; i <= n; i++) {
    if (i % 10 === 0) {
      // 当 i 是 10 的倍数时（如 10、20、30...），需要重新计算整个数的数位和
      prevSum = 0;
      let num = i;
      while (num > 0) {
        prevSum += num % 10;
        num = Math.floor(num / 10);
      }
    } else {
      // 当 i 不是 10 的倍数时，新数字的数位和就是前一个数字的数位和加 1
      prevSum += 1;
    }

    groups.set(prevSum, (groups.get(prevSum) ?? 0) + 1);
  }

  const maxSize = Math.max(...groups.values());

  let res = 0;
  for (const count of groups.values()) {
    if (count === maxSize) res++;
  }

  return res;
}
