// https://leetcode.com/problems/sudoku-solver/
// Write a program to solve a Sudoku puzzle by filling the empty cells.
// A sudoku solution must satisfy all of the following rules:
// Each of the digits 1-9 must occur exactly once in each row.
// Each of the digits 1-9 must occur exactly once in each column.
// Each of the digits 1-9 must occur exactly once in each of the 9 3x3 sub-boxes of the grid.
// The '.' character indicates empty cells.

// Example 1:
// Input: board = [["5","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]]
// Output: [["5","3","4","6","7","8","9","1","2"],["6","7","2","1","9","5","3","4","8"],["1","9","8","3","4","2","5","6","7"],["8","5","9","7","6","1","4","2","3"],["4","2","6","8","5","3","7","9","1"],["7","1","3","9","2","4","8","5","6"],["9","6","1","5","3","7","2","8","4"],["2","8","7","4","1","9","6","3","5"],["3","4","5","2","8","6","1","7","9"]]
// Explanation: The input board is shown above and the only valid solution is shown below:

// Constraints:
// board.length == 9
// board[i].length == 9
// board[i][j] is a digit or '.'.
// It is guaranteed that the input board has only one solution.

/**
  Do not return anything, modify board in-place instead.
 */
// https://leetcode.com/problems/sudoku-solver/solutions/5676468/explained-typescript-runtime-beats-95-50/?envType=daily-question&envId=2025-08-31
// Use backtracking to explore all possible placements of digits in the empty cells while ensuring Sudoku constraints.
function solveSudoku(board: string[][]): void {
  const rows: number[][] = Array.from({ length: 9 }, () => Array(10).fill(0));
  const cols: number[][] = Array.from({ length: 9 }, () => Array(10).fill(0));
  const boxes: number[][] = Array.from({ length: 9 }, () => Array(10).fill(0));
  const emptyCells: [number, number][] = [];

  // Initialize the bitmasks and collect empty cells
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      const num = board[r][c];
      if (num === '.') {
        emptyCells.push([r, c]);
      } else {
        const n = parseInt(num);
        rows[r][n] = 1;
        cols[c][n] = 1;
        boxes[Math.floor(r / 3) * 3 + Math.floor(c / 3)][n] = 1;
      }
    }
  }

  function isValid(r: number, c: number, n: number): boolean {
    return (
      rows[r][n] === 0 &&
      cols[c][n] === 0 &&
      boxes[Math.floor(r / 3) * 3 + Math.floor(c / 3)][n] === 0
    );
  }

  function placeNumber(r: number, c: number, n: number): void {
    rows[r][n] = 1;
    cols[c][n] = 1;
    boxes[Math.floor(r / 3) * 3 + Math.floor(c / 3)][n] = 1;
    board[r][c] = n.toString();
  }

  function removeNumber(r: number, c: number, n: number): void {
    rows[r][n] = 0;
    cols[c][n] = 0;
    boxes[Math.floor(r / 3) * 3 + Math.floor(c / 3)][n] = 0;
    board[r][c] = '.';
  }

  function backtrack(idx: number): boolean {
    if (idx === emptyCells.length) {
      return true;
    }

    const [r, c] = emptyCells[idx];
    for (let n = 1; n <= 9; n++) {
      if (isValid(r, c, n)) {
        placeNumber(r, c, n);
        if (backtrack(idx + 1)) {
          return true;
        }
        removeNumber(r, c, n);
      }
    }
    return false;
  }

  backtrack(0);
}
