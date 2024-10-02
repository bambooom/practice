// https://leetcode.com/problems/rank-transform-of-an-array
// Given an array of integers arr, replace each element with its rank.
// The rank represents how large the element is. The rank has the following rules:
// Rank is an integer starting from 1.
// The larger the element, the larger the rank. If two elements are equal, their rank must be the same.
// Rank should be as small as possible.

function arrayRankTransform(arr: number[]): number[] {
  const sorted = [...arr].slice().sort((a, b) => a - b);
  const map = new Map<number, number>();
  let index = 1;
  for (const num of sorted) {
    if (!map.has(num)) {
      map.set(num, index);
      index++;
    }
  }

  return arr.map((e) => map.get(e) as number);
}

// my simple solution, but time limit exceeded
function arrayRankTransform2(arr: number[]): number[] {
  const sorted = [...new Set(arr)].sort((a, b) => a - b);

  return arr.map((e) => {
    return sorted.indexOf(e) + 1;
  });
}

// https://leetcode.com/problems/rank-transform-of-an-array/solutions/2798773/typescript-javascript-es6-3-lines/?envType=daily-question&envId=2024-10-02
function arrayRankTransform3(arr: number[]): number[] {
  const rankMap: Record<number, number> = {};
  [...new Set(arr)].sort((a, b) => a - b).forEach((e, i) => (rankMap[e] = i));
  return arr.map((e) => rankMap[e] + 1);
}
