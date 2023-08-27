// simplest: use built-in functions
function reverseWords(s: string): string {
  return s.trim().split(/\s+/).reverse().join(' ');
}

// Approach 2: Reverse the Whole String and Then Reverse Each Word
