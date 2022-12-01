// An isogram (also known as a "nonpattern word") is a word or phrase without a repeating letter, however spaces and hyphens are allowed to appear multiple times.

export function isIsogram(str: string): boolean {
  if (!str) return true;
  str = str.toLowerCase();
  const map: Set<string> = new Set();
  for (let i = 0; i < str.length; i++) {
    const c = str[i];
    if (!/[a-z]/.test(c)) continue;
    if (map.has(c)) return false;
    map.add(c);
  }
  return true;
}

console.log(isIsogram('eleven')); // false
