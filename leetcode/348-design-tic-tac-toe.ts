// https://leetcode.com/problems/design-tic-tac-toe
// Implement the TicTacToe class:

// TicTacToe(int n) Initializes the object the size of the board n.
// int move(int row, int col, int player) Indicates that the player with id player plays at the cell (row, col) of the board. The move is guaranteed to be a valid move, and the two players alternate in making moves. Return
// 0 if there is no winner after the move,
// 1 if player 1 is the winner after the move, or
// 2 if player 2 is the winner after the move.

class TicTacToe {
  rows: number[];
  cols: number[];
  diagonal: number;
  antiDiagonal: number;
  constructor(n: number) {
    this.rows = Array(n).fill(0);
    this.cols = Array(n).fill(0);
    this.diagonal = 0;
    this.antiDiagonal = 0;
  }

  move(row: number, col: number, player: number): number {
    const currentPlayer = player === 1 ? 1 : -1;
    // update currentPlayer in rows and cols array
    this.rows[row] += currentPlayer;
    this.cols[col] += currentPlayer;

    if (row === col) {
      this.diagonal += currentPlayer;
    }

    if (col === this.cols.length - row - 1) {
      this.antiDiagonal += currentPlayer;
    }

    const n = this.rows.length;

    // check if current player wins
    if (
      Math.abs(this.rows[row]) === n ||
      Math.abs(this.cols[col]) === n ||
      Math.abs(this.diagonal) === n ||
      Math.abs(this.antiDiagonal) === n
    ) {
      return player;
    }

    // no one wins
    return 0;
  }
}

/**
 * Your TicTacToe object will be instantiated and called as such:
 * var obj = new TicTacToe(n)
 * var param_1 = obj.move(row,col,player)
 */
