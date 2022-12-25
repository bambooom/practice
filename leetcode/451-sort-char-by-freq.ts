// https://leetcode.com/problems/sort-characters-by-frequency/

function frequencySort(s: string): string {
  const hash = new Map<string, number>();

  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    hash.set(c, hash.get(c) ? (hash.get(c) as number) + 1 : 1);
  }

  const sorted = [...hash.entries()].sort((a, b) => b[1] - a[1]);
  return sorted.reduce((acc, cur) => acc + cur[0].repeat(cur[1]), '');
}

console.log(frequencySort('tree'));
