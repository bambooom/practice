// https://leetcode.com/problems/partition-labels/
// #hash table, #two pointer
// You are given a string s. We want to partition the string into as many parts as possible so that each letter appears in at most one part.
// Note that the partition is done so that after concatenating all the parts in order, the resultant string should be s.
// Return a list of integers representing the size of these parts.

// Input: s = "ababcbacadefegdehijhklij"
// Output: [9,7,8]
// Explanation:
// The partition is "ababcbaca", "defegde", "hijhklij".
// This is a partition so that each letter appears in at most one part.
// A partition like "ababcbacadefegde", "hijhklij" is incorrect, because it splits s into less parts.

// Input: s = "eccbbbbdec"
// Output: [10]

//  Consider the first label, say it's 'a'. The first partition must include it, and also the last occurrence of 'a'.
// However, between those two occurrences of 'a', there could be other labels that make the minimum size of this partition bigger.
// For example, in "abccaddbeffe", the minimum first partition is "abccaddb".This gives us the idea for the algorithm:
// For each letter encountered, process the last occurrence of that letter, extending the current partition[anchor, j] appropriately.

function partitionLabels(s: string): number[] {
  if (!s) return [];
  let last = -1;
  const res: number[] = [];
  let left = 0;
  for (let i = 0; i < s.length; i++) {
    last = Math.max(s.lastIndexOf(s[i]), last);
    if (i === last) {
      res.push(i - left + 1);
      left = i + 1; // move left pointer
    }
  }
  return res;
}

function partitionLabels2(s: string): number[] {
  let l = 0;
  let r = 0;
  const lastMap = new Map<string, number>();
  const res = [];
  for (let i = 0; i < s.length; i += 1) {
    lastMap.set(s[i], i);
  }
  for (let i = 0; i < s.length; i += 1) {
    const cur = s[i];
    r = Math.max(lastMap.get(cur)!, r);
    if (i === r) {
      res.push(r - l + 1);
      l = r + 1;
    }
  }
  return res;
}
