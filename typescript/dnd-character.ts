export class DnDCharacter {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
  hitpoints: number;

  constructor() {
    this.strength = this._getAbility();
    this.dexterity = this._getAbility();
    this.constitution = this._getAbility();
    this.intelligence = this._getAbility();
    this.wisdom = this._getAbility();
    this.charisma = this._getAbility();
    this.hitpoints = 10 + DnDCharacter.getModifierFor(this.constitution);
  }

  private _getAbility(): number {
    const a1 = DnDCharacter.generateAbilityScore();
    const a2 = DnDCharacter.generateAbilityScore();
    const a3 = DnDCharacter.generateAbilityScore();
    const a4 = DnDCharacter.generateAbilityScore();
    const max = Math.max(a1, a2, a3, a4);
    return a1 + a2 + a3 + a4 - max;
  }

  public static generateAbilityScore(): number {
    return Math.ceil(Math.random() * 6);
  }

  public static getModifierFor(abilityValue: number): number {
    return Math.floor((abilityValue - 10) / 2);
  }
}
