// https://leetcode.com/problems/isomorphic-strings/
// Two strings s and t are isomorphic if the characters in s can be replaced to get t.
// #hash-table

// Input: s = "egg", t = "add"
// Output: true
// Input: s = "foo", t = "bar"
// Output: false
// Input: s = "paper", t = "title"
// Output: true

// We use a Map to record the key/val pair in S and T. For each char in S, if we never met it before, we record the (s[i], t[i]) pair in map.
// If we met s[i] before, we compare the value of s[i] with t[i], which are supposed to be the same.After that, we need to check whether map.values() contain duplicate value.If map.value contain duplicate value, it means that multiple keys map to a same value, which is not allowed.To illustrate,

function isIsomorphic(s: string, t: string): boolean {
  if (!s || !t || s.length !== t.length) return false;
  const len = s.length;
  const map = new Map<string, string>();
  for (let i = 0; i < len; i++) {
    const a = s[i];
    const b = t[i];
    if (!map.has(a)) {
      map.set(a, b);
    } else {
      if (map.get(a) !== b) {
        return false;
      }
    }
  }

  return new Set([...map.values()]).size === map.size;
}

// s = "bbbaaaba" t = "aaabbbba"
