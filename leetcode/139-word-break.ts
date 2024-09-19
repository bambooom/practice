// https://leetcode.com/problems/word-break/description/
// Given a string s and a dictionary of strings wordDict, return true if s can be segmented into a space-separated sequence of one or more dictionary words.
// Note that the same word in the dictionary may be reused multiple times in the segmentation.

// Example 1:
// Input: s = "leetcode", wordDict = ["leet","code"]
// Output: true
// Explanation: Return true because "leetcode" can be segmented as "leet code".
// Example 2:
// Input: s = "applepenapple", wordDict = ["apple","pen"]
// Output: true
// Explanation: Return true because "applepenapple" can be segmented as "apple pen apple".
// Note that you are allowed to reuse a dictionary word.
// Example 3:
// Input: s = "catsandog", wordDict = ["cats","dog","sand","and","cat"]
// Output: false

// https://leetcode.com/problems/word-break/solutions/4453481/conquering-dp-mastering-word-break-with-expert-strategies-beginner-friendly/?envType=study-plan-v2&envId=top-100-liked
// dynamic programming
// top down approach
function wordBreak(s: string, wordDict: string[]): boolean {
  const memo: number[] = new Array(s.length + 1).fill(-1);

  const recursive = (i: number): boolean => {
    if (i === s.length) {
      return true;
    }

    if (memo[i] !== -1) {
      return memo[i] === 1;
    }

    let ans = false;
    for (const word of wordDict) {
      if (s.startsWith(word, i)) {
        ans = ans || recursive(i + word.length);
      }
    }

    memo[i] = ans ? 1 : 0;
    return ans;
  };

  return recursive(0);
}

// bottom up approach
function wordBreak2(s: string, wordDict: string[]): boolean {
  const memo: number[] = new Array(s.length + 1).fill(0);
  memo[s.length] = 1;

  for (let i = s.length - 1; i >= 0; i--) {
    let ans = false;
    for (let j = 0; j < wordDict.length; j++) {
      if (s.substring(i, i + wordDict[j].length) === wordDict[j]) {
        ans = ans || memo[i + wordDict[j].length] === 1;
      }
    }

    memo[i] = ans ? 1 : 0;
  }

  return memo[0] === 1;
}
