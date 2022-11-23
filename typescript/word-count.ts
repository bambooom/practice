export function count(s: string): Map<string, number> {
  const res: Map<string, number> = new Map();
  const words = s
    .trim()
    .toLowerCase()
    // .match(/[a-z]+'?[a-z]+|[a-z]+|[0-9]+/g); // match only a-z 0-9 words
    .match(/\S+'?\S+|\S+|[0-9]+/g);
  if (words) {
    words.forEach((w) => {
      if (res.has(w)) {
        res.set(w, (res.get(w) as number) + 1);
      } else {
        res.set(w, 1);
      }
    });
  }
  return res;
}
