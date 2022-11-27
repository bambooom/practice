export class ComplexNumber {
  private _a: number; // real
  private _b: number; // imaginary _b ^ 2 = -1
  constructor(real: number, imaginary: number) {
    this._a = real;
    this._b = imaginary;
  }

  public get real(): number {
    return this._a;
  }

  public get imag(): number {
    return this._b;
  }

  public add(other: ComplexNumber): ComplexNumber {
    return new ComplexNumber(this._a + other.real, this._b + other.imag);
  }

  public sub(other: ComplexNumber): ComplexNumber {
    return new ComplexNumber(this._a - other.real, this._b - other.imag);
  }

  public div(other: ComplexNumber): ComplexNumber {
    const { _a: a, _b: b } = this;
    const { real: c, imag: d } = other;
    return new ComplexNumber(
      (a * c + b * d) / (c ** 2 + d ** 2),
      (b * c - a * d) / (c ** 2 + d ** 2),
    );
  }

  public mul(other: ComplexNumber): ComplexNumber {
    const { _a: a, _b: b } = this;
    const { real: c, imag: d } = other;
    return new ComplexNumber(a * c - b * d, b * c + a * d);
  }

  public get abs(): number {
    return Math.sqrt(this._a ** 2 + this._b ** 2);
  }

  public get conj(): ComplexNumber {
    return new ComplexNumber(this._a, this._b === 0 ? 0 : this._b * -1);
  }

  public get exp(): ComplexNumber {
    return new ComplexNumber(
      Math.E ** this._a * Math.cos(this._b),
      Math.E ** this._a * Math.sin(this._b),
    );
  }
}
