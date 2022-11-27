/**
 * Given a string representing a DNA sequence, count how many of each nucleotide is present.
 * If the string contains characters that aren't A, C, G, or T then it is invalid and you should signal an error.
 * e.g.:
 * "GATTACA" -> 'A': 3, 'C': 1, 'G': 1, 'T': 2
 * "INVALID" -> error
 */

export function nucleotideCounts(sequence: string): { [key: string]: number } {
  const count: { [key: string]: number } = { A: 0, C: 0, G: 0, T: 0 };
  for (let i = 0; i < sequence.length; i++) {
    const char = sequence[i];
    if (!(char in count)) {
      throw new Error('Invalid nucleotide in strand');
    } else {
      count[char]++;
    }
  }
  return count;
}

console.log(
  nucleotideCounts(
    'AGCTTTTCATTCTGACTGCAACGGGCAATATGTCTCTGTGTGGATTAAAAAAAGAGTGTCTGATAGCAGC',
  ),
);
