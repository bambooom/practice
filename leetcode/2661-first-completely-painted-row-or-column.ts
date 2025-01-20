// https://leetcode.com/problems/first-completely-painted-row-or-column
// You are given a 0-indexed integer array arr, and an m x n integer matrix mat. arr and mat both contain all the integers in the range [1, m * n].
// Go through each index i in arr starting from index 0 and paint the cell in mat containing the integer arr[i].
// Return the smallest index i at which either a row or a column will be completely painted in mat.

// Example1:
// Input: arr = [1,3,4,2], mat = [[1,4],[2,3]]
// Output: 2
// Explanation: The moves are shown in order, and both the first row and second column of the matrix become fully painted at arr[2].

// Example2:
// Input: arr = [2,8,7,4,1,3,5,6,9], mat = [[3,2,5],[1,4,6],[8,7,9]]
// Output: 3
// Explanation: The second column becomes fully painted at arr[3].

// https://leetcode.com/problems/first-completely-painted-row-or-column/submissions/1514110269/
// hashmap solution
function firstCompleteIndex(arr: number[], mat: number[][]): number {
  const rowsMap = new Map<number, number>();
  const colsMap = new Map<number, number>();
  const matMap = new Map<number, { row: number; col: number }>();

  // create hash map for matrix values
  for (let row = 0; row < mat.length; row++) {
    const rowArr = mat[row];

    for (let col = 0; col < rowArr.length; col++) {
      matMap.set(rowArr[col], { row, col });
    }
  }

  // go through the arr and check if col or row for added value is painted
  for (let move = 0; move < arr.length; move++) {
    const { row, col } = matMap.get(arr[move])!;

    // increment length for row
    let rowCount = rowsMap.get(row) ?? 0;
    rowCount++;
    if (rowCount === mat[0].length) {
      return move;
    }

    // increment length for col
    let colCount = colsMap.get(col) ?? 0;
    colCount++;
    if (colCount === mat.length) {
      return move;
    }

    rowsMap.set(row, rowCount);
    colsMap.set(col, colCount);
  }

  return -1;
}

// https://leetcode.com/problems/first-completely-painted-row-or-column/solutions/3543869/easy-to-understand-javascript-hash-beats-100-runtime-beats-90-memory/
// seems faster solution
function firstCompleteIndex2(arr: number[], mat: number[][]): number {
  const hash: Record<number, { row: number; col: number }> = [];
  let smallest = 0;
  const n = mat[0].length;
  const m = mat.length;
  const rows: number[] = new Array(m).fill(0);
  const columns: number[] = new Array(n).fill(0);

  for (let i = 0; i < mat.length; i++) {
    for (let j = 0; j < mat[i].length; j++) {
      hash[mat[i][j]] = { row: i, col: j };
    }
  }

  for (let i = 0; i < arr.length; i++) {
    const { row, col } = hash[arr[i]];

    rows[row] += 1;
    columns[col] += 1;

    if (rows[row] === n || columns[col] === m) {
      smallest = i;
      break;
    }
  }

  return smallest;
}
