// https://leetcode.com/problems/design-search-autocomplete-system
// Design a search autocomplete system for a search engine. Users may input a sentence (at least one word and end with a special character '#').

// You are given a string array sentences and an integer array times both of length n where sentences[i] is a previously typed sentence and times[i] is the corresponding number of times the sentence was typed. For each input character except '#', return the top 3 historical hot sentences that have the same prefix as the part of the sentence already typed.

// Here are the specific rules:
// - The hot degree for a sentence is defined as the number of times a user typed the exactly same sentence before.
// - The returned top 3 hot sentences should be sorted by hot degree (The first is the hottest one). If several sentences have the same hot degree, use ASCII-code order (smaller one appears first).
// - If less than 3 hot sentences exist, return as many as you can.
// - When the input is a special character, it means the sentence ends, and in this case, you need to return an empty list.

// Implement the AutocompleteSystem class:
// - AutocompleteSystem(String[] sentences, int[] times) Initializes the object with the sentences and times arrays.
// - List<String> input(char c) This indicates that the user typed the character c.
//    - Returns an empty array [] if c == '#' and stores the inputted sentence in the system.
//    - Returns the top 3 historical hot sentences that have the same prefix as the part of the sentence already typed. If there are fewer than 3 matches, return them all.

// Example 1:
// Input
// ["AutocompleteSystem", "input", "input", "input", "input"]
// [[["i love you", "island", "iroman", "i love leetcode"], [5, 3, 2, 2]], ["i"], [" "], ["a"], ["#"]]
// Output
// [null, ["i love you", "island", "i love leetcode"], ["i love you", "i love leetcode"], [], []]

// Explanation
// AutocompleteSystem obj = new AutocompleteSystem(["i love you", "island", "iroman", "i love leetcode"], [5, 3, 2, 2]);
// obj.input("i"); // return ["i love you", "island", "i love leetcode"]. There are four sentences that have prefix "i". Among them, "ironman" and "i love leetcode" have same hot degree. Since ' ' has ASCII code 32 and 'r' has ASCII code 114, "i love leetcode" should be in front of "ironman". Also we only need to output top 3 hot sentences, so "ironman" will be ignored.
// obj.input(" "); // return ["i love you", "i love leetcode"]. There are only two sentences that have prefix "i ".
// obj.input("a"); // return []. There are no sentences that have prefix "i a".
// obj.input("#"); // return []. The user finished the input, the sentence "i a" should be saved as a historical sentence in system. And the following input will be counted as a new search.

// https://leetcode.com/problems/design-search-autocomplete-system/solutions/4184514/the-most-effective-ts-solution-based-on-trie-beats-100-00-of-users-with-typescript/?envType=study-plan-v2&envId=premium-algo-100
// trie？
// A trie (pronounced as "try") or prefix tree is a tree data structure used to efficiently store and retrieve keys in a dataset of strings. There are various applications of this data structure, such as autocomplete and spellchecker.

// Interface for keeping TOP 3 sentences in the Trie Node
interface TrieEntry {
  sentence: string;
  freq: number;
}

class TrieeNode {
  children: { [key: string]: TrieeNode } = {};
  private readonly top: TrieEntry[] = []; // We keep only top 3 sentences with this prefix here

  // This method updates the top 3 sentences with corresponding prefix
  update(sentence: string, freq: number) {
    // If the current sentence is already in out top, just update it's frequency
    for (const entry of this.top) {
      if (sentence === entry.sentence) {
        entry.freq = freq;
        this.top.sort(compare);
        return;
      }
    }

    // If we have a free slot just add a new sentence there
    if (this.top.length < 3) {
      this.top.push({ sentence, freq });
      this.top.sort(compare);
      return;
    }

    // if the current sentence has a higher frequency or is smaller in terms of ASCII symbols - replace the least relevant sentence in top 3 with the current one
    if (compare(this.top[0], { sentence, freq }) < 0) {
      this.top[0] = { sentence, freq };
      this.top.sort(compare);
    }
  }

  // Get top 3 sentences with this prefix
  getTop(): string[] {
    const res = [];
    for (const entry of this.top) {
      res.push(entry.sentence);
    }
    return res.reverse();
  }
}

class Triee {
  private readonly root: TrieeNode;

  constructor() {
    this.root = new TrieeNode();
  }

  insert(word: string, freq: number): void {
    let cur = this.root;
    for (const char of word) {
      if (!cur.children[char]) {
        cur.children[char] = new TrieeNode();
      }
      cur = cur.children[char];

      cur.update(word, freq);
    }
  }

  startsWith(prefix: string): string[] {
    let cur = this.root;
    for (const char of prefix) {
      if (!cur.children[char]) return [];
      cur = cur.children[char];
    }
    return cur.getTop();
  }
}

class AutocompleteSystem {
  trie: Triee;
  sentences: { [sentence: string]: number }; // Map of all sentences and their frequency
  currentSentence: string;

  constructor(sentences: string[], times: number[]) {
    this.trie = new Triee();
    this.sentences = {};
    this.currentSentence = '';

    for (let i = 0; i < sentences.length; i++) {
      const sentence = sentences[i];
      const freq = times[i];
      this.sentences[sentence] = freq;
      this.trie.insert(sentence, freq);
    }
  }

  input(c: string): string[] {
    if (c === '#') {
      // Increment sentences counter
      if (!this.sentences[this.currentSentence]) {
        this.sentences[this.currentSentence] = 0;
      }
      this.sentences[this.currentSentence]++;

      // Update frequency
      const freq = this.sentences[this.currentSentence];
      this.trie.insert(this.currentSentence, freq);

      // Clear and return
      this.currentSentence = '';
      return [];
    }

    this.currentSentence += c;
    return this.trie.startsWith(this.currentSentence);
  }
}

// Helper function for comparing sentences and it's frequencies
function compare(a: TrieEntry, b: TrieEntry) {
  if (a.freq !== b.freq) return a.freq - b.freq;
  return a.sentence < b.sentence ? 1 : -1;
}

/**
 * Your AutocompleteSystem object will be instantiated and called as such:
 * var obj = new AutocompleteSystem(sentences, times)
 * var param_1 = obj.input(c)
 */
