// https://leetcode.com/problems/valid-word-square/
// Given an array of strings words, return true if it forms a valid word square.
// A sequence of strings forms a valid word square if the kth row and column read the same string, where 0 <= k < max(numRows, numColumns).

// direct compare ith row and col string
function validWordSquare(words: string[]): boolean {
  for (let i = 0; i < words.length; i++) {
    const row = words[i];
    const col = words.map((v) => v[i]).join('');
    if (row !== col) {
      return false;
    }
  }
  return true;
}

function validWordSquare2(words: string[]): boolean {
  const length = Math.max(...words.map((m) => m.length));
  let i = 0;
  while (i < length) {
    for (let j = 0; j < words.length; j++) {
      if ((words[i] && !words[j]) || (words[j] && !words[i])) return false;
      if (words[j][i] !== words[i][j]) return false;
    }
    i++;
  }
  return true;
}

// compare different (i,j) directly
function validWordSquare3(words: string[]): boolean {
  for (let i = 0; i < words.length; i++) {
    const wordLen = words[i].length;
    for (let j = 0; j < wordLen; j++) {
      if (!words[j] || words[i][j] !== words[j][i]) return false; //jth word doesn't exist in the list OR characters don't match
    }
  }
  return true;
}
