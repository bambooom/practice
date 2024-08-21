// https://leetcode.com/problems/palindrome-partitioning
// Given a string s, partition s such that every substring of the partition is a palindrome.
// Return all possible palindrome partitioning of s.

// Example 1:
// Input: s = "aab"
// Output: [["a","a","b"],["aa","b"]]
// Example 2:
// Input: s = "a"
// Output: [["a"]]

// https://leetcode.com/problems/palindrome-partitioning/solutions/5191274/fastest-execution-beats-98-users-with-java-c-python3-typescript-backtracking/?envType=study-plan-v2&envId=top-100-liked
function partition(s: string): string[][] {
  const result: string[][] = [];

  const isPalindrome = (str: string): boolean => {
    let left = 0;
    let right = str.length - 1;

    while (left < right) {
      if (str[left] !== str[right]) {
        return false;
      }
      left++;
      right--;
    }
    return true;
  };

  const backtrack = (start: number, path: string[]): void => {
    if (start === s.length) {
      result.push([...path]);
      return;
    }

    for (let end = start + 1; end <= s.length; end++) {
      const current = s.substring(start, end);
      if (isPalindrome(current)) {
        path.push(current);
        backtrack(end, path);
        path.pop();
      }
    }
  };

  backtrack(0, []);
  return result;
}

// https://leetcode.com/problems/palindrome-partitioning/solutions/5191702/mock-interview-simulation-by-cs-iitian/?envType=study-plan-v2&envId=top-100-liked
