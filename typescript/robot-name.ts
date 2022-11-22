export class Robot {
  private _name: string;
  public static _used: Set<string> = new Set();

  constructor() {
    let newName = this.generateRandomName();
    while (Robot._used.has(newName)) {
      newName = this.generateRandomName();
    }
    this._name = newName;
    Robot._used.add(newName);
  }

  generateRandomName() {
    const char = () =>
      'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.charAt(Math.round(Math.random() * 26));
    const digit = () => Math.round(Math.random() * 9);
    return char() + char() + digit() + digit() + digit();
  }

  public get name(): string {
    return this._name;
  }

  public resetName(): void {
    const origName = this._name;
    let newName = this.generateRandomName();
    while (newName === origName || Robot._used.has(newName)) {
      newName = this.generateRandomName();
    }
    this._name = newName;
    Robot._used.delete(origName);
    Robot._used.add(newName);
  }

  public static releaseNames(): void {
    Robot._used.clear();
  }
}
