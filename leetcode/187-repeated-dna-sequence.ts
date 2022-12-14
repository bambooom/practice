// https://leetcode.com/problems/repeated-dna-sequences/
// #hash-table #sliding-window #rolling-hash
// Given a string s that represents a DNA sequence, return all the 10-letter-long sequences (substrings) that occur more than once in a DNA molecule. You may return the answer in any order.

// Time: O(K * (N-K+1)), N-K+1 substrings are possible where K = 10
// Space: O(K * (N-K+1))
function findRepeatedDnaSequences(s: string): string[] {
  if (s.length < 10) {
    return [];
  }
  let curr = s.slice(0, 10);
  const seen: Set<string> = new Set(curr);
  const res: Set<string> = new Set();
  for (let i = 10; i < s.length; i++) {
    curr = curr.slice(1) + s[i];
    if (seen.has(curr)) {
      res.add(curr);
    }
    seen.add(curr);
  }
  return [...res];
}

// Rolling Hash

type DNA = 'A' | 'C' | 'G' | 'T';
const findRepeatedDnaSequences2 = function (s: string): string[] {
  if (s.length < 10) {
    return [];
  }
  const hashSet: Set<number> = new Set();
  let hash = 0;
  const windowSize = 10,
    base = 4;
  const decoded = { A: 1, C: 2, G: 3, T: 4 };
  // process the first window separately
  for (let i = 0; i < 10; i++) {
    hash += Math.pow(base, windowSize - i - 1) * decoded[s[i] as DNA];
  }
  hashSet.add(hash);
  const res: Set<string> = new Set();
  for (let i = 10; i < s.length; i++) {
    // subtract the left-most bit
    hash -= Math.pow(base, windowSize - 1) * decoded[s[i - windowSize] as DNA];
    hash *= base;
    hash += decoded[s[i] as DNA];
    if (hashSet.has(hash)) {
      res.add(s.substring(i + 1 - windowSize, i + 1));
    } else {
      hashSet.add(hash);
    }
  }
  return Array.from(res);
  // T.C: O(K*(N-K+1)) where K = 10 in the worst case
  // but average time complexity will be O(N-K+1) which is much better
  // S.C: O(K*(N-K+1))
};
