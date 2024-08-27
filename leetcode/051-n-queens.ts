// https://leetcode.com/problems/n-queens/
// backtracking
// The n-queens puzzle is the problem of placing n queens on an n x n chessboard such that no two queens attack each other.
// Given an integer n, return all distinct solutions to the n-queens puzzle. You may return the answer in any order.
// Each solution contains a distinct board configuration of the n-queens' placement, where 'Q' and '.' both indicate a queen and an empty space, respectively.

// Example1:
// Input: n = 4
// Output: [[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]
// Explanation: There exist two distinct solutions to the 4-queens puzzle as shown above
// Example2:
// Input: n = 1
// Output: [["Q"]]

function solveNQueens(n: number): string[][] {
  const result: string[][] = [];
  const board: number[] = [];

  const BOARD_ROW = '.'.repeat(n);
  const printBoard = () =>
    board.map(
      (col) => `${BOARD_ROW.slice(0, col)}Q${BOARD_ROW.slice(col + 1)}`,
    );

  // 国际象棋的 Queen，横竖都斜都可以走任意步
  const isSafePlace = (c: number): boolean => {
    for (let row = 0; row < board.length; row++) {
      const col = board[row];
      if (c === col) return false;

      const diff = board.length - row;
      if (c === col + diff || c === col - diff) {
        return false;
      }
    }

    return true;
  };

  const backtrack = () => {
    if (board.length === n) {
      result.push(printBoard());
      return;
    }

    for (let col = 0; col < n; col++) {
      if (isSafePlace(col)) {
        board.push(col);
        backtrack();
        board.pop();
      }
    }
  };

  backtrack();

  return result;
}
