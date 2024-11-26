// https://leetcode.com/problems/sliding-puzzle
// On an 2 x 3 board, there are five tiles labeled from 1 to 5, and an empty square represented by 0. A move consists of choosing 0 and a 4-directionally adjacent number and swapping it.
// The state of the board is solved if and only if the board is [[1,2,3],[4,5,0]].
// Given the puzzle board board, return the least number of moves required so that the state of the board is solved. If it is impossible for the state of the board to be solved, return -1.

// Example1:
// Input: board = [[1,2,3],[4,0,5]]
// Output: 1
// Explanation: Swap the 0 and the 5 in one move.

// Example2:
// Input: board = [[1,2,3],[5,4,0]]
// Output: -1
// Explanation: No number of moves will make the board solved.

// Example3:
// Input: board = [[4,1,2],[5,0,3]]
// Output: 5
// Explanation: 5 is the smallest number of moves that solves the board.
// An example path:
// After move 0: [[4,1,2],[5,0,3]]
// After move 1: [[4,1,2],[0,5,3]]
// After move 2: [[0,1,2],[4,5,3]]
// After move 3: [[1,0,2],[4,5,3]]
// After move 4: [[1,2,0],[4,5,3]]
// After move 5: [[1,2,3],[4,5,0]]

// https://leetcode.com/problems/sliding-puzzle/solutions/4915573/o-4-20-o-1-java-python-javascript-typescript-recursion-backtracking/
// 1. start by locating the empty space
// 2. iterate in all 4 directions from empty space using recursion and swap the puzzle
// 3. after each recursion, backtrack the swapped puzzle numbers
// 4. if  the number of moves exceeds 20, stop the recursion, this prevents creating a lop in 2x3 matrix where no possible solution can be found
// 5. within each iteration, check if the board is solved
function slidingPuzzle(board: number[][]): number {
  let result = Number.MAX_SAFE_INTEGER;
  const directions = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];

  function isPuzzleSolved(board: number[][]): boolean {
    let puzzleValue = 1;

    for (let row = 0; row < 2; row++) {
      for (let col = 0; col < 3; col++) {
        if (row === 1 && col === 2) {
          continue; // no need to check the 0th position
        }
        if (board[row][col] !== puzzleValue++) {
          return false;
        }
      }
    }

    return true;
  }

  function swapPuzzlePiece(
    board: number[][],
    first: number[],
    second: number[],
  ) {
    const temp = board[first[0]][first[1]];

    board[first[0]][first[1]] = board[second[0]][second[1]];
    board[second[0]][second[1]] = temp;
  }

  function backtrack(
    board: number[][],
    moves: number,
    previous: number[],
    current: number[],
  ) {
    if (moves >= 20) return;
    if (isPuzzleSolved(board)) {
      result = Math.min(result, moves);
      return;
    }

    for (const dir of directions) {
      const row = current[0] + dir[0];
      const col = current[1] + dir[1];

      // check if the row and column lies in the range and should not be same as previous row and column
      if (
        row < 0 ||
        row >= 2 ||
        col < 0 ||
        col >= 3 ||
        (previous[0] == row && previous[1] == col)
      ) {
        continue;
      }

      const newMove = [row, col];

      swapPuzzlePiece(board, current, newMove); // swap
      backtrack(board, moves + 1, current, newMove); // recursive
      swapPuzzlePiece(board, current, newMove); // backtrack
    }
  }

  let zero = [-1, -1]; // store the position of zero

  for (let row = 0; row < 2; row++) {
    for (let col = 0; col < 3; col++) {
      if (board[row][col] === 0) {
        zero = [row, col];
        break;
      }
    }
  }

  backtrack(board, 0, [-1, -1], zero);

  return result === Number.MAX_SAFE_INTEGER ? -1 : result;
}
