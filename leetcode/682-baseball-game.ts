// https://leetcode.com/problems/baseball-game/
function calPoints(operations: string[]): number {
  const res: number[] = [];

  for (let i = 0; i < operations.length; i++) {
    if (Number.isInteger(Number(operations[i]))) {
      res.push(Number(operations[i]));
    } else if (operations[i] === '+') {
      const rec: number =
        res.length >= 2
          ? res[res.length - 1] + res[res.length - 2]
          : res.length === 1
          ? res[res.length - 1]
          : 0;
      res.push(rec);
    } else if (operations[i] === 'D') {
      const rec: number = res.length >= 1 ? 2 * res[res.length - 1] : 0;
      res.push(rec);
    } else if (operations[i] === 'C') {
      if (res.length >= 1) {
        res.pop();
      }
    }
  }

  return res.reduce((acc, cur) => acc + cur, 0);
}
