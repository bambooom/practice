// https://leetcode.com/problems/candy-crush/
// This question is about implementing a basic elimination algorithm for Candy Crush.
// Given an m x n integer array board representing the grid of candy where board[i][j] represents the type of candy. A value of board[i][j] == 0 represents that the cell is empty.
// The given board represents the state of the game following the player's move. Now, you need to restore the board to a stable state by crushing candies according to the following rules:
// 1. If three or more candies of the same type are adjacent vertically or horizontally, crush them all at the same time - these positions become empty.
// 2. After crushing all candies simultaneously, if an empty space on the board has candies on top of itself, then these candies will drop until they hit a candy or bottom at the same time. No new candies will drop outside the top boundary.
// 3. After the above steps, there may exist more candies that can be crushed. If so, you need to repeat the above steps.
// 4. If there does not exist more candies that can be crushed (i.e., the board is stable), then return the current board.
// You need to perform the above rules until the board becomes stable, then return the stable board.

// https://leetcode.com/problems/candy-crush/solutions/3719947/typescript-o-m-n-solution-without-using-extra-space/?envType=study-plan-v2&envId=premium-algo-100
// Loop {
//   a. mark crushable rows (optimized with early return)
//   b. mark crushable cols (optimized with early return)
//   c. crush candies if needed
// }
// Time complexity: O(m * n)
// Space complexity: O(1)
function candyCrush(board: number[][]): number[][] {
  while (checkBoard(board)) {
    crushTheCandies(board);
  }

  return board;
}

// Time complexity: O(m * n)
// Space complexity: O(1)
// 检查是否有行或列包含 3 个或更多的相同的糖果
function checkBoard(board: number[][]): boolean {
  // the order matters because we don't deal with negative in markCrushableCandiesByRow
  const isAnyRowMarked = markCrushableCandiesByRow(board);
  const isAnyColMarked = markCrushableCandiesByCol(board);
  return isAnyColMarked || isAnyRowMarked;
}

// Time complexity: O(m * n)
// Space complexity: O(1)
function crushTheCandies(board: number[][]) {
  const rowSize = board.length;
  const colSize = board[0].length;
  for (let col = 0; col < colSize; col++) {
    let crushCount = 0;
    for (let row = rowSize - 1; row >= 0; row--) {
      const candy = board[row][col];
      if (candy === 0) {
        break;
      } else if (candy < 0) {
        crushCount += 1;
        board[row][col] = 0;
      } else if (crushCount > 0) {
        board[row + crushCount][col] = candy; // 掉下去的 candy
        board[row][col] = 0;
      }
    }
  }
}

function markCrushableCandiesByRow(board: number[][]): boolean {
  let isMarked = false;

  // from bottom to top, stop at all-0 row [0, 0, 0, 0, ..., 0]
  for (let row = board.length - 1; row >= 0; row--) {
    let isZeroRow = true;
    let prevCandy = 0;
    let candyCount = 0;

    for (let col = 0; col < board[0].length; col++) {
      const candy = board[row][col];

      if (candy !== 0) {
        isZeroRow = false;
      }

      if (candy === prevCandy) {
        candyCount += 1;
      } else {
        if (prevCandy !== 0 && candyCount >= 3) {
          for (let i = 1; i <= candyCount; i++) {
            isMarked = true;
            mark(board, row, col - i);
          }
        }
        prevCandy = candy;
        candyCount = 1;
      }
    }

    if (prevCandy !== 0 && candyCount >= 3) {
      for (let i = 1; i <= candyCount; i++) {
        isMarked = true;
        mark(board, row, board[0].length - i);
      }
    }

    if (isZeroRow) {
      // we can rearly return because no new candy will be added
      return isMarked;
    }
  }

  return isMarked;
}

function markCrushableCandiesByCol(board: number[][]): boolean {
  let isMarked = false;

  // from bottom to top, stop at 0
  for (let col = 0; col < board[0].length; col++) {
    let prevCandy = 0;
    let candyCount = 0;

    for (let row = board.length - 1; row >= 0; row--) {
      // need to remove the negative sign marked by markCrushableCandiesByRow
      const candy = Math.abs(board[row][col]);

      if (candy === 0) {
        // we can rearly return because no new candy will be added
        if (prevCandy !== 0 && candyCount >= 3) {
          for (let i = 1; i <= candyCount; i++) {
            isMarked = true;
            mark(board, row + i, col);
          }
        }
        break;
      }

      if (candy === prevCandy) {
        candyCount += 1;
      } else {
        if (prevCandy !== 0 && candyCount >= 3) {
          for (let i = 1; i <= candyCount; i++) {
            isMarked = true;
            mark(board, row + i, col);
          }
        }
        prevCandy = candy;
        candyCount = 1;
      }
    }

    if (prevCandy !== 0 && candyCount >= 3) {
      for (let i = 0; i < candyCount; i++) {
        isMarked = true;
        mark(board, i, col);
      }
    }
  }

  return isMarked;
}

// mark the negative sign, and then crush them
function mark(board: number[][], row: number, col: number) {
  const hasBeenMarked = board[row][col] < 0;
  if (hasBeenMarked) {
    return;
  }
  board[row][col] = board[row][col] * -1;
}

// https://leetcode.com/problems/candy-crush/solutions/1092064/javascript-88-26-80-28/?envType=study-plan-v2&envId=premium-algo-100
// 比较好理解，比较连续3+个 的部分比较简单
function candyCrush2(board: number[][]): number[][] {
  if (!board) return board;
  let isDone = true;

  // mark rows
  for (let r = 0; r < board.length; r++) {
    for (let c = 0; c < board[0].length - 2; c++) {
      const num1 = Math.abs(board[r][c]);
      const num2 = Math.abs(board[r][c + 1]);
      const num3 = Math.abs(board[r][c + 2]);

      // 连着3个移动着check是否相同且非0
      if (num1 === num2 && num2 === num3 && num1 !== 0) {
        board[r][c] = -num1;
        board[r][c + 1] = -num2;
        board[r][c + 2] = -num3;
        isDone = false;
      }
    }
  }
  // mark cols
  for (let c = 0; c < board[0].length; c++) {
    for (let r = 0; r < board.length - 2; r++) {
      const num1 = Math.abs(board[r][c]);
      const num2 = Math.abs(board[r + 1][c]);
      const num3 = Math.abs(board[r + 2][c]);

      if (num1 === num2 && num2 === num3 && num1 !== 0) {
        board[r][c] = -num1;
        board[r + 1][c] = -num2;
        board[r + 2][c] = -num3;
        isDone = false;
      }
    }
  }

  // crush and drop
  if (!isDone) {
    for (let c = 0; c < board[0].length; c++) {
      let idx = board.length - 1;
      // 每个 col，bottom to up
      for (let r = board.length - 1; r >= 0; r--) {
        // 从下往上填充非0，跳过 0 和 negative
        if (board[r][c] > 0) {
          board[idx][c] = board[r][c];
          idx--;
        }
      }
      // 上方剩余的地方，全部填充为0
      for (let r = idx; r >= 0; r--) {
        board[r][c] = 0;
      }
    }
  }

  if (isDone) {
    return board;
  } else {
    return candyCrush(board);
  }
}
