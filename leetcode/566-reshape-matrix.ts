// Input: mat = [[1,2],[3,4]], r = 1, c = 4
// Output: [[1,2,3,4]]

function matrixReshape(mat: number[][], r: number, c: number): number[][] {
  const m = mat[0].length;
  const n = mat.length;
  if (m * n !== r * c) return mat;
  const flat = mat.flat();
  const res = [];
  for (let i = 0; i < r; i++) {
    const row = [];
    for (let j = 0; j < c; j++) {
      row[j] = flat[i * c + j];
    }
    res.push(row);
  }
  return res;
}

// using Using division and modulus approach
// time: O(m*n), space: O(m*n)
function matrixReshape2(mat: number[][], r: number, c: number): number[][] {
  const m = mat[0].length;
  const n = mat.length;
  if (m * n !== r * c) return mat;
  const res = [];
  for (let i = 0; i < r; i++) {
    const row = [];
    for (let j = 0; j < c; j++) {
      const idx = i * c + j;
      row[j] = mat[Math.floor(idx / m)][idx % m];
    }
    res.push(row);
  }
  return res;
}

console.log(
  matrixReshape2(
    [
      [1, 2],
      [3, 4],
      [5, 6],
    ],
    2,
    3,
  ),
); // [ [ 1, 2, 3 ], [ 4, 5, 6 ] ]
