// https://leetcode.com/problems/split-a-string-into-the-max-number-of-unique-substrings
// Given a string s, return the maximum number of unique substrings that the given string can be split into.
// You can split string s into any list of non-empty substrings, where the concatenation of the substrings forms the original string. However, you must split the substrings such that all of them are unique.
// A substring is a contiguous sequence of characters within a string.

// Example 1:
// Input: s = "ababccc"
// Output: 5
// Explanation: One way to split maximally is ['a', 'b', 'ab', 'c', 'cc']. Splitting like ['a', 'b', 'a', 'b', 'c', 'cc'] is not valid as you have 'a' and 'b' multiple times.

// Example 2:
// Input: s = "aba"
// Output: 2
// Explanation: One way to split maximally is ['a', 'ba'].

// Example 3:
// Input: s = "aa"
// Output: 1
// Explanation: It is impossible to split the string any further.

// https://leetcode.com/problems/split-a-string-into-the-max-number-of-unique-substrings/solutions/5944993/explained-step-by-step-beats-100-working-21-10-2024/?envType=daily-question&envId=2024-10-21
// hash table, backtracking
function maxUniqueSplit(s: string): number {
  let res = 1;
  const strings = new Set<string>();

  // recursive search func
  const search = (s: string) => {
    if (!strings.has(s)) {
      strings.add(s);
      res = Math.max(res, strings.size);
      strings.delete(s); // backtrack, remove the string from the set to allow for other combinations
    }

    // iterate through all possible split positions
    for (let i = 1; i < s.length; i++) {
      const sub = s.substring(0, i);
      if (strings.has(sub)) continue;
      strings.add(sub);
      // recursively search the remaining part of the string
      search(s.substring(i));
      strings.delete(sub);
    }
  };

  search(s);
  return res;
}
