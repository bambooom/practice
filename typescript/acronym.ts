// Techies love their TLA (Three Letter Acronyms)!
// Help generate some jargon by writing a program that converts a long name
// like Portable Network Graphics to its acronym(PNG).
// HyperText Markup Language => HTML

export function parse(phrase: string): string {
  return phrase
    .split(/\s|-/)
    .map((w) => {
      const m = w.match(/^([A-Z])[a-z]+([A-Z])[a-z]+$/);
      if (m) {
        return m[1] + m[2];
      }
      return w[0].toUpperCase();
    })
    .join('');
}

export function parse2(phrase: string): string {
  return (phrase.match(/[A-Z]+[a-z]*|[a-z]+/g) || [])
    .map((word: string) => word[0].toUpperCase())
    .join('');
}

export function parse3(phrase: string): string {
  const initials = phrase.match(/(\b\w|(?<=[a-z])[A-Z])/g);
  if (!initials) {
    return '';
  }
  return Array.from(initials).join('').toUpperCase();
}

export function parse4(phrase: string): string {
  /*
	(
		(?<!\w)[a-zA-Z])  // Find whitespace where lowercase and uppercase letters does not precede
		|                 // OR left or right expression do the truthy
		((?<=[a-z])[A-Z]) // Find lowercase letters a-z where uppercase letters precedes

	*/
  const REGEX_ACRONYM = /((?<!\w)[a-zA-Z])|((?<=[a-z])[A-Z])/g;
  return [...phrase.matchAll(REGEX_ACRONYM)]
    .map(([letter]) => letter.toUpperCase())
    .join('');
}
