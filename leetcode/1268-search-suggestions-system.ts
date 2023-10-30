// https://leetcode.com/problems/search-suggestions-system/
// You are given an array of strings products and a string searchWord.
// Design a system that suggests at most three product names from products after each character of searchWord is typed. Suggested products should have common prefix with searchWord. If there are more than three products with a common prefix return the three lexicographically minimums products.
// Return a list of lists of the suggested products after each character of searchWord is typed.

// Example 1:
// Input: products = ["mobile","mouse","moneypot","monitor","mousepad"], searchWord = "mouse"
// Output: [["mobile","moneypot","monitor"],["mobile","moneypot","monitor"],["mouse","mousepad"],["mouse","mousepad"],["mouse","mousepad"]]
// Explanation: products sorted lexicographically = ["mobile","moneypot","monitor","mouse","mousepad"].
// After typing m and mo all products match and we show user ["mobile","moneypot","monitor"].
// After typing mou, mous and mouse the system suggests ["mouse","mousepad"].

// https://leetcode.com/problems/search-suggestions-system/?envType=study-plan-v2&envId=leetcode-75
function suggestedProducts(products: string[], searchWord: string): string[][] {
  let matches = products.sort();

  const result: string[][] = [];

  let word = '';

  for (let i = 0; i < searchWord.length; i++) {
    word += searchWord[i];
    matches = matches.filter((w) => w.startsWith(word));

    result.push(matches.slice(0, 3));
  }

  return result;
}

// https://leetcode.com/problems/search-suggestions-system/solutions/2201672/ts-2-liner/?envType=study-plan-v2&envId=leetcode-75
function suggestedProducts2(
  products: string[],
  searchWord: string,
): string[][] {
  products.sort();
  return [...searchWord]
    .map((_, idx) => searchWord.slice(0, idx + 1))
    .map((prefix) => products.filter((p) => p.startsWith(prefix)).slice(0, 3));
}

// https://leetcode.com/problems/search-suggestions-system/solutions/498865/javascript-solution-trie-sort/?envType=study-plan-v2&envId=leetcode-75
// trie
function suggestedProducts3(
  products: string[],
  searchWord: string,
): string[][] {
  products.sort();

  const trie: Record<string, any> = {};
  for (const p of products) {
    let root = trie;
    for (let i = 0; i < p.length; i++) {
      if (!root[p[i]]) {
        root[p[i]] = { sug: [] };
      }
      if (root[p[i]]['sug'].length < 3) {
        root[p[i]]['sug'].push(p);
      }
      root = root[p[i]];
    }
  }

  let root = trie;
  const res: string[][] = [];
  for (let i = 0; i < searchWord.length; i++) {
    if (root) root = root[searchWord[i]];
    res.push(!root ? [] : root['sug']);
  }

  return res;
}
