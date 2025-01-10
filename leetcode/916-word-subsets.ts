// https://leetcode.com/problems/word-subsets/description
// You are given two string arrays words1 and words2.
// A string b is a subset of string a if every letter in b occurs in a including multiplicity.
// For example, "wrr" is a subset of "warrior" but is not a subset of "world".
// A string a from words1 is universal if for every string b in words2, b is a subset of a.
// Return an array of all the universal strings in words1. You may return the answer in any order.

// Example 1:
// Input: words1 = ["amazon","apple","facebook","google","leetcode"], words2 = ["e","o"]
// Output: ["facebook","google","leetcode"]

// Example 2:
// Input: words1 = ["amazon","apple","facebook","google","leetcode"], words2 = ["l","e"]
// Output: ["apple","google","leetcode"]

// straightforward solution, but too slow
function wordSubsets2(words1: string[], words2: string[]): string[] {
  const isSubset = (word1: string, word2: string): boolean => {
    const count1: Map<string, number> = new Map();
    const count2: Map<string, number> = new Map();

    for (const c of word1) count1.set(c, (count1.get(c) || 0) + 1);
    for (const c of word2) count2.set(c, (count2.get(c) || 0) + 1);

    return [...count2.entries()].every(([c, v]) => (count1.get(c) || 0) >= v);
  };

  return words1.filter((word1) =>
    words2.every((word2) => isSubset(word1, word2)),
  );
}

// https://leetcode.com/problems/word-subsets/solutions/2355574/js-ts-solution/
function wordSubsets(words1: string[], words2: string[]): string[] {
  const parents: string[] = [];
  const maxCharMap = new Map<string, number>();

  // find maximum occurences of characters
  words2.forEach((word) => {
    const charMap = new Map<string, number>();
    Array.from(word).forEach((char) => {
      charMap.set(char, (charMap.get(char) || 0) + 1);
    });

    charMap.forEach((count, char) => {
      maxCharMap.set(char, Math.max(maxCharMap.get(char) || 0, count));
    });
  });

  // check for the word that meets the need of characters occurences
  words1.forEach((word) => {
    let isParent = true;

    maxCharMap.forEach((count, char) => {
      if (isParent) {
        isParent = word.split(char).length - 1 >= count;
      }
    });

    if (isParent) {
      parents.push(word);
    }
  });

  return parents;
}
