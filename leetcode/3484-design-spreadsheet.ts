// https://leetcode.com/problems/design-spreadsheet/
// A spreadsheet is a grid with 26 columns (labeled from 'A' to 'Z') and a given number of rows. Each cell in the spreadsheet can hold an integer value between 0 and 10^5.
// Implement the Spreadsheet class:
// Spreadsheet(int rows) Initializes a spreadsheet with 26 columns (labeled 'A' to 'Z') and the specified number of rows. All cells are initially set to 0.
// void setCell(String cell, int value) Sets the value of the specified cell. The cell reference is provided in the format "AX" (e.g., "A1", "B10"), where the letter represents the column (from 'A' to 'Z') and the number represents a 1-indexed row.
// void resetCell(String cell) Resets the specified cell to 0.
// int getValue(String formula) Evaluates a formula of the form "=X+Y", where X and Y are either cell references or non-negative integers, and returns the computed sum.
// Note: If getValue references a cell that has not been explicitly set using setCell, its value is considered 0.

// Example 1:
// Input:
// ["Spreadsheet", "getValue", "setCell", "getValue", "setCell", "getValue", "resetCell", "getValue"]
// [[3], ["=5+7"], ["A1", 10], ["=A1+6"], ["B2", 15], ["=A1+B2"], ["A1"], ["=A1+B2"]]
// Output:
// [null, 12, null, 16, null, 25, null, 15]
// Explanation
// Spreadsheet spreadsheet = new Spreadsheet(3); // Initializes a spreadsheet with 3 rows and 26 columns
// spreadsheet.getValue("=5+7"); // returns 12 (5+7)
// spreadsheet.setCell("A1", 10); // sets A1 to 10
// spreadsheet.getValue("=A1+6"); // returns 16 (10+6)
// spreadsheet.setCell("B2", 15); // sets B2 to 15
// spreadsheet.getValue("=A1+B2"); // returns 25 (10+15)
// spreadsheet.resetCell("A1"); // resets A1 to 0
// spreadsheet.getValue("=A1+B2"); // returns 15 (0+15)

// https://leetcode.com/problems/design-spreadsheet/solutions/6544170/java-javascript-typescript-c-c-kotlin-go-solution/?envType=daily-question&envId=2025-09-19
// a solution with hash table,not matrix
class Spreadsheet {
  private static EMPTY_CELL = 0;
  private cellsToValues: Map<string, number>;

  constructor(rows: number) {
    this.cellsToValues = new Map();
  }

  // Sets the value of the specified cell
  setCell(cell: string, value: number): void {
    this.cellsToValues.set(cell, value);
  }

  // Resets the specified cell to 0
  resetCell(cell: string): void {
    this.cellsToValues.delete(cell);
  }

  // Evaluates a formula of the form "=X+Y", where X and Y are either cell references or non-negative integers, and returns the computed sum
  getValue(formula: string): number {
    const indexSecondOperand = formula.indexOf('+');
    const firstValue = this.extractValue(
      formula.substring(1, indexSecondOperand),
    );
    const secondValue = this.extractValue(
      formula.substring(indexSecondOperand + 1),
    );
    return firstValue + secondValue;
  }

  private extractValue(operand: string): number {
    if (/[A-Za-z]/.test(operand.charAt(0))) {
      return this.cellsToValues.has(operand)
        ? this.cellsToValues.get(operand)!
        : Spreadsheet.EMPTY_CELL;
    }
    return Number(operand);
  }
}

/**
 * Your Spreadsheet object will be instantiated and called as such:
 * var obj = new Spreadsheet(rows)
 * obj.setCell(cell,value)
 * obj.resetCell(cell)
 * var param_3 = obj.getValue(formula)
 */

//https://leetcode.com/problems/design-spreadsheet/solutions/6705907/building-spreadsheet-with-array-and-parsing-function-to-extract-coordinates/?envType=daily-question&envId=2025-09-19
// using matrix

class Spreadsheet2 {
  grid: number[][] = [];

  constructor(rows: number) {
    this.grid = Array.from({ length: rows }, () => Array(26).fill(0));
  }

  setCell(cell: string, value: number): void {
    const [row, col] = this.getCoords(cell);
    this.grid[row][col] = value;
  }

  resetCell(cell: string): void {
    const [row, col] = this.getCoords(cell);
    this.grid[row][col] = 0;
  }

  getValue(formula: string): number {
    const f = formula.substring(1);
    const [x, y] = f.split('+');

    let v0 = 0;
    let v1 = 0;

    if (this.isNumber(x)) {
      v1 = parseInt(y);
    } else {
      const [yr, yc] = this.getCoords(y);
      v1 = this.grid[yr][yc];
    }

    return v0 + v1;
  }

  private getCoords(cell: string): [number, number] {
    const [label, row] = cell.split(/(\d+)/);
    const col = label.charCodeAt(0) - 65;
    return [parseInt(row) - 1, col];
  }

  private isNumber(n: string): boolean {
    return !Number.isNaN(parseInt(n, 10));
  }
}
