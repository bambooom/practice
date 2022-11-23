export class Rational {
  _numerator: number;
  _denominator: number;

  constructor(numerator: number, denominator: number) {
    if (denominator === 0) {
      throw new Error('denominator for rational number cannot be 0.');
    }
    this._numerator = numerator;
    this._denominator = denominator;
  }

  public static gcd(x: number, y: number): number {
    if (x % y) {
      return Rational.gcd(y, x % y);
    } else {
      return y;
    }
  }

  add(r: Rational) {
    // (a₁ * b₂ + a₂ * b₁) / (b₁ * b₂)
    this._numerator =
      this._numerator * r._denominator + this._denominator * r._numerator;
    console.log('numer: ', this._numerator);
    this._denominator = this._denominator * r._denominator;
    console.log('deno: ', this._denominator);
    return this.reduce();
  }

  sub(r: Rational) {
    // (a₁ * b₂ - a₂ * b₁) / (b₁ * b₂)
    this._numerator =
      this._numerator * r._denominator - this._denominator * r._numerator;
    this._denominator = this._denominator * r._denominator;
    return this.reduce();
  }

  mul(r: Rational) {
    // (a₁ * a₂) / (b₁ * b₂)
    this._numerator = this._numerator * r._numerator;
    this._denominator = this._denominator * r._denominator;
    return this.reduce();
  }

  div(r: Rational) {
    // (a₁ * b₂) / (a₂ * b₁)
    if (r._numerator === 0) {
      throw new Error('cannot divide by 0');
    }
    this._numerator = this._numerator * r._denominator;
    this._denominator = this._denominator * r._numerator;
    return this.reduce();
  }

  abs() {
    this._numerator = Math.abs(this._numerator);
    this._denominator = Math.abs(this._denominator);
    return this.reduce();
  }

  exprational(exp: number) {
    if (exp === 0) return new Rational(1, 1); // 1
    if (exp < 0) {
      exp = Math.abs(exp);
      this._numerator = Math.pow(this._denominator, exp);
      this._denominator = Math.pow(this._numerator, exp);
    } else {
      this._numerator = Math.pow(this._numerator, exp);
      this._denominator = Math.pow(this._denominator, exp);
    }
    return this.reduce();
  }

  expreal(real: number): number {
    if (this._numerator === 0) {
      return 1;
    } else if (real === 0) {
      return 0;
    }
    // 1/b root
    // return Math.pow(Math.pow(real, 1 / this._denominator), this._numerator);
    return Number(
      Math.pow(real, this._numerator / this._denominator).toPrecision(15),
    );
  }

  reduce(): Rational {
    const absNumerator = Math.abs(this._numerator);
    const absDenominator = Math.abs(this._denominator);
    const g = Rational.gcd(absNumerator, absDenominator);
    return new Rational(
      (absNumerator / g) * (this._numerator * this._denominator < 0 ? -1 : 1),
      absDenominator / g,
    );
  }
}

const res = new Rational(4, 3).expreal(8);
console.log(res);
