// https://leetcode.com/problems/pascals-triangle/
// Given an integer numRows, return the first numRows of Pascal's triangle.
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

// console.log(generate(5));

// https://leetcode.com/problems/pascals-triangle/solutions/2812421/typescript-2-pointers/?envType=study-plan-v2&envId=top-100-liked
// faster?
function generate2(numRows: number): number[][] {
  const result: number[][] = Array.from(Array(numRows), () => []);
  let p1 = 0;
  let p2 = 0;
  let i = 0;

  result[0][0] = 1;

  while (i < numRows - 1) {
    if (p1 === p2) {
      result[i + 1].push(result[i][p1]);
      p2++;
    } else if (!result[i][p2]) {
      result[i + 1].push(result[i][p1]);
      i++;
      p2 = 0;
      p1 = 0;
    } else {
      result[i + 1].push(result[i][p1] + result[i][p2]);
      p1++;
      p2++;
    }
  }

  return result;
}

// https://leetcode.com/problems/pascals-triangle/solutions/4529600/beginner-friendly-typescript-solution-for-pascal-triangle-problem-multiple-pointer-solution/?envType=study-plan-v2&envId=top-100-liked
function generate3(numRows: number): number[][] {
  const result = [[1]];
  if (numRows === 1) return result;

  let startIdx = 0;

  while (startIdx < numRows - 1) {
    const curRow = result[startIdx];
    const nextRow = [1];

    for (let i = 0; i < curRow.length; i++) {
      nextRow.push(curRow[i] + (curRow[i + 1] || 0));
    }

    result.push(nextRow);
    startIdx++;
  }

  return result;
}
