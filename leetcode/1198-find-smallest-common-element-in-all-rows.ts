// // https://leetcode.com/problems/find-smallest-common-element-in-all-rows/
// Given an m x n matrix mat where every row is sorted in strictly increasing order, return the smallest common element in all rows.
// If there is no common element, return -1.

// Example 1:
// Input: mat = [[1,2,3,4,5],[2,4,5,8,10],[3,5,7,9,11],[1,3,5,7,9]]
// Output: 5

// Example 2:
// Input: mat = [[1,2,3],[2,3,4],[2,3,5]]
// Output: 2

// 每次将后面的行里不存在的元素 filter 掉，剩余的最小的就是最小公共元素
function smallestCommonElement(mat: number[][]): number {
  return (
    mat.reduce((cum: number[], cur: number[]) =>
      cum.filter((el) => cur.includes(el)),
    )[0] || -1
  );
}

// hashmap
function smallestCommonElement2(mat: number[][]): number {
  const hashMap = new Map<number, number>();

  for (let r = 0; r < mat.length; r++) {
    for (let c = 0; c < mat[r].length; c++) {
      hashMap.set(mat[r][c], (hashMap.get(mat[r][c]) || 0) + 1);
    }
  }
  const commonNumbers: number[] = [];
  for (const [key, value] of hashMap) {
    if (value >= mat.length) {
      commonNumbers.push(key);
    }
  }
  commonNumbers.sort((a, b) => a - b);
  return commonNumbers.length > 0 ? commonNumbers[0] : -1;
}
