// https://leetcode.com/problems/maximum-score-after-splitting-a-string/
// Given a string s of zeros and ones, return the maximum score after splitting the string into two non-empty substrings (i.e. left substring and right substring).
// The score after splitting a string is the number of zeros in the left substring plus the number of ones in the right substring.

// Example 1:
// Input: s = "011101"
// Output: 5
// Explanation:
// All possible ways of splitting s into two non-empty substrings are:
// left = "0" and right = "11101", score = 1 + 4 = 5
// left = "01" and right = "1101", score = 1 + 3 = 4
// left = "011" and right = "101", score = 1 + 2 = 3
// left = "0111" and right = "01", score = 1 + 1 = 2
// left = "01110" and right = "1", score = 2 + 1 = 3

// Example 2:
// Input: s = "00111"
// Output: 5
// Explanation: When left = "00" and right = "111", we get the maximum score = 2 + 3 = 5

// Example 3:
// Input: s = "1111"
// Output: 3

// straight forward solution
function maxScore(s: string): number {
  let max = 0;

  for (let i = 1; i < s.length; i++) {
    const score =
      s.substring(0, i).split('0').length -
      1 +
      s.substring(i).split('1').length -
      1;
    max = Math.max(max, score);
  }
  return max;
}

// https://leetcode.com/problems/maximum-score-after-splitting-a-string/solutions/6211309/beat-100-users-with-a-single-loop-with-proof-dynamic-counting-maximum-efficiency/
// faster
function maxScore2(s: string): number {
  let ones = s.split('').filter((c) => c === '1').length;
  let zeroes = 0,
    maxSum = 0;

  for (let i = 0; i < s.length - 1; i++) {
    if (s[i] === '0') zeroes++;
    else ones--;
    maxSum = Math.max(maxSum, zeroes + ones);
  }
  return maxSum;
}

// https://leetcode.com/problems/maximum-score-after-splitting-a-string/solutions/6211354/beats-100-users-with-c-typescript-python3-java/
function maxScore3(s: string): number {
  let maxScore = 0;
  let leftZeros = 0;
  let rightOnes = 0;

  // Count the number of ones in the entire string
  for (const char of s) {
    if (char === '1') {
      rightOnes++;
    }
  }

  // Iterate through the string and calculate the score for each split
  for (let i = 0; i < s.length - 1; i++) {
    if (s[i] === '0') {
      leftZeros++;
    } else {
      rightOnes--;
    }
    const currentScore = leftZeros + rightOnes;
    maxScore = Math.max(maxScore, currentScore);
  }

  return maxScore;
}
