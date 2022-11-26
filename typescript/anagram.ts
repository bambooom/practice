// An anagram is a rearrangement of letters to form a new word.
// Given a word and a list of candidates, select the sublist of anagrams of the given word.

export class Anagram {
  input: string;
  chars: Map<string, number>;
  len: number;
  constructor(input: string) {
    this.input = input;
    this.chars = this.count(input);
    this.len = input.length;
  }

  count(str: string): Map<string, number> {
    const chars = str.toLowerCase().split('');
    const res: Map<string, number> = new Map();
    for (let i = 0; i < chars.length; i++) {
      if (res.has(chars[i])) {
        res.set(chars[i], (res.get(chars[i]) as number) + 1);
      } else {
        res.set(chars[i], 1);
      }
    }

    return res;
  }

  public matches(...potentials: string[]): string[] {
    const res: string[] = [];
    for (let i = 0; i < potentials.length; i++) {
      const str = potentials[i];
      if (str.length !== this.len) {
        continue;
      }
      if (str.toLowerCase() === this.input.toLowerCase()) {
        continue; // exclude itself
      }
      const map = this.count(str);
      if (
        [...map.entries()].every(
          ([char, count]) => this.chars.get(char) === count,
        )
      ) {
        res.push(str);
      }
    }

    return res;
  }
}

const subject = new Anagram('banana');
const matches = subject.matches('Banana');
console.log(matches); // [], should exclude it self

// simpler solution
export class Anagram2 {
  private word: string;
  constructor(word: string) {
    this.word = word.toLowerCase();
  }
  matches(...words: string[]) {
    const sorted = [...this.word].sort().join('');
    return words.filter(
      (w) =>
        w.toLowerCase() !== this.word &&
        sorted === [...w.toLowerCase()].sort().join(''),
    );
  }
}
