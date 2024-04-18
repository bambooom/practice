// https://leetcode.com/problems/group-shifted-strings/
// #hash-table
// We can shift a string by shifting each of its letters to its successive letter.
// For example, "abc" can be shifted to be "bcd".
// We can keep shifting the string to form a sequence.
// For example, we can keep shifting "abc" to form the sequence: "abc" -> "bcd" -> ... -> "xyz".
// Given an array of strings strings, group all strings[i] that belong to the same shifting sequence. You may return the answer in any order.

// Example 1:
// Input: strings = ["abc","bcd","acef","xyz","az","ba","a","z"]
// Output: [["acef"],["a","z"],["abc","bcd","xyz"],["az","ba"]]

// Time: O(N*K), Memory: O(N*K)

function groupStrings(strings: string[]): string[][] {
  const res: Record<string, string[]> = {};

  strings.forEach((str) => {
    const k = new Array(str.length).fill(0);

    for (let i = 1; i < str.length; i++) {
      k[i] = str.charCodeAt(i - 1) - (str.charCodeAt(i) + 26);
      k[i] %= 26;
    }

    const key = k.join('-');
    key in res ? res[key].push(str) : (res[key] = [str]);
  });

  return Object.values(res);
}

// https://leetcode.com/problems/group-shifted-strings/solutions/1228685/concise-w-explanation-hashmaps-javascript/?envType=study-plan-v2&envId=premium-algo-100
// using hash map like this:
// Hash = {
//   '#0#1#2': [ 'abc', 'bcd', 'xyz' ],
//   '#0#2#4#5': [ 'acef' ],
//   '#0#25': [ 'az', 'ba' ],
//   '#0': [ 'a', 'z' ]
// }
function groupStrings2(strings: string[]): string[][] {
  const hash: Record<string, string[]> = {};
  const charCodes: Record<string, number> = {
    a: 1,
    b: 2,
    c: 3,
    d: 4,
    e: 5,
    f: 6,
    g: 7,
    h: 8,
    i: 9,
    j: 10,
    k: 11,
    l: 12,
    m: 13,
    n: 14,
    o: 15,
    p: 16,
    q: 17,
    r: 18,
    s: 19,
    t: 20,
    u: 21,
    v: 22,
    w: 23,
    x: 24,
    y: 25,
    z: 26,
  };

  for (const word of strings) {
    let key = '';
    const num = charCodes[word[0]];
    for (let idx = 0; idx < word.length; idx++) {
      let diff = charCodes[word[idx]] - num;
      if (diff < 0) diff = diff + 26;
      key += '#';
      key += diff;
    }
    if (!hash[key]) hash[key] = [];
    hash[key].push(word);
  }
  return Object.values(hash);
}
