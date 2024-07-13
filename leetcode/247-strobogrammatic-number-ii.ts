// https://leetcode.com/problems/strobogrammatic-number-ii
// Given an integer n, return all the strobogrammatic numbers that are of length n. You may return the answer in any order.
// A strobogrammatic number is a number that looks the same when rotated 180 degrees (looked at upside down).

// Example 1:
// Input: n = 2
// Output: ["11","69","88","96"]
// Example 2:
// Input: n = 1
// Output: ["0","1","8"]

// recursive, backtracking
// https://leetcode.com/problems/strobogrammatic-number-ii/solutions/67303/javascript-recursive-version/?envType=study-plan-v2&envId=premium-algo-100
function findStrobogrammatic(n: number): string[] {
  const helper = (n: number, m: number): string[] => {
    if (n === 0) return [''];
    if (n === 1) return ['0', '1', '8'];

    const list = helper(n - 2, m);

    const res = [];

    for (let i = 0; i < list.length; i++) {
      const s = list[i];

      if (n !== m) {
        res.push('0' + s + '0');
      }
      res.push('1' + s + '1');
      res.push('6' + s + '9');
      res.push('8' + s + '8');
      res.push('9' + s + '6');
    }

    return res;
  };

  return helper(n, n);
}
