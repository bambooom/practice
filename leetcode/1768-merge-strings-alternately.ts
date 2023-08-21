// https://leetcode.com/problems/merge-strings-alternately/

function mergeAlternately(word1: string, word2: string): string {
  let res = '';
  let i = 0;
  let j = 0;

  while (i < word1.length && j < word2.length) {
    res += word1[i] + word2[j];
    i++;
    j++;
  }

  if (i === word1.length && j < word2.length) {
    res += word2.slice(j);
  } else if (i < word1.length && j === word2.length) {
    res += word1.slice(i);
  }

  return res;
}

// compact solution
function mergeAlternately2(word1: string, word2: string): string {
  let response = '';

  for (let i = 0; i < Math.max(word1.length, word2.length); i++) {
    if (i < word1.length) response += word1[i];
    if (i < word2.length) response += word2[i];
  }

  return response;
}
