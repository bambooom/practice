// using hashmap to store the frequency, since we can have duplicate characters
// time O(n), space O(1) (hashmap, at most 26 keys)

function findTheDifference(s: string, t: string): string {
  const hash: Record<string, number> = {};
  for (let i = 0; i < s.length; i++) {
    hash[s[i]] = (hash[s[i]] || 0) + 1;
  }

  for (let i = 0; i < t.length; i++) {
    if (hash[t[i]]) {
      hash[t[i]]--;
    } else {
      return t[i];
    }
  }

  return '';
}
