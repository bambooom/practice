// https://leetcode.com/problems/find-the-longest-substring-containing-vowels-in-even-counts/description/
// Given the string s, return the size of the longest substring containing each vowel an even number of times. That is, 'a', 'e', 'i', 'o', and 'u' must appear an even number of times.
// prefix-sum, hash table

// Example 1:
// Input: s = "eleetminicoworoep"
// Output: 13
// Explanation: The longest substring is "leetminicowor" which contains two each of the vowels: e, i and o and zero of the vowels: a and u.
// Example 2:
// Input: s = "leetcodeisgreat"
// Output: 5
// Explanation: The longest substring is "leetc" which contains two e's.
// Example 3:
// Input: s = "bcbcbc"
// Output: 6
// Explanation: In this case, the given string "bcbcbc" is the longest because all vowels: a, e, i, o and u appear zero times.

// https://leetcode.com/problems/find-the-longest-substring-containing-vowels-in-even-counts/solutions/5717416/solution-using-prefix-sum-and-bitmask/
// Use a bitmask to keep count of the number of occurrences of each vowel in the substring[0, index]. If we have already seen the current bitmask before, then that means that everything in between cancels out.
function findTheLongestSubstring(s: string): number {
  const isVowel = (c: string) => 'aeiou'.includes(c);

  const bitMap: Record<string, number> = {
    a: 1,
    e: 2,
    i: 3,
    o: 4,
    u: 5,
  };

  let result = 0;
  let mask = 0;
  const map = new Map<number, number>();
  map.set(0, -1);

  for (let i = 0; i < s.length; i++) {
    if (isVowel(s[i])) {
      const bit = bitMap[s[i]];
      mask ^= 1 << bit;
      // 1 << bit 这部分创建一个只有第bit位是1，其余都是0的二进制数
      //^= 是异或运算，相同为0，不同为1
    }

    if (map.has(mask)) {
      result = Math.max(result, i - map.get(mask)!);
    } else {
      map.set(mask, i);
    }
  }

  return result;
}
