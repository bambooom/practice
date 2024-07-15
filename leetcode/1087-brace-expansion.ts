// https://leetcode.com/problems/brace-expansion/description
// You are given a string s representing a list of words. Each letter in the word has one or more options.

// If there is one option, the letter is represented as is.
// If there is more than one option, then curly braces delimit the options. For example, "{a,b,c}" represents options ["a", "b", "c"].
// For example, if s = "a{b,c}", the first character is always 'a', but the second character can be 'b' or 'c'. The original list is ["ab", "ac"].

// Return all words that can be formed in this manner, sorted in lexicographical order.

// Example 1:
// Input: s = "{a,b}c{d,e}f"
// Output: ["acdf","acef","bcdf","bcef"]
// Example 2:
// Input: s = "abcd"
// Output: ["abcd"]

// https://leetcode.com/problems/brace-expansion/solutions/2520982/typescript-javascript-dfs-with-comments-simple/?envType=study-plan-v2&envId=premium-algo-100
function expand(s: string): string[] {
  const result: string[] = [];

  // so get the length of the string without options
  // i.e. if we had {a,b}ec then length will be 3
  // (either aec or bec)
  let lengthOfSWithoutCurlyBraces = 0;
  let i = 0;
  while (i < s.length) {
    if (s[i] === '{') {
      while (s[i] !== '}') {
        i++;
      }
    }
    lengthOfSWithoutCurlyBraces++;
    i++;
  }

  const dfs = (
    str: string,
    length: number,
    result: string[],
    permutation: string[],
    index: number,
  ) => {
    // if permutation is same length as our string
    // then push that permutation to result array
    if (permutation.length === length) {
      result.push(permutation.join(''));
      return;
    }

    // if current char is curly brace
    if (str[index] === '{') {
      // get closing index of current curly brace, starting from index position
      const indexOfClosingBrace = str.indexOf('}', index) + 1;

      for (let i = index; i < indexOfClosingBrace; i++) {
        // if value is not english character, skip it
        if (['{', '}', ','].includes(str[i])) continue;

        // add char to our current permutation
        permutation.push(str[i]);

        // perform dfs on new permutation
        dfs(str, length, result, permutation, indexOfClosingBrace);

        // remove current char for next permutation
        permutation.pop();
      }
    } else {
      // if char is just plain english char
      // add it to permutation, increment index, perform dfs, then remove it from permutation
      permutation.push(str[index]);
      dfs(str, length, result, permutation, index + 1);
      permutation.pop();
    }
  };

  // perform DFS
  dfs(s, lengthOfSWithoutCurlyBraces, result, [], 0);

  return result.sort((a, b) => a.localeCompare(b));
}
