// https://leetcode.com/problems/group-anagrams/

function groupAnagrams(strs: string[]): string[][] {
  const map = new Map();
  for (const str of strs) {
    const sorted = str.split('').sort().join('');
    if (map.has(sorted)) {
      map.set(sorted, [...map.get(sorted), str]);
    } else {
      map.set(sorted, [str]);
    }
  }

  return Array.from(map.values());
}
