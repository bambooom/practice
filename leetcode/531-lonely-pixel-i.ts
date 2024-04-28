// https://leetcode.com/problems/lonely-pixel-i/description/

// Given an m x n picture consisting of black 'B' and white 'W' pixels, return the number of black lonely pixels.
// A black lonely pixel is a character 'B' that located at a specific position where the same row and same column don't have any other black pixels.

/**
 * Space optimized solution: We can use the matrix itself to store the black cell count. We can use the first row to store the count of black cells in each column and similarly we can use the first column to store the count of black cells in each row.
 * Time Complexity: O(m * n)
 * Space Complexity: O(1)
 */

// Returns true if the cell at (x, y) is lonely.
function check(picture: string[][], x: number, y: number): boolean {
  const rowCount = picture.length;
  const colCount = picture[0].length;
  let count = 0;

  for (let i = 0; i < rowCount; i++) {
    count += picture[i][y] == 'B' ? 1 : 0;
  }
  for (let j = 0; j < colCount; j++) {
    // avoid double count (x, y)
    if (j != y) {
      count += picture[x][j] == 'B' ? 1 : 0;
    }
  }

  return picture[x][y] == 'B' && count == 1;
}
function findLonelyPixelOptimized(picture: any[][]): number {
  const rowCount = picture.length;
  const colCount = picture[0].length;
  let answer = 0;
  for (let j = 0; j < colCount; j++) {
    answer += check(picture, 0, j) ? 1 : 0;
  }
  for (let i = 1; i < rowCount; i++) {
    answer += check(picture, i, 0) ? 1 : 0;
  }

  // Convert cell 'B' to '1' and 'W' to '0'
  for (let j = 0; j < colCount; j++) {
    picture[0][j] = picture[0][j] == 'B' ? '1' : '0';
  }

  for (let i = 0; i < rowCount; i++) {
    picture[i][0] = picture[i][0] == 'B' ? '1' : '0';
  }

  // If the cell is black increment the count of corresponding row and column by 1
  for (let i = 1; i < rowCount; i++) {
    for (let j = 1; j < colCount; j++) {
      if (picture[i][j] == 'B') {
        picture[i][0]++;
        picture[0][j]++;
      }
    }
  }

  for (let i = 1; i < rowCount; i++) {
    for (let j = 1; j < colCount; j++) {
      if (picture[i][j] == 'B') {
        if (picture[0][j] == '1' && picture[i][0] == '1') {
          answer++;
        }
      }
    }
  }

  return answer;
}

/**
 * Counting with Arrays:
 *
 * - Iterate over the cells in the matrix picture, for each black cell at (x, y):
 *      Increment rowCount[x] and colCount[y] by 1.
 * - Iterate over the cells in the matrix and for each black cell at (x, y) check if the value of rowCount[x] and colCount[y] is 1.
 *   If both values are 1, increment the variable answer by 1.
 * - Return answer
 *
 * Time Complexity: O(m * n)
 * Space Complexity: O(m + n)
 */
function findLonelyPixel(picture: string[][]): number {
  const rowCount = picture.length;
  const colCount = picture[0].length;
  const match = 'B';
  const rowArr = new Array(rowCount).fill(0);
  const colArr = new Array(colCount).fill(0);
  for (let x = 0; x < rowCount; x++) {
    for (let y = 0; y < colCount; y++) {
      if (picture[x][y] === match) {
        rowArr[x]++;
        colArr[y]++;
      }
    }
  }

  let count = 0;
  for (let x = 0; x < rowCount; x++) {
    for (let y = 0; y < colCount; y++) {
      if (picture[x][y] === match && rowArr[x] === 1 && colArr[y] === 1) {
        count++;
      }
    }
  }
  return count;
}

// 另一种写法
function findLonelyPixel2(picture: string[][]): number {
  const row = picture.length;
  const col = picture[0].length;
  const visited: boolean[][] = [...Array(row)].map((x) =>
    Array(col).fill(false),
  );

  let result = 0;

  const checkRowAndCol = (r: number, c: number) => {
    let hasBlack = false;

    for (let i = 0; i < row; i++) {
      if (i === r) continue;
      if (picture[i][c] === 'B') {
        visited[i][c] = true;
        hasBlack = true;
      }
    }

    for (let j = 0; j < col; j++) {
      if (j === c) continue;
      if (picture[r][j] === 'B') {
        visited[r][j] = true;
        hasBlack = true;
      }
    }
    if (!hasBlack) result++;
  };

  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (!visited[i][j] && picture[i][j] === 'B') {
        checkRowAndCol(i, j);
      }
    }
  }

  return result;
}
