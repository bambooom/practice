export class Series {
  private _series: number[];
  constructor(series: string) {
    if (series === '') {
      throw new Error('series cannot be empty');
    }
    this._series = series.split('').map(Number);
  }

  slices(sliceLength: number): number[][] {
    if (sliceLength === 0) {
      throw new Error('slice length cannot be zero');
    }
    if (sliceLength < 0) {
      throw new Error('slice length cannot be negative');
    }
    const len = this._series.length;
    if (sliceLength > len) {
      throw new Error('slice length cannot be greater than series length');
    }
    if (sliceLength === len) {
      return [...[this._series]];
    }
    const res: number[][] = [];
    for (let i = 0; i <= len - sliceLength; i++) {
      res.push(this._series.slice(i, i + sliceLength));
    }
    return res;
  }
}

console.log(new Series('12').slices(1)); // [[1], [2]]
