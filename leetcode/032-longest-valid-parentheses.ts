// https://leetcode.com/problems/longest-valid-parentheses
// Given a string containing just the characters '(' and ')', return the length of the longest valid (well-formed) parentheses substring
// dynamic programming, stack

// https://leetcode.com/problems/longest-valid-parentheses/solutions/2070202/js-ts-dynamic-programming-solution-explained/?envType=study-plan-v2&envId=top-100-liked
// Algorithm:
// 1. initialize dp array with 0, the length of the array = the length of the input string
// 2. checking adjacent characters of the given string, s[i-1], s[i]
//    only two conditions:
//    a. s[ i - 1 ] == ' ( ' && s[ i ] == ' ) ';
//      - means that we found a valid '()' of length 2, so we update dp as dp[i] = 2
//      - but it cound be a subsequent valid substring, so have to check do[i-2], and the resulting equation for condition a will be dp[ i ] = 2 + dp[ i - 2]
//    b. s[ i - 1 ] == ' ) ' && s[ i ] == ' ) '.
//      - means that s[ i ] could be a closing parentheses
//      - In this case we already checked s[ i - 1 ] at the previous step and it could be a part of the previous valid or invalid substring, let's call it subi-1. Also we have already put some value in dp[ i - 1 ]. Thus, only s[ i ] needs further investigation.
//      - We have to check if the character before subi-1 equals ' ( '. To do that we subtract the value of dp[ i - 1 ] (the length of subi-1) plus 1, from i to get the resulting equation s[ i - (dp[ i - 1 ] + 1) ].
//      - In this example, for i = 7 we have to check the character at i = 2: s[ 7 - (4 + 1) ] => s[ 2 ] == ' ( ', if true we will put in dp[ i ] = 2 + dp [ i - 1] + dp[ i - (dp[ i - 1] + 2) ]. The last term dp[ i - (dp[ i - 1] + 2) ] appears because we also have to check if there a valid substring just before the considering substring.

function longestValidParentheses(s: string): number {
  // maxLength variable is used to monitor the maximum length of the valid substring
  // every time we fall in condition a. or b.
  // by using it we don't need to find the maximum value in the resulting dp array
  let maxLength = 0;
  const dp = new Array(s.length).fill(0);

  for (let i = 1; i < s.length; i++) {
    if (s[i - 1] === '(' && s[i] === ')') {
      // condition a
      dp[i] = 2 + (dp[i - 2] || 0); // dp[i-2] can return undefined
      maxLength = Math.max(maxLength, dp[i]);
    }

    if (s[i - 1] === ')' && s[i] === ')' && s[i - dp[i - 1] - 1] === '(') {
      // condition b
      dp[i] = 2 + dp[i - 1] + (dp[i - dp[i - 1] - 2] || 0);
      maxLength = Math.max(maxLength, dp[i]);
    }
  }
  return maxLength;
}

// https://leetcode.com/problems/longest-valid-parentheses/solutions/4619860/determine-the-length-of-the-longest-valid-parentheses-substring-in-typescript/?envType=study-plan-v2&envId=top-100-liked
// stack. faster
function longestValidParentheses2(s: string): number {
  let maxLen = 0;
  const stack: number[] = [-1];
  for (let i = 0; i < s.length; i++) {
    if (s[i] === '(') {
      stack.push(i);
    } else {
      stack.pop();
      if (stack.length === 0) {
        stack.push(i);
      } else {
        maxLen = Math.max(maxLen, i - stack[stack.length - 1]);
      }
    }
  }
  return maxLen;
}
