// https://leetcode.com/problems/maximum-distance-in-arrays/
// You are given m arrays, where each array is sorted in ascending order.
// You can pick up two integers from two different arrays (each array picks one) and calculate the distance. We define the distance between two integers a and b to be their absolute difference |a - b|.
// Return the maximum distance.

// single scan
// for arrays a and b currently chosen, we can just find the maximum out of a[n−1]−b[0] and b[m−1]−a[0] to find the larger distance as they are sorted
// 另外再持续更新记录所有 element 的 max 和 min
// 每个 array 只需要计算和 max 和 min 的距离即可更新 distance

function maxDistance(arrays: number[][]): number {
  const n = arrays.length;
  let min = arrays[0][0];
  let max = arrays[0][arrays[0].length - 1];
  let ans = Number.MIN_SAFE_INTEGER;

  for (let i = 1; i < n; i++) {
    const m = arrays[i].length;

    ans = Math.max(ans, Math.abs(arrays[i][0] - max));
    ans = Math.max(ans, Math.abs(arrays[i][m - 1] - min));

    max = Math.max(max, arrays[i][m - 1]);
    min = Math.min(min, arrays[i][0]);
  }

  return ans;
}
