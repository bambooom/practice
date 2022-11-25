// Given a moment, determine the moment that would be after a gigasecond has passed.
// A gigasecond is 10^9 (1,000,000,000) seconds.

export class Gigasecond {
  time: number;
  constructor(date: Date) {
    this.time = date.getTime();
  }
  public date(): Date {
    const after = this.time / 1000 + Math.pow(10, 9);
    return new Date(after * 1000);
  }
}
