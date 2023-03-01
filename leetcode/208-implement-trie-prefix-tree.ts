// https://leetcode.com/problems/implement-trie-prefix-tree/
// A trie (pronounced as "try") or prefix tree is a tree data structure used to efficiently store and retrieve keys in a dataset of strings. There are various applications of this data structure, such as autocomplete and spellchecker.
// #hash-table

class TrieNode {
  children: Map<string, TrieNode>;
  isEnd: boolean;

  constructor() {
    this.children = new Map<string, TrieNode>();
    this.isEnd = false;
  }
}

class Trie {
  root: TrieNode;
  constructor() {
    this.root = new TrieNode();
  }

  // Inserts the string word into the trie.
  insert(word: string): void {
    let currNode = this.root;
    for (const char of word) {
      if (!currNode.children.has(char)) {
        currNode.children.set(char, new TrieNode());
      }
      currNode = currNode.children.get(char) as TrieNode;
    }
    currNode.isEnd = true;
  }

  // Returns true if the string word is in the trie (i.e., was inserted before), and false otherwise.
  search(word: string): boolean {
    let currNode = this.root;
    for (const char of word) {
      if (!currNode.children.has(char)) {
        return false;
      }
      currNode = currNode.children.get(char) as TrieNode;
    }
    return currNode.isEnd;
  }

  // Returns true if there is a previously inserted string word that has the prefix `prefix`, and false otherwise.
  startsWith(prefix: string): boolean {
    let currNode = this.root;
    for (const char of prefix) {
      if (!currNode.children.has(char)) {
        return false;
      }
      currNode = currNode.children.get(char) as TrieNode;
    }
    return true;
  }
}

/**
 * Your Trie object will be instantiated and called as such:
 * var obj = new Trie()
 * obj.insert(word)
 * var param_2 = obj.search(word)
 * var param_3 = obj.startsWith(prefix)
 */

// https://leetcode.com/problems/implement-trie-prefix-tree/solutions/2094586/js-simple-explained-prefix-trees/
// https://leetcode.com/problems/implement-trie-prefix-tree/solutions/2945726/easy-typescript-solution/
