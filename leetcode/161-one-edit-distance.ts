// https://leetcode.com/problems/one-edit-distance/
// #two-pointers
// Given two strings s and t, return true if they are both one edit distance apart, otherwise return false.
// A string s is said to be one distance apart from a string t if you can:
// - Insert exactly one character into s to get t.
// - Delete exactly one character from s to get t.
// - Replace exactly one character of s with a different character to get t.

// Example 1:
// Input: s = "ab", t = "acb"
// Output: true
// Explanation: We can insert 'c' into s to get t.

// 搞了两次循环，时间复杂度 O(2N)，有点慢
function isOneEditDistance(s: string, t: string): boolean {
  const diff = Math.abs(s.length - t.length);
  // length difference cannot be larger than 1
  if (diff > 1) return false;
  // 如果 length 相同，则应该只能有一个不同的 char，s 替换就能得到 t
  if (diff === 0) {
    let replacement = 0;
    for (let i = 0; i < s.length; i++) {
      if (s[i] !== t[i]) replacement++;
    }
    return replacement === 1;
  }

  // make sure s is shorter
  if (s.length > t.length) {
    [s, t] = [t, s];
  }

  for (let i = 0; i < s.length; i++) {
    if (s[i] !== t[i]) {
      // 则 t[i] 应该就是插入的char，比较 s(i,n) t(i+1, n+1)
      return s.substring(i) === t.substring(i + 1);
    }
  }

  // 前面没有遇到不一样的 char，说明 t 比 s 多最后一个 char，所以最后这里是 true
  return true;
}

// Time O(N), Space O(1)
function isOneEditDistance2(s: string, t: string): boolean {
  const longer = s.length > t.length ? s : t;
  const shorter = s.length > t.length ? t : s;

  if (longer.length - shorter.length > 1) {
    return false;
  }

  let count = 0,
    i = 0,
    j = 0;

  while (i < longer.length) {
    if (longer[i] !== shorter[j]) {
      count++;

      if (longer.length > shorter.length) {
        i++;
        continue;
      }
    }

    i++;
    j++;
  }

  return count === 1;
}
