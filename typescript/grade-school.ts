export class GradeSchool {
  private _database: { [key: string]: number };
  constructor() {
    this._database = {};
  }

  roster() {
    const res: { [key: number]: string[] } = {};
    for (const [name, grade] of Object.entries(this._database)) {
      if (!res[grade]) {
        res[grade] = [];
      }
      res[grade].push(name);
      res[grade].sort();
    }
    return res;
  }

  add(name: string, grade: number): void {
    this._database[name] = grade;
  }

  grade(gr: number): string[] {
    return this.roster()[gr] ?? [];
  }
}
