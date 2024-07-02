// https://leetcode.com/problems/rearrange-string-k-distance-apart
// Given a string s and an integer k, rearrange s such that the same characters are at least distance k from each other. If it is not possible to rearrange the string, return an empty string "".

// Example 1:
// Input: s = "aabbcc", k = 3
// Output: "abcabc"
// Explanation: The same letters are at least a distance of 3 from each other.

// Example 2:
// Input: s = "aaabc", k = 3
// Output: ""
// Explanation: It is not possible to rearrange the string.

// Example 3:
// Input: s = "aaadbbcc", k = 2
// Output: "abacabcd"
// Explanation: The same letters are at least a distance of 2 from each other.

// https://leetcode.com/problems/rearrange-string-k-distance-apart/solutions/4020070/greedy-with-comments-time-o-n-space-o-n/?envType=study-plan-v2&envId=premium-algo-100
function rearrangeString(s: string, k: number): string {
  const LOWER_A = 'a'.charCodeAt(0);

  // If s is empty
  // OR s has only one and unique char
  // OR no distance required
  const N = s.length;
  if (N < 2 || k < 2) {
    return s;
  }

  // get char counts
  const counts = new Array(26).fill(0);
  for (let i = 0; i < N; i++) {
    counts[s.charCodeAt(i) - LOWER_A]++;
  }

  // get max count
  let maxCount = Math.max(...counts);

  // if all chars unique
  if (maxCount === 1) {
    return s;
  }

  // get number of max count
  const numMax = counts.filter((c) => c === maxCount).length;

  // if required spacing too large
  if (k * (maxCount - 1) + numMax > N) {
    return '';
  }

  // sort letters by count in Descending order
  const codes: number[] = [];
  for (let i = 0; i < 26; i++) {
    codes.push(i);
  }
  codes.sort((a, b) => counts[b] - counts[a]);

  // compile max chars
  const buf: string[] = [];
  for (let i = 0; i < numMax; ++i) {
    buf.push(String.fromCharCode(codes[i] + LOWER_A));
  }

  // create buffers
  const bufs: string[][] = [];
  for (let i = 0; i < maxCount; i = bufs.push(Array.from(buf))) {
    // empty
  }

  // Add remaining chars
  --maxCount;
  const M = codes.length;
  for (let i = numMax, j = 0; i < M; ++i) {
    const code = codes[i];
    const char = String.fromCharCode(code + LOWER_A);
    while (--counts[code] >= 0) {
      bufs[j].push(char);
      j = (j + 1) % maxCount;
    }
  }

  // return string
  buf.length = 0;
  for (let i = 0; i <= maxCount; i++) {
    buf.push(bufs[i].join(''));
  }
  return buf.join('');
}

// https://leetcode.com/problems/rearrange-string-k-distance-apart/solutions/83208/javascript-o-n-time-and-space/?envType=study-plan-v2&envId=premium-algo-100
function rearrangeString2(s: string, k: number): string {
  // empty string or one char string or no distance required
  if (s.length < 2 || !k) return s;

  const buckets: number[] = [];
  const a = 'a'.charCodeAt(0);

  for (let i = 0; i < s.length; i++) {
    const key = s.charCodeAt(i) - a;
    buckets[key] = (buckets[key] || 0) + 1;
  }

  let res = '';
  let added: Record<string, number> = { length: 0 };

  while (res.length < s.length) {
    let maxIndex = -1;
    for (let i = 0; i < buckets.length; i++) {
      if (
        buckets[i] &&
        !added[i] &&
        (maxIndex === -1 || buckets[i] > buckets[maxIndex])
      ) {
        maxIndex = i;
      }
    }
    if (maxIndex === -1) return '';

    res += String.fromCharCode(a + maxIndex);
    buckets[maxIndex]--;
    added[maxIndex] = 1;

    if (++added.length === k) {
      added = { length: 0 };
    }
  }
  return res;
}
