/**
 * Given a score, guess what's the allergies:
 *
 * allergies list included:
 * eggs (1)
 * peanuts (2)
 * shellfish (4)
 * strawberries (8)
 * tomatoes (16)
 * chocolate (32)
 * pollen (64)
 * cats (128)
 *
 * Others for 256, 512, 1024 may be valid, but not indluded
 */

/**
 * Each allergen is assigned to an index such that 2^index = allergen score.
 * For example:
 * 2^3 === 8 === strawberries score
 * This allows us to take the allergies score, convert it to a binary number, and know which allergies are present
 * based on which digits are 1.
 * For example:
 * Allergies score = 53
 * 53 in binary = 110101
 * From right, 0, 2, 4, and 5 places have a 1
 * So allergies = [eggs, shellfish, tomatoes, chocolate]
 */

export class Allergies {
  allergeList: string[];
  static ALLERGIES = [
    'eggs',
    'peanuts',
    'shellfish',
    'strawberries',
    'tomatoes',
    'chocolate',
    'pollen',
    'cats',
  ];

  // right shift: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Right_shift
  constructor(score = 0) {
    this.allergeList = Allergies.ALLERGIES.filter((_, i) => (score >> i) & 1);
  }

  public list(): string[] {
    return [...this.allergeList];
  }

  public allergicTo(allergen: string): boolean {
    return this.allergeList.includes(allergen);
  }
}
