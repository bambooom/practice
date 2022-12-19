// https://leetcode.com/problems/campus-bikes-ii/description/
// #dynamic-programing #backtracking
// https://leetcode.com/problems/campus-bikes-ii/solutions/2918743/js-dp-with-backtracking-and-memoization-beats-95-by-speed/
// we describe what steps we can take in each stage, and pick steps with the min path.
// dp function excepts current worker and array of taken bikes.
// we can improve it by using bit mask instead of array(check off solution)

function assignBikes(workers: number[][], bikes: number[][]): number {
  const getDist = (p1: number[], p2: number[]): number =>
    Math.abs(p1[0] - p2[0]) + Math.abs(p1[1] - p2[1]);

  const n = workers.length;
  const m = bikes.length;
  const matrix: number[][] = new Array(n).fill(0).map(() => new Array(m));

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      matrix[i][j] = getDist(workers[i], bikes[j]);
    }
  }

  const memo = new Map<string, number>();

  const dp = (w: number, taken: number[]): number => {
    const newTaken = [...taken];
    const key = taken.join('');
    if (memo.has(key)) {
      return memo.get(key) as number; //without memoization it wll be m!
    }

    const res: number[] = [];
    for (let i = 0; i < m; i++) {
      if (taken[i] === 0) {
        newTaken[i] = 1;
        if (w + 1 < n) {
          res.push(matrix[w][i] + dp(w + 1, newTaken));
        } else {
          res.push(matrix[w][i]);
        }
        newTaken[i] = 0; //backtracking
      }
    }
    const min = Math.min(...res);
    memo.set(key, min);

    return min;
  };

  const res = dp(0, new Array(m).fill(0));

  return res;
}
