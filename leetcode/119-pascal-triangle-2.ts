// https://leetcode.com/problems/pascals-triangle-ii/
// https://en.wikipedia.org/wiki/Pascal%27s_rule

function getRow(rowIndex: number): number[] {
  const res = [];

  while (res.length <= rowIndex) {
    res.unshift(1);
    for (let i = 1; i < res.length - 1; i++) {
      res[i] += res[i + 1];
    }
  }

  return res;
}
