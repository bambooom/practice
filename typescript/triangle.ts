// Determine if a triangle is equilateral, isosceles, or scalene.
// An equilateral triangle has all three sides the same length.
// An isosceles triangle has at least two sides the same length.
//   (It is sometimes specified as having exactly two sides the same length, but for the purposes of this exercise we'll say at least two.)
// A scalene triangle has all sides of different lengths.

export class Triangle {
  sides: number[];
  constructor(...sides: number[]) {
    this.sides = sides;
  }

  checkValid(): boolean {
    const [e1, e2, e3] = this.sides;
    const allPositive = this.sides.every((e) => e > 0);
    if (!allPositive) return false;
    if (e1 + e2 >= e3 && e1 + e3 >= e2 && e2 + e3 >= e1) {
      return true;
    }
    return false;
  }

  get isEquilateral(): boolean {
    const valid = this.checkValid();
    if (!valid) return false;
    const [e1, e2, e3] = this.sides;
    return e1 === e2 && e2 === e3;
  }

  get isIsosceles(): boolean {
    const valid = this.checkValid();
    if (!valid) return false;
    const [e1, e2, e3] = this.sides;
    return e1 === e2 || e2 === e3 || e1 === e3;
  }

  get isScalene(): boolean {
    const valid = this.checkValid();
    if (!valid) return false;
    const [e1, e2, e3] = this.sides;
    return e1 !== e2 && e1 !== e3 && e2 !== e3;
  }
}
