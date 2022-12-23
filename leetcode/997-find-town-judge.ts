// https://leetcode.com/problems/find-the-town-judge/
// You are given an array trust where trust[i] = [ai, bi] representing that the person labeled ai trusts the person labeled bi.
// Return the label of the town judge if the town judge exists and can be identified, or return -1 otherwise.

function findJudge(n: number, trust: number[][]): number {
  const trustCounts = Array(n + 1).fill(0);
  for (const [a, b] of trust) {
    trustCounts[a]--;
    trustCounts[b]++;
  }

  for (let i = 1; i < trustCounts.length; i++) {
    if (trustCounts[i] === n - 1) {
      return i;
    }
  }
  return -1;
}
