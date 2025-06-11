// https://leetcode.com/problems/maximum-difference-between-even-and-odd-frequency-ii/
// You are given a string s and an integer k. Your task is to find the maximum difference between the frequency of two characters, freq[a] - freq[b], in a substring subs of s, such that:
// subs has a size of at least k.
// Character a has an odd frequency in subs.
// Character b has an even frequency in subs.
// Return the maximum difference.
// Note that subs can contain more than 2 distinct characters.
// s consists only of digits '0' to '4'.

// Example 1:
// Input: s = "12233", k = 4
// Output: -1
// Explanation:
// For the substring "12233", the frequency of '1' is 1 and the frequency of '3' is 2. The difference is 1 - 2 = -1.

// Example 2:
// Input: s = "1122211", k = 3
// Output: 1
// Explanation:
// For the substring "11222", the frequency of '2' is 3 and the frequency of '1' is 2. The difference is 3 - 2 = 1.

// Example 3:
// Input: s = "110", k = 3
// Output: -1

// editorial
function maxDifferenceSubstring(s: string, k: number): number {
  const n = s.length;
  let ans = -Infinity;

  const getStatus = (countA: number, countB: number): number => {
    return ((countA & 1) << 1) | (countB & 1);
  };

  const digits = ['0', '1', '2', '3', '4', '5'];

  for (const a of digits) {
    for (const b of digits) {
      if (a === b) continue;

      const best: number[] = [Infinity, Infinity, Infinity, Infinity];
      let countA = 0;
      let countB = 0;
      let prevA = 0;
      let prevB = 0;
      let left = -1;

      for (let right = 0; right < n; right++) {
        countA += s[right] === a ? 1 : 0;
        countB += s[right] === b ? 1 : 0;

        while (right - left >= k && countB - prevB >= 2) {
          const leftStatus = getStatus(prevA, prevB);
          best[leftStatus] = Math.min(best[leftStatus], prevA - prevB);

          left++;
          prevA += s[left] === a ? 1 : 0;
          prevB += s[left] === b ? 1 : 0;
        }

        const rightStatus = getStatus(countA, countB);
        if (best[rightStatus ^ 0b10] !== Infinity) {
          ans = Math.max(ans, countA - countB - best[rightStatus ^ 0b10]);
        }
      }
    }
  }

  return ans;
}

// https://leetcode.com/problems/maximum-difference-between-even-and-odd-frequency-ii/solutions/6831134/1st-ever-javascript-solution-binary-indexed-fenwick-tree/?envType=daily-question&envId=2025-06-11
class MinBIT {
  static MAX = Number.MAX_SAFE_INTEGER;
  n: number;
  data: number[];

  constructor(length: number) {
    this.n = length;
    this.data = Array(length + 2).fill(MinBIT.MAX);
  }

  insert(index: number, value: number) {
    for (let i = index + 1; i <= this.n; i += i & -i) {
      this.data[i] = Math.min(this.data[i], value);
    }
  }

  getMin(index: number) {
    let result = MinBIT.MAX;
    for (let i = index + 1; i > 0; i -= i & -i) {
      result = Math.min(result, this.data[i]);
    }
    return result;
  }
}
function maxDifferenceSubstring2(s: string, k: number): number {
  const length = s.length;
  let result = -Infinity;

  // Loop through all digit pairs (first, second) from 0 to 4.
  for (let first = 0; first < 5; first++) {
    for (let second = 0; second < 5; second++) {
      if (first === second) continue;

      // Compute a prefix difference array diff, diff[i] = count of first digits − count of second digits
      const diff = Array(length + 1).fill(0);
      const parityA = Array(length + 1).fill(0); // Track parity states (firstCount % 2, secondCount % 2) at each index.
      const parityB = Array(length + 1).fill(0);
      const countB = Array(length + 1).fill(0); // track how many second digits have occurred so far.

      for (let i = 1; i <= length; i++) {
        const digit = s.charCodeAt(i - 1) - 48;
        diff[i] =
          diff[i - 1] + (digit === first ? 1 : 0) - (digit === second ? 1 : 0);
        parityA[i] = (parityA[i - 1] + (digit === first ? 1 : 0)) & 1;
        parityB[i] = (parityB[i - 1] + (digit === second ? 1 : 0)) & 1;
        countB[i] = countB[i - 1] + (digit === second ? 1 : 0);
      }

      // Initialize a 2D structure storage[pA][pB] (size 2×2)
      // Each entry is a Binary Indexed Tree (BIT).
      // Each BIT stores the minimum prefix difference for that specific (firstParity, secondParity) configuration.
      const storage = Array.from({ length: 2 }, () =>
        Array.from({ length: 2 }, () => new MinBIT(length + 1)),
      );

      for (let j = 0; j <= length; j++) {
        // If j ≥ k, consider back = j − k as a valid start point.
        // Insert diff[back] into the appropriate BIT using its parity.
        if (j >= k) {
          const back = j - k;
          const pA = parityA[back];
          const pB = parityB[back];
          const bCount = countB[back];
          storage[pA][pB].insert(bCount, diff[back]);
        }
        // At index j, attempt to query the minimum prefix value in the matching BIT (same parity).
        if (j > 0 && countB[j] > 0) {
          const altA = 1 - parityA[j];
          const curB = parityB[j];
          const minPrev = storage[altA][curB].getMin(countB[j] - 1);

          if (minPrev !== MinBIT.MAX) {
            // If a valid value is found and countB[j] indicates at least one second digit, update the answer using: diff[j] − minPrev.
            result = Math.max(result, diff[j] - minPrev);
          }
        }
      }
    }
  }

  return result === -Infinity ? 0 : result;
}
