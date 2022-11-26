// Given a string s, find the first non-repeating character in it and return its index. If it does not exist, return -1.

function firstUniqChar(s: string): number {
  const hash: Map<string, number> = new Map();
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (hash.has(c)) {
      hash.set(c, (hash.get(c) as number) + 1);
    } else {
      hash.set(c, 1);
    }
  }
  const uniq = [...hash.entries()].filter(([c, count]) => count === 1);
  if (uniq.length) return s.indexOf(uniq[0][0]);
  return -1;
}

console.log(firstUniqChar('leetcode')); // 0
