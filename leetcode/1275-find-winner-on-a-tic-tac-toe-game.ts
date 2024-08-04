// https://leetcode.com/problems/find-winner-on-a-tic-tac-toe-game/
// Tic-tac-toe is played by two players A and B on a 3 x 3 grid. The rules of Tic-Tac-Toe are:
// - Players take turns placing characters into empty squares ' '.
// - The first player A always places 'X' characters, while the second player B always places 'O' characters.
// - 'X' and 'O' characters are always placed into empty squares, never on filled ones.
// - The game ends when there are three of the same (non-empty) character filling any row, column, or diagonal.
// - The game also ends if all squares are non-empty.
// - No more moves can be played if the game is over.
// Given a 2D integer array moves where moves[i] = [rowi, coli] indicates that the i-th move will be played on grid[rowi][coli]. return the winner of the game if it exists (A or B). In case the game ends in a draw return "Draw". If there are still movements to play return "Pending".
// You can assume that moves is valid (i.e., it follows the rules of Tic-Tac-Toe), the grid is initially empty, and A will play first.

// brutal force solution
function isWin(pos: number[]): boolean {
  if (pos.length < 3) return false;
  const winningCombinations = [
    [1, 5, 9],
    [3, 5, 7],
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
  ];
  return winningCombinations.some((combination) => {
    return combination.every((num) => pos.includes(num));
  });
}

function tictactoe(moves: number[][]): string {
  const As: number[] = [];
  const Bs: number[] = [];

  for (const [x, y] of moves) {
    const pos = x * 3 + (y + 1);
    moves.indexOf([x, y]) % 2 === 0 ? As.push(pos) : Bs.push(pos);
  }

  if (isWin(As)) return 'A';
  if (isWin(Bs)) return 'B';

  return moves.length === 9 ? 'Draw' : 'Pending';
}

// https://leetcode.com/problems/find-winner-on-a-tic-tac-toe-game/solutions/1474728/javascript-solution-commented-and-explained/

// If we assign player A value 1, and player B value -1. Then in order for any of them to win
// the addition of all values of a row / column / diagonal has to be 3 or -3. Given a row or column
// index, if rowIndex === columnIndex, then it is on the main diagonal. If rowIndex + columnIndex == 2,
// then it is on the anti diagonal. With this information with us, we can write a solution.
function tictactoe2(moves: number[][]): string {
  // record and move on approach
  const rows = [0, 0, 0];
  const cols = [0, 0, 0];
  let dia = 0,
    antiDia = 0,
    count = 0;
  for (const [row, column] of moves) {
    // Let's assume 1 represents A, -1 represents B
    const value = count % 2 === 0 ? 1 : -1;
    rows[row] += value;
    cols[column] += value;

    // row + column === 2, it is on the anti diagonal
    if (row + column === 2) {
      antiDia += value;
    }

    // if row === column, it is on the main diagonal
    if (row === column) {
      dia += value;
    }
    // check whether we have a result already
    if ([rows[row], cols[column], antiDia, dia].includes(3)) {
      return 'A';
    } else if ([rows[row], cols[column], antiDia, dia].includes(-3)) {
      return 'B';
    }
    count++;
  }
  // Some moves are still left to be made
  if (count < 9) {
    return 'Pending';
  }
  return 'Draw';
}
