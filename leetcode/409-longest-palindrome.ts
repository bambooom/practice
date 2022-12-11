// https://leetcode.com/problems/longest-palindrome/

function longestPalindrome(s: string): number {
  const hash: Map<string, number> = new Map();

  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (hash.has(c)) {
      hash.set(c, (hash.get(c) as number) + 1);
    } else {
      hash.set(c, 1);
    }
  }

  let res = 0;
  let hasOdd = false;
  for (const [key, value] of [...hash.entries()]) {
    // console.log(key, value);
    if (value % 2 === 0) {
      res += value;
    } else {
      res += value - 1;
      hasOdd = true;
    }
  }

  return res + (hasOdd ? 1 : 0);
}

const testStr =
  'civilwartestingwhetherthatnaptionoranynartionsoconceivedandsodedicatedcanlongendureWeareqmetonagreatbattlefiemldoftzhatwarWehavecometodedicpateaportionofthatfieldasafinalrestingplaceforthosewhoheregavetheirlivesthatthatnationmightliveItisaltogetherfangandproperthatweshoulddothisButinalargersensewecannotdedicatewecannotconsecratewecannothallowthisgroundThebravelmenlivinganddeadwhostruggledherehaveconsecrateditfaraboveourpoorponwertoaddordetractTgheworldadswfilllittlenotlenorlongrememberwhatwesayherebutitcanneverforgetwhattheydidhereItisforusthelivingrathertobededicatedheretotheulnfinishedworkwhichtheywhofoughtherehavethusfarsonoblyadvancedItisratherforustobeherededicatedtothegreattdafskremainingbeforeusthatfromthesehonoreddeadwetakeincreaseddevotiontothatcauseforwhichtheygavethelastpfullmeasureofdevotionthatweherehighlyresolvethatthesedeadshallnothavediedinvainthatthisnationunsderGodshallhaveanewbirthoffreedomandthatgovernmentofthepeoplebythepeopleforthepeopleshallnotperishfromtheearth';
console.log(longestPalindrome(testStr)); // 983
