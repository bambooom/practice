// Given two strings s1 and s2, return true if s2 contains a permutation of s1, or false otherwise.

// 1. brute

// 2: using sorting
// time: O(l1log(l1)+(l2−l1)l1log(l1)), space O(l1)
function checkInclusion(s1: string, s2: string): boolean {
  if (s1.length > s2.length) return false;
  const len = s1.length;
  function sort(s: string) {
    return [...s].sort().join('');
  }
  s1 = sort(s1);

  for (let j = 0; j <= s2.length - len; j++) {
    const substr = s2.slice(j, j + len);
    if (sort(substr) === sort(s1)) {
      return true;
    }
  }
  return false;
}

// 3. using hashmap to check freq, still slow
// time O(l_1+26*l_1*(l_2-l_1)), space O(1)
function compareHash(
  h1: { [key: string]: number },
  h2: { [key: string]: number },
): boolean {
  for (const key in h1) {
    if (h1[key] !== h2[key]) {
      return false;
    }
  }

  return true;
}

function checkInclusion3(s1: string, s2: string): boolean {
  if (s1.length > s2.length) return false;
  const l1 = s1.length;
  const l2 = s2.length;
  const freq1: { [key: string]: number } = {};
  for (let i = 0; i < l1; i++) {
    const c = s1[i];
    if (c in freq1) {
      freq1[c] += 1;
    } else {
      freq1[c] = 1;
    }
  }

  for (let j = 0; j <= l2 - l1; j++) {
    const subFreq2: { [key: string]: number } = {};
    for (let i = j; i < j + l1; i++) {
      const c = s2[i];
      if (c in subFreq2) {
        subFreq2[c] += 1;
      } else {
        subFreq2[c] = 1;
      }
    }
    if (compareHash(freq1, subFreq2)) {
      return true;
    }
  }
  return false;
}

// 4. same as hashmap, use array[] with 26 long as atmost 26

// 5. sliding window
// Instead of generating the hashmap afresh for every window considered in s2,
// we can create the hashmap just once for the first window in s2.
// Then, later on when we slide the window, we know that we remove one preceding character
// and add a new succeeding character to the new window considered.
// Thus, we can update the hashmap by just updating the indices associated with those two characters only.

// time: O(l1 + 26 * (l2 - l1)), space O(1)
function checkInclusion5(s1: string, s2: string): boolean {
  if (s1.length > s2.length) return false;
  const l1 = s1.length;
  const l2 = s2.length;
  const freq1: { [key: string]: number } = {};
  for (let i = 0; i < l1; i++) {
    const c = s1[i];
    if (c in freq1) {
      freq1[c] += 1;
    } else {
      freq1[c] = 1;
    }
  }

  const freq2: { [key: string]: number } = {};
  for (let i = 0; i <= l2 - l1; i++) {
    if (i === 0) {
      for (let j = 0; j < l1; j++) {
        const c = s2[j];
        if (c in freq2) {
          freq2[c] += 1;
        } else {
          freq2[c] = 1;
        }
      }
      if (compareHash(freq1, freq2)) {
        return true;
      }
    } else {
      freq2[s2[i - 1]] -= 1;
      if (s2[i + l1 - 1] in freq2) {
        freq2[s2[i + l1 - 1]] += 1;
      } else {
        freq2[s2[i + l1 - 1]] = 1;
      }
      if (compareHash(freq1, freq2)) {
        return true;
      }
    }
  }
  return false;
}

// 6. optimized sliding window
// keep a track of the number of elements which were already matching in the earlier hashmap
// and update just the count of matching elements when we shift the window towards the right.
