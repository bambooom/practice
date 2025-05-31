// https://leetcode.com/problems/snakes-and-ladders/
// You are given an n x n integer matrix board where the cells are labeled from 1 to n2 in a Boustrophedon style starting from the bottom left of the board (i.e. board[n - 1][0]) and alternating direction each row.
// You start on square 1 of the board. In each move, starting from square curr, do the following:

// Choose a destination square next with a label in the range [curr + 1, min(curr + 6, n2)].
// This choice simulates the result of a standard 6-sided die roll: i.e., there are always at most 6 destinations, regardless of the size of the board.
// If next has a snake or ladder, you must move to the destination of that snake or ladder. Otherwise, you move to next.
// The game ends when you reach the square n2.
// A board square on row r and column c has a snake or ladder if board[r][c] != -1. The destination of that snake or ladder is board[r][c]. Squares 1 and n2 are not the starting points of any snake or ladder.

// Note that you only take a snake or ladder at most once per dice roll. If the destination to a snake or ladder is the start of another snake or ladder, you do not follow the subsequent snake or ladder.

// For example, suppose the board is [[-1,4],[-1,3]], and on the first move, your destination square is 2. You follow the ladder to square 3, but do not follow the subsequent ladder to 4.
// Return the least number of dice rolls required to reach the square n2. If it is not possible to reach the square, return -1.

// Example 1:
// Input: board = [[-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1],[-1,35,-1,-1,13,-1],[-1,-1,-1,-1,-1,-1],[-1,15,-1,-1,-1,-1]]
// Output: 4
// Explanation:
// In the beginning, you start at square 1 (at row 5, column 0).
// You decide to move to square 2 and must take the ladder to square 15.
// You then decide to move to square 17 and must take the snake to square 13.
// You then decide to move to square 14 and must take the ladder to square 35.
// You then decide to move to square 36, ending the game.
// This is the lowest possible number of moves to reach the last square, so return 4.

// Example 2:
// Input: board = [[-1,-1],[-1,3]]
// Output: 1

// https://leetcode.com/problems/snakes-and-ladders/solutions/3658919/basic-bfs-traversal-w-steps-processed-in-batches/?envType=daily-question&envId=2025-05-31
// BFS
// Intuition
// Use BFS to to simulate an expanding set of moves starting at square 1
// When the BFS reaches the last location, you have reached the end
// In graph traversal problems, questions that ask for the "minimal" number of moves hint a BFS traversal as an option
// When doing the BFS you have two options of tracking the moves count
// You can encode it with the next step in the work queue
// You can process your work queue in 'batches' that share the same move count
// Approach
//  - Create a helper function that can take a 1-based board location and lookup the corresponding value in the board. This is a combination of mod and division math.
//  - Create a BFS, with a work queue starting at position 1
//  - Process the queue in batches of # of steps taken so far
//  - For each queue location, you want to find what new locations you can reach.
//  - To do this, consider each dice throw between 1 and 6 as possible new locations. If a dice throws would end on a snake/ladder, the possible location is the END of the snake/ladder
//  - If one of the possible locations is the winning state, return the steps so far.
//  - Otherwise, add each possible new, unseen location to the pending queue.
function snakesAndLadders(board: number[][]): number {
  const DICE = [1, 2, 3, 4, 5, 6];
  const n = board.length;
  const end = n * n;
  const seen = new Set<number>();

  let queue: number[] = [1];
  let steps = 1;

  const getValue = (board: number[][], loc: number): number => {
    const pos = loc - 1; // board is 1-based, but data is proposed
    const n = board.length;
    const rowFromBottom = Math.floor(pos / n);
    const row = n - 1 - rowFromBottom;

    const offset = pos % n;
    const isBackWards = rowFromBottom % 2 === 1;
    const col = isBackWards ? n - 1 - offset : offset;

    return board[row][col];
  };

  while (queue.length > 0) {
    const pending: number[] = [];

    while (queue.length > 0) {
      const i = queue.shift()!;
      for (const dice of DICE) {
        let loc = i + dice;
        const val = getValue(board, loc);
        if (val !== -1) {
          loc = val;
        }

        if (seen.has(loc) || loc > end) {
          continue;
        }
        if (loc === end) {
          return steps;
        }

        seen.add(loc);
        pending.push(loc);
      }
    }

    queue = pending;
    steps++;
  }

  return -1;
}
