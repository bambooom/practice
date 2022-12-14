// https://leetcode.com/problems/substring-with-concatenation-of-all-words/
// #hash table #sliding window
function findSubstring(s: string, words: string[]): number[] {
  if (!s || !words.length) return [];
  const wLen = words[0].length;
  const Len = words.length * wLen;
  if (s.length < Len) return [];
  const hashWords = new Map<string, number>();
  for (const w of words) {
    if (hashWords.has(w)) {
      hashWords.set(w, (hashWords.get(w) as number) + 1);
    } else {
      hashWords.set(w, 1);
    }
  }

  const res: number[] = [];
  for (let i = 0; i < s.length - Len + 1; i++) {
    const cur = s.slice(i, i + Len);
    if (isPermutation(cur, hashWords, wLen)) {
      res.push(i);
    }
  }
  return res;
}

function isPermutation(
  str: string,
  hashWords: Map<string, number>,
  wLen: number,
): boolean {
  const splited = [...(str.match(new RegExp('.{1,' + wLen + '}', 'g')) || [])];
  const hashStr = new Map<string, number>();
  for (const w of splited) {
    if (hashStr.has(w)) {
      hashStr.set(w, (hashStr.get(w) as number) + 1);
    } else {
      hashStr.set(w, 1);
    }
  }
  return splited.every((w) => hashStr.get(w) === hashWords.get(w));
}

console.log(
  findSubstring('wordgoodgoodgoodbestword', ['word', 'good', 'best', 'good']),
); // [8]

// not a perfect solution, as time slow
