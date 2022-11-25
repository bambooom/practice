// valid sudoku

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
