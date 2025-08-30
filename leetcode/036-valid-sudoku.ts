// https://leetcode.com/problems/valid-sudoku
// valid sudoku
// Determine if a 9 x 9 Sudoku board is valid. Only the filled cells need to be validated according to the following rules:
// Each row must contain the digits 1-9 without repetition.
// Each column must contain the digits 1-9 without repetition.
// Each of the nine 3 x 3 sub-boxes of the grid must contain the digits 1-9 without repetition.
// Note:
// A Sudoku board (partially filled) could be valid but is not necessarily solvable.
// Only the filled cells need to be validated according to the mentioned rules.

// stupid solution, not scalable
function isValidSudoku(board: string[][]): boolean {
  const validLine = (line: string[]) => {
    const d = line.filter((d) => d !== '.');
    return d.length === new Set(d).size;
  };
  const validRows = board.every((row) => validLine(row));
  const validCols = board
    .reduce(
      (acc: string[][], cur, r) => {
        cur.forEach((e, i) => {
          acc[i].push(e);
        });
        return acc;
      },
      Array(9)
        .fill(null)
        .map(() => []),
    )
    .every((col) => validLine(col));

  // 3x3 block
  const idxg1 = [0, 1, 2];
  const idxg2 = [3, 4, 5];
  const idxg3 = [6, 7, 8];
  const blocks = [];
  for (let i = 0; i < 9; i++) {
    const left = i <= 2 ? idxg1 : i <= 5 ? idxg2 : idxg3;
    const right = i % 3 === 0 ? idxg1 : i % 3 === 1 ? idxg2 : idxg3;
    const line = [];
    for (let j = 0; j < 9; j++) {
      const lIdx = j <= 2 ? 0 : j <= 5 ? 1 : 2;
      const rIdx = j % 3;
      line.push(board[left[lIdx]][right[rIdx]]);
    }
    blocks.push(line);
  }

  const validBlocks = blocks.every((block) => validLine(block));
  return validRows && validCols && validBlocks;
}

const board = [
  ['5', '3', '.', '.', '7', '.', '.', '.', '.'],
  ['6', '.', '.', '1', '9', '5', '.', '.', '.'],
  ['.', '9', '8', '.', '.', '.', '.', '6', '.'],
  ['8', '.', '.', '.', '6', '.', '.', '.', '3'],
  ['4', '.', '.', '8', '.', '3', '.', '.', '1'],
  ['7', '.', '.', '.', '2', '.', '.', '.', '6'],
  ['.', '6', '.', '.', '.', '.', '2', '8', '.'],
  ['.', '.', '.', '4', '1', '9', '.', '.', '5'],
  ['.', '.', '.', '.', '8', '.', '.', '7', '9'],
];

console.log(isValidSudoku(board));

// a cleverer solution
const isValidSudoku2 = function (board: string[][]) {
  for (let i = 0; i < 9; i++) {
    const row = new Set(),
      col = new Set(),
      box = new Set();

    for (let j = 0; j < 9; j++) {
      const _row = board[i][j];
      const _col = board[j][i];
      const _box =
        board[3 * Math.floor(i / 3) + Math.floor(j / 3)][3 * (i % 3) + (j % 3)];

      if (_row != '.') {
        if (row.has(_row)) return false;
        row.add(_row);
      }
      if (_col != '.') {
        if (col.has(_col)) return false;
        col.add(_col);
      }

      if (_box != '.') {
        if (box.has(_box)) return false;
        box.add(_box);
      }
    }
  }
  return true;
};

// https://leetcode.com/problems/valid-sudoku/solutions/3474482/typescript-easy-solution-using-set/?envType=daily-question&envId=2025-08-30
function isValidSudoku3(board: string[][]): boolean {
  const set = new Set();

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      const cell = board[i][j];
      if (cell === '.') continue;

      const row = `row: ${i}, value: ${cell}`;
      const column = `column: ${j}, value: ${cell}`;
      const boxNumber = 3 * Math.floor(i / 3) + Math.floor(j / 3);
      const box = `boxNumber: ${boxNumber}, value: ${cell}`;

      if (set.has(row) || set.has(column) || set.has(box)) return false;
      set.add(row).add(column).add(box);
    }
  }
  return true;
}

// https://leetcode.com/problems/valid-sudoku/solutions/7136639/valid-sudoku-100-beat-o-1-java-c-c-c-python3-go-javascript-typescript/?envType=daily-question&envId=2025-08-30
function isValidSudoku4(board: string[][]): boolean {
  const rows: boolean[][] = Array.from({ length: 9 }, () =>
    Array(9).fill(false),
  );
  const cols: boolean[][] = Array.from({ length: 9 }, () =>
    Array(9).fill(false),
  );
  const boxes: boolean[][] = Array.from({ length: 9 }, () =>
    Array(9).fill(false),
  );

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j] !== '.') {
        const num = board[i][j].charCodeAt(0) - '1'.charCodeAt(0);
        const boxIndex = Math.floor(i / 3) * 3 + Math.floor(j / 3);

        if (rows[i][num] || cols[j][num] || boxes[boxIndex][num]) {
          return false;
        }

        rows[i][num] = cols[j][num] = boxes[boxIndex][num] = true;
      }
    }
  }
  return true;
}
