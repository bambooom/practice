// https://leetcode.com/problems/open-the-lock/
// #bread-first search

function openLock(deadends: string[], target: string): number {
  const dead = new Set(deadends);
  const queue: [string, number][] = [['0000', 0]];
  const seen = new Set(['0000']);

  for (const [curr, turns] of queue) {
    if (curr === target) return turns;
    if (dead.has(curr)) continue;
    for (const next of getNextStates(curr)) {
      if (seen.has(next)) continue;
      seen.add(next);
      queue.push([next, turns + 1]);
    }
  }

  return -1;
}

function getNextStates(s = '0000'): string[] {
  const ans: string[] = [];
  for (let i = 0; i < s.length; i++) {
    ans.push(s.slice(0, i) + ((+s[i] + 1) % 10).toString() + s.slice(i + 1));
    ans.push(s.slice(0, i) + ((+s[i] + 9) % 10).toString() + s.slice(i + 1));
  }

  return ans;
}
