// https://leetcode.com/problems/top-k-frequent-words/
// Given an array of strings words and an integer k, return the k most frequent strings.
// Return the answer sorted by the frequency from highest to lowest. Sort the words with the same frequency by their lexicographical order.

function topKFrequentWords(words: string[], k: number): string[] {
  const hash: { [key: string]: number } = {};
  for (const word of words) {
    hash[word] = hash[word] + 1 || 1;
  }
  const result = Object.keys(hash).sort((a, b) => {
    const countCompare = hash[b] - hash[a];
    if (countCompare == 0) return a.localeCompare(b);
    else return countCompare;
  });
  return result.slice(0, k);
}
