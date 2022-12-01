// a^2 + b^2 = c^2
// a < b < c
// a + b + c = N

type Options = {
  minFactor?: number;
  maxFactor?: number;
  sum: number;
};

export function triplets({ minFactor, maxFactor, sum }: Options): Triplet[] {
  const results: Triplet[] = [];
  for (let a = minFactor || 1; a < Math.floor(sum / 3); a++) {
    for (let b = a + 1; b < Math.floor(sum / 2); b++) {
      const c = sum - a - b;
      if (c < (maxFactor || sum) && a ** 2 + b ** 2 === c ** 2) {
        results.push(new Triplet(a, b, c));
      }
    }
  }

  return results;
}

class Triplet {
  constructor(private a: number, private b: number, private c: number) {}

  toArray(): [number, number, number] {
    return [this.a, this.b, this.c];
  }
}
