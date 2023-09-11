// https://leetcode.com/problems/determine-if-two-strings-are-close/
// Two strings are considered close if you can attain one from the other using the following operations:

// Operation 1: Swap any two existing characters.
// For example, abcde -> aecdb
// Operation 2: Transform every occurrence of one existing character into another existing character, and do the same with the other character.
// For example, aacabb -> bbcbaa (all a's turn into b's, and all b's turn into a's)
// You can use the operations on either string as many times as necessary.

// Given two strings, word1 and word2, return true if word1 and word2 are close, and false otherwise.

// 观察 example 大致可以得出：
// - 两个 word 需要相同长度
// - 两个 word 含有相同的字母
// - 字母的 count 相同，但无所谓是哪个字母 freq，因为可以通过 operation 2 来进行替换

function closeStrings(word1: string, word2: string): boolean {
  if (word1.length !== word2.length) return false;

  const dict1 = new Map<string, number>();
  const dict2 = new Map<string, number>();

  for (let i = 0; i < word1.length; i++) {
    const c1 = word1[i];
    const c2 = word2[i];
    dict1.set(c1, (dict1.get(c1) ?? 0) + 1);
    dict2.set(c2, (dict2.get(c2) ?? 0) + 1);
  }

  for (const key of dict1.keys()) {
    if (!dict2.has(key)) {
      return false;
    }
  }

  const s1 = [...dict1.values()].sort((a, b) => a - b).toString();
  const s2 = [...dict2.values()].sort((a, b) => a - b).toString();
  // need the count of the characters are the same
  return s1 === s2;
}
