// https://leetcode.com/problems/detect-capital/

// my answer
function detectCapitalUse(word: string): boolean {
  return (
    word.toUpperCase() === word ||
    word.toLowerCase() === word ||
    (word[0].toUpperCase() === word[0] &&
      word.slice(1).toLowerCase() === word.slice(1))
  );
}

// improved
function detectCapitalUse2(word: string): boolean {
  return (
    word === word.toUpperCase() ||
    word === word[0] + word.slice(1).toLowerCase()
  );
}
