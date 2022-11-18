// Input: strs = ["flower","flow","flight"]
// Output: "fl"

// normal easy way
// - space: O(1), constant extra space
// - time: O(n * S)?
export function longestCommonPrefix(strs: string[]): string {
  if (strs.length === 0) return '';
  if (strs.length === 1) return strs[0];

  let prefix = '';
  const first = strs[0];
  for (let i = 0; i <= first.length; i++) {
    if (strs.every((s) => s.startsWith(prefix + first[i]))) {
      prefix += first[i];
    } else {
      break;
    }
  }
  return prefix;
}

// ============= Solution =============

/**
 * Approach 1: horizontal scanning
 * LCP(s1...sn) = LCP(LCP(s1...s(n-1)), sn)
 * let prefix = first string, and get substring
 *
 * Complexity Analysis:
 *  - Time complexity : O(S), where S is the sum of all characters in all strings.
 *    In the worst case all n strings are the same. The algorithm compares the string S1 with the other strings S1...Sn
 *    There are S character comparisons, where S is the sum of all characters in the input array.
 *  - Space complexity : O(1). We only used constant extra space.
 */
export function lcp1(strs: string[]): string {
  if (strs.length === 0) return '';
  let prefix = strs[0];
  for (let i = 1; i < strs.length; i++) {
    while (strs[i].indexOf(prefix) !== 0) {
      prefix = prefix.slice(0, -1);
      if (prefix === '') return '';
    }
  }
  return prefix;
}

/**
 * Approach 2: vertical scanning, almost same as my solution
 * from begin to scan character one by one
 */

/**
 * Approach 3: divide and conquer problem, left & right
 * if n equal strings with length m
 * Time: O(S = m * n)
 * Space: O(m * log n)
 */
export function lcp3(strs: string[]): string {
  if (strs.length === 0) return '';
  return lcpLR(strs, 0, strs.length - 1);
}
function lcpLR(strs: string[], left: number, right: number): string {
  if (left === right) return strs[left];
  const mid = Math.floor((left + right) / 2);
  const lcpLeft = lcpLR(strs, left, mid);
  const lcpRight = lcpLR(strs, mid + 1, right);
  return _lcpLR(lcpLeft, lcpRight);
}
function _lcpLR(left: string, right: string): string {
  const min = Math.min(left.length, right.length);
  for (let i = 0; i < min; i++) {
    if (left[i] !== right[i]) {
      return left.slice(0, i);
    }
  }
  return left.slice(0, min);
}

/**
 * Approach 4: binary search
 * n equal strings with length m
 * time: O(S * log m)
 * space: O(1)
 */

export function lcp4(strs: string[]): string {
  if (strs.length === 0) return '';
  const minLen = Math.min(...strs.map((s) => s.length));
  let low = 1;
  let high = minLen;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (isCommonPrefix(strs, mid)) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  return strs[0].substring(0, Math.floor((low + high) / 2));
}
function isCommonPrefix(strs: string[], len: number): boolean {
  const str1 = strs[0].substring(0, len);
  for (let i = 1; i < strs.length; i++)
    if (!strs[i].startsWith(str1)) return false;
  return true;
}
