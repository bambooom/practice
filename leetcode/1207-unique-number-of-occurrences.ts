// https://leetcode.com/problems/unique-number-of-occurrences

function uniqueOccurrences(arr: number[]): boolean {
  const hash = new Map();

  for (let i = 0; i < arr.length; i++) {
    hash.set(arr[i], (hash.has(arr[i]) ? hash.get(arr[i]) : 0) + 1);
  }

  const values = Array.from(hash.values());
  return hash.size === [...new Set(values)].length;
}
