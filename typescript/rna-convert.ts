// type DNA = 'G' | 'C' | 'T' | 'A';å
// type RNA = 'A' | 'C' | 'G' | 'U';

const map: Record<string, string> = {
  G: 'C',
  C: 'G',
  T: 'A',
  A: 'U',
};

export function toRna(strand: string): string {
  let res = '';
  for (let i = 0; i < strand.length; i++) {
    if (!map[strand[i]]) {
      throw Error('Invalid input DNA.');
    } else {
      res += strand[i];
    }
  }
  return res;
}

// ----

export const nuc_map: { [key: string]: string } = {
  G: 'C',
  C: 'G',
  T: 'A',
  A: 'U',
};

export function toRna2(DNA: string): string {
  return [...DNA].reduce((output, letter) => {
    if (!Object.keys(nuc_map).includes(letter))
      throw Error('Invalid input DNA.');
    output += nuc_map[letter];
    return output;
  }, '');
}

// ----

const mapper = new Map<string, string>([
  ['G', 'C'],
  ['C', 'G'],
  ['T', 'A'],
  ['A', 'U'],
]);
export function toRna3(strand: string) {
  let transcribed = '';
  const chars = [...strand].forEach((char, i) => {
    if (!mapper.has(char)) throw new Error('Invalid input DNA.');
    transcribed += mapper.get(char);
  });
  return transcribed;
}

// ---
interface M {
  [key: string]: string;
}
const RnaMap: M = {
  G: 'C',
  C: 'G',
  T: 'A',
  A: 'U',
};
export function toRna4(dna: string): string {
  if (/[^ACGT]/.test(dna)) {
    throw 'Invalid input DNA.';
  }
  return dna.replace(/[ATCG]/g, (m) => RnaMap[m]);
}
