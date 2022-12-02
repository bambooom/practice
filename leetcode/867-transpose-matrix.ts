// similar with 566-reshape matrix

function transpose(mat: number[][]): number[][] {
  const c = matrix[0].length; // col
  const r = matrix.length; // row
  const res = [];
  for (let i = 0; i < c; i++) {
    const row = [];
    for (let j = 0; j < r; j++) {
      row[j] = matrix[j][i];
    }
    res.push(row);
  }
  return res;
}
