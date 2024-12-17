// https://leetcode.com/problems/construct-string-with-repeat-limit/
// You are given a string s and an integer repeatLimit. Construct a new string repeatLimitedString using the characters of s such that no letter appears more than repeatLimit times in a row. You do not have to use all characters from s.
// Return the lexicographically largest repeatLimitedString possible.
// A string a is lexicographically larger than a string b if in the first position where a and b differ, string a has a letter that appears later in the alphabet than the corresponding letter in b. If the first min(a.length, b.length) characters do not differ, then the longer string is the lexicographically larger one.

// Example 1:
// Input: s = "cczazcc", repeatLimit = 3
// Output: "zzcccac"
// Explanation: We use all of the characters from s to construct the repeatLimitedString "zzcccac".
// The letter 'a' appears at most 1 time in a row.
// The letter 'c' appears at most 3 times in a row.
// The letter 'z' appears at most 2 times in a row.
// Hence, no letter appears more than repeatLimit times in a row and the string is a valid repeatLimitedString.
// The string is the lexicographically largest repeatLimitedString possible so we return "zzcccac".
// Note that the string "zzcccca" is lexicographically larger but the letter 'c' appears more than 3 times in a row, so it is not a valid repeatLimitedString.

// Example 2:
// Input: s = "aababab", repeatLimit = 2
// Output: "bbabaa"
// Explanation: We use only some of the characters from s to construct the repeatLimitedString "bbabaa".
// The letter 'a' appears at most 2 times in a row.
// The letter 'b' appears at most 2 times in a row.
// Hence, no letter appears more than repeatLimit times in a row and the string is a valid repeatLimitedString.
// The string is the lexicographically largest repeatLimitedString possible so we return "bbabaa".
// Note that the string "bbabaaa" is lexicographically larger but the letter 'a' appears more than 2 times in a row, so it is not a valid repeatLimitedString.

// https://leetcode.com/problems/construct-string-with-repeat-limit/solutions/4085949/4-solutions-time-o-n/
// greedy
function repeatLimitedString(s: string, repeatLimit: number): string {
  const ALPHABET_MIN = 97; // ASCII a
  const ALPHABET_LEN = 26;

  // base case
  const N = s.length;
  if (N <= repeatLimit) {
    return s;
  }

  // count letter freq
  const counts = new Array(ALPHABET_LEN).fill(0);
  for (let i = 0; i < N; ++i) {
    ++counts[s.charCodeAt(i) - ALPHABET_MIN];
  }

  // for each letter from z to a
  let prev = '';
  let prevCount = 0;
  const buf: string[] = [];

  for (let i = ALPHABET_LEN - 1; i >= 0; --i) {
    // skip unused letters
    if (counts[i] <= 0) {
      continue;
    }

    // get current letter
    const curr = String.fromCharCode(i + ALPHABET_MIN);

    // determine how many full groups of prev can be created
    // using curr as the separator, leave some prev as a remainder
    let groups = Math.trunc((prevCount - 1) / repeatLimit);
    groups = Math.min(groups, counts[i]);

    // if groups are possible, create them
    if (groups > 0) {
      counts[i] -= groups;
      prevCount -= groups * repeatLimit;
      buf.push((prev.repeat(repeatLimit) + curr).repeat(groups));
    }

    // if prev is exhausted, update prev, otherwise, curr was exhausted
    if (prevCount <= repeatLimit) {
      buf.push(prev.repeat(prevCount));
      prevCount = counts[i];
      prev = curr;
    }
  }

  // add remaining prev to the end
  buf.push(prev.repeat(Math.min(prevCount, repeatLimit)));

  return buf.join('');
}
