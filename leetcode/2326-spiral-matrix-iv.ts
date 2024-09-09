// https://leetcode.com/problems/spiral-matrix-iv
// You are given two integers m and n, which represent the dimensions of a matrix.
// You are also given the head of a linked list of integers.
// Generate an m x n matrix that contains the integers in the linked list presented in spiral order (clockwise), starting from the top-left of the matrix. If there are remaining empty spaces, fill them with -1.
// Return the generated matrix.

// Example1:
// Input: m = 3, n = 5, head = [3,0,2,6,8,1,7,9,4,2,5,5,0]
// Output: [[3,0,2,6,8],[5,0,-1,-1,1],[5,2,4,9,7]]
// Explanation: The diagram above shows how the values are printed in the matrix.
// Note that the remaining spaces in the matrix are filled with -1.

import { ListNode } from './util';

class Dir {
  i = 0;
  j = 1;

  turnRight() {
    const temp = this.i;
    this.i = this.j;
    this.j = temp * -1;
  }
}
// https://leetcode.com/problems/spiral-matrix-iv/solutions/5232150/cleanest-and-very-fast-ts-solution/?envType=daily-question&envId=2024-09-09
function spiralMatrix(m: number, n: number, head: ListNode | null): number[][] {
  const spiral = Array.from({ length: m }, () => Array(n).fill(-1));

  let i = 0;
  let j = 0;

  const dir = new Dir();

  while (head) {
    spiral[i][j] = head.val;

    let nextSquare = spiral[i + dir.i]
      ? spiral[i + dir.i][j + dir.j]
      : undefined;
    if (!nextSquare || nextSquare !== -1) {
      dir.turnRight();

      nextSquare = spiral[i + dir.i] ? spiral[i + dir.i][j + dir.j] : undefined;
      if (!nextSquare || nextSquare !== -1) break;
    }

    i += dir.i;
    j += dir.j;

    head = head.next;
  }

  return spiral;
}
