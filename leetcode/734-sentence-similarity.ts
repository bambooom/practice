// https://leetcode.com/problems/sentence-similarity/
// Given two sentences sentence1 and sentence2 each represented as a string array and given an array of string pairs similarPairs where similarPairs[i] = [xi, yi] indicates that the two words xi and yi are similar.
// Return true if sentence1 and sentence2 are similar, or false if they are not similar.
// Two sentences are similar if:
// They have the same length (i.e., the same number of words)
// sentence1[i] and sentence2[i] are similar.
// Notice that a word is always similar to itself, also notice that the similarity relation is not transitive. For example, if the words a and b are similar, and the words b and c are similar, a and c are not necessarily similar.

function areSentencesSimilar(
  sentence1: string[],
  sentence2: string[],
  similarPairs: string[][],
): boolean {
  if (sentence1.length !== sentence2.length) return false;
  // 需要用 set，因为一个词可能有多个 similar word
  const hash = new Map<string, Set<string>>();
  for (const [a, b] of similarPairs) {
    if (!hash.has(a)) {
      hash.set(a, new Set<string>());
    }
    if (!hash.has(b)) {
      hash.set(b, new Set<string>());
    }
    hash.get(a)!.add(b);
    hash.get(b)!.add(a);
  }

  for (let i = 0; i < sentence1.length; i++) {
    const w1 = sentence1[i];
    const w2 = sentence2[i];
    if (w1 === w2) continue;
    if (!hash.get(w1)?.has(w2)) return false;
    if (!hash.get(w2)?.has(w1)) return false;
  }

  return true;
}
