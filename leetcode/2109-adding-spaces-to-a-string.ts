// https://leetcode.com/problems/adding-spaces-to-a-string
// You are given a 0-indexed string s and a 0-indexed integer array spaces that describes the indices in the original string where spaces will be added. Each space should be inserted before the character at the given index.
// For example, given s = "EnjoyYourCoffee" and spaces = [5, 9], we place spaces before 'Y' and 'C', which are at indices 5 and 9 respectively. Thus, we obtain "Enjoy Your Coffee".
// Return the modified string after the spaces have been added.

// Example 1:
// Input: s = "LeetcodeHelpsMeLearn", spaces = [8,13,15]
// Output: "Leetcode Helps Me Learn"
// Explanation:
// The indices 8, 13, and 15 correspond to the underlined characters in "LeetcodeHelpsMeLearn".
// We then place spaces before those characters.

// Example 2:
// Input: s = "icodeinpython", spaces = [1,5,7,9]
// Output: "i code in py thon"
// Explanation:
// The indices 1, 5, 7, and 9 correspond to the underlined characters in "icodeinpython".
// We then place spaces before those characters.

// Example 3:
// Input: s = "spacing", spaces = [0,1,2,3,4,5,6]
// Output: " s p a c i n g"
// Explanation:
// We are also able to place spaces before the first character of the string.

// my solution, time limit exceeded, character by character too slow
function addSpaces_bad(s: string, spaces: number[]): string {
  let res = '';
  let idx = spaces.shift()!;
  for (let i = 0; i < s.length; i++) {
    if (i === idx) {
      res += ' ';
      if (spaces.length > 0) {
        idx = spaces.shift()!;
      }
    }
    res += s[i];
  }

  return res;
}

// https://leetcode.com/problems/adding-spaces-to-a-string/solutions/6106371/100-13ms-3-solutions-time-o-m-n-space-o-m-n/
// splits array, join by substring
function addSpaces(s: string, spaces: number[]): string {
  const N = spaces.length;
  const splits = new Array<string>(N + 1);

  splits[0] = s.substring(0, spaces[0]);
  for (let i = 1; i < N; ++i) {
    splits[i] = s.substring(spaces[i - 1], spaces[i]);
  }
  splits[N] = s.substring(spaces[N - 1]);

  return splits.join(' ');
}
