export class Squares {
  private count: number;
  constructor(count: number) {
    this.count = count;
  }

  get squareOfSum(): number {
    const sum = Array(this.count)
      .fill(0)
      .reduce((acc, _, i) => acc + i + 1, 0);
    return Math.pow(sum, 2);

    // return (this.n * (this.n + 1) / 2) ** 2;
  }

  get sumOfSquares(): number {
    return Array(this.count)
      .fill(0)
      .map((_, i) => Math.pow(i + 1, 2))
      .reduce((acc, cur) => acc + cur, 0);

    // return (this.n * (this.n + 1) * (2 * this.n + 1)) / 6;
  }

  get difference(): number {
    return Math.abs(this.sumOfSquares - this.squareOfSum);
  }
}
