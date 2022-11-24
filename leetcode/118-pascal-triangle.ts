// Pascal's Triangle: each number is the sum of the two numbers directly above, like bee's nest

// Input:  5
// Ouptut: [[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]

// Dynamic Programming approach
function generate(numRows: number): number[][] {
  if (numRows === 1) return [[1]];
  if (numRows === 2) return [[1], [1, 1]];
  const res = [[1], [1, 1]];
  for (let i = 2; i < numRows; i++) {
    const row = [];
    for (let j = 0; j <= i; j++) {
      if (j === 0 || j === i) {
        row[j] = 1;
      } else {
        row[j] = res[i - 1][j - 1] + res[i - 1][j];
      }
    }
    res[i] = row;
  }
  return res;
}

console.log(generate(5));
