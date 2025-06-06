// https://leetcode.com/problems/using-a-robot-to-print-the-lexicographically-smallest-string
// You are given a string s and a robot that currently holds an empty string t. Apply one of the following operations until s and t are both empty:
// Remove the first character of a string s and give it to the robot. The robot will append this character to the string t.
// Remove the last character of a string t and give it to the robot. The robot will write this character on paper.
// Return the lexicographically smallest string that can be written on the paper.

// Example 1:
// Input: s = "zza"
// Output: "azz"
// Explanation: Let p denote the written string.
// Initially p="", s="zza", t="".
// Perform first operation three times p="", s="", t="zza".
// Perform second operation three times p="azz", s="", t="".

// Example 2:
// Input: s = "bac"
// Output: "abc"
// Explanation: Let p denote the written string.
// Perform first operation twice p="", s="c", t="ba".
// Perform second operation twice p="ab", s="c", t="".
// Perform first operation p="ab", s="", t="c".
// Perform second operation p="abc", s="", t="".

// Example 3:
// Input: s = "bdda"
// Output: "addb"
// Explanation: Let p denote the written string.
// Initially p="", s="bdda", t="".
// Perform first operation four times p="", s="", t="bdda".
// Perform second operation four times p="addb", s="", t="".

// https://leetcode.com/problems/using-a-robot-to-print-the-lexicographically-smallest-string/solutions/6816172/beats-super-easy-beginners-java-c-c-python-javascript-dart/?envType=daily-question&envId=2025-06-06
// idea is to greedily push and pop characters while ensuring the resulting string remains lexicographically smallest.
function robotWithString(s: string): string {
  const a = 'a'.charCodeAt(0);
  const freq: number[] = Array(26).fill(0);

  // count character freq
  for (let i = 0; i < s.length; i++) {
    freq[s.charCodeAt(i) - a]++;
  }

  const stack: number[] = [];
  const res: string[] = [];

  const hasSmaller = (top: number): boolean => {
    for (let i = 0; i < top; i++) {
      if (freq[i] > 0) {
        return true;
      }
    }
    return false;
  };

  for (let i = 0; i < s.length; i++) {
    const ch = s.charCodeAt(i) - a;
    freq[ch]--; // decrement its freq

    stack.push(ch); // push to stack

    // check if the stack's top character can be popped
    while (stack.length > 0 && !hasSmaller(stack[stack.length - 1])) {
      res.push(String.fromCharCode(stack.pop()! + a));
    }
  }

  return res.join('');
}
