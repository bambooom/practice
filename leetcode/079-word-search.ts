// https://leetcode.com/problems/word-search
// Given an m x n grid of characters board and a string word, return true if word exists in the grid.
// The word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once.

// Example1:
// Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"
// Output: true

// Example2:
// Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "SEE"
// Output: true

// Example3:
// Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCB"
// Output: false

// https://leetcode.com/problems/word-search/solutions/2551587/typescript-solution/?envType=study-plan-v2&envId=top-100-liked
// backtracking
function exist(board: string[][], word: string): boolean {
  let ans = false;

  const m = board.length;
  const n = board[0].length;
  const total = word.length;

  const track = (i: number, j: number, l: number) => {
    if (l === total) {
      ans = true;
      return;
    }

    if (i >= m || j >= n || i < 0 || j < 0) return;

    if (board[i][j] !== word[l]) return;

    const pre = board[i][j];
    board[i][j] = '*';

    track(i + 1, j, l + 1);
    track(i, j + 1, l + 1);
    track(i - 1, j, l + 1);
    track(i, j - 1, l + 1);

    board[i][j] = pre;
  };

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      track(i, j, 0);
    }
  }

  return ans;
}
