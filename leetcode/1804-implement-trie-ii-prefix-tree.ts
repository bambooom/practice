// https://leetcode.com/problems/implement-trie-ii-prefix-tree/description/

// A trie (pronounced as "try") or prefix tree is a tree data structure used to efficiently store and retrieve keys in a dataset of strings. There are various applications of this data structure, such as autocomplete and spellchecker.

// Implement the Trie class:

// Trie() Initializes the trie object.
// void insert(String word) Inserts the string word into the trie.
// int countWordsEqualTo(String word) Returns the number of instances of the string word in the trie.
// int countWordsStartingWith(String prefix) Returns the number of strings in the trie that have the string prefix as a prefix.
// void erase(String word) Erases the string word from the trie.

class PrefixCountNode {
  count: number;
  nodes: Map<string, PrefixCountNode>;
  final: number;

  constructor() {
    this.count = 0;
    this.nodes = new Map();
    this.final = 0;
  }
}

class Trie2 {
  node: PrefixCountNode;

  constructor() {
    this.node = new PrefixCountNode();
  }

  insert(word: string): void {
    let current = this.node;
    for (let i = 0; i < word.length; i++) {
      if (!current.nodes.has(word[i])) {
        current.nodes.set(word[i], new PrefixCountNode());
      }
      current = current.nodes.get(word[i])!;
      current.count++;
    }

    current.final++;
  }

  seek(key: string): PrefixCountNode | null {
    let current = this.node;

    for (let i = 0; i < key.length; i++) {
      if (!current.nodes.has(key[i])) return null;
      current = current.nodes.get(key[i])!;
    }
    return current;
  }

  countWordsEqualTo(word: string): number {
    return this.seek(word)?.final ?? 0;
  }

  countWordsStartingWith(prefix: string): number {
    return this.seek(prefix)?.count ?? 0;
  }

  erase(word: string): void {
    let current = this.node;
    let exit = false;

    for (let i = 0; i < word.length; i++) {
      if (current.nodes.get(word[i])!.count === 1) {
        current.nodes.delete(word[i]);
        exit = true;
        break;
      } else {
        current = current.nodes.get(word[i])!;
        current.count--;
      }
    }
    if (!exit) {
      current.final--;
    }
  }
}

/**
 * Your Trie object will be instantiated and called as such:
 * var obj = new Trie()
 * obj.insert(word)
 * var param_2 = obj.countWordsEqualTo(word)
 * var param_3 = obj.countWordsStartingWith(prefix)
 * obj.erase(word)
 */

/**
 *
 * Trie trie = new Trie();
 * trie.insert("apple");               // Inserts "apple".
 * trie.insert("apple");               // Inserts another "apple".
 * trie.countWordsEqualTo("apple");    // There are two instances of "apple" so return 2.
 * trie.countWordsStartingWith("app"); // "app" is a prefix of "apple" so return 2.
 * trie.erase("apple");                // Erases one "apple".
 * trie.countWordsEqualTo("apple");    // Now there is only one instance of "apple" so return 1.
 * trie.countWordsStartingWith("app"); // return 1
 * trie.erase("apple");                // Erases "apple". Now the trie is empty.
 * trie.countWordsStartingWith("app"); // return 0
 */
