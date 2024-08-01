// https://leetcode.com/problems/number-of-senior-citizens

function countSeniors(details: string[]): number {
  let count = 0;
  for (const a of details) {
    const y = +a.substring(11, 13);
    if (y > 60) {
      count++;
    }
  }

  return count;
}
