// https://leetcode.com/problems/buddy-strings/
// Given two strings s and goal, return true if you can swap two letters in s so the result is equal to goal, otherwise, return false.

// Swapping letters is defined as taking two indices i and j (0-indexed) such that i != j and swapping the characters at s[i] and s[j].

function buddyStrings(s: string, goal: string): boolean {
  if (s.length !== goal.length || s.length === 1 || goal.length === 1) {
    return false;
  }

  if (s === goal) {
    const set = new Set(s);
    return set.size < s.length; // has same characters
  }

  const diff: number[] = [];

  for (let i = 0; i < s.length; i++) {
    if (s[i] !== goal[i]) {
      diff.push(i);
    }
  }

  // have 2 different charasters and differs with same chars
  return (
    diff.length === 2 &&
    s[diff[0]] === goal[diff[1]] &&
    s[diff[1]] === goal[diff[0]]
  );
}
