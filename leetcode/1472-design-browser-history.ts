// https://leetcode.com/problems/design-browser-history

class BrowserHistory {
  history: string[];
  current: number;
  constructor(homepage: string) {
    this.history = [homepage];
    this.current = 0;
  }

  visit(url: string): void {
    this.current++;
    this.history = this.history.slice(0, this.current);
    this.history.push(url);
  }

  back(steps: number): string {
    this.current = Math.max(0, this.current - steps);
    return this.history[this.current];
  }

  forward(steps: number): string {
    this.current = Math.min(this.history.length - 1, this.current + steps);
    return this.history[this.current];
  }
}

/**
 * Your BrowserHistory object will be instantiated and called as such:
 * var obj = new BrowserHistory(homepage)
 * obj.visit(url)
 * var param_2 = obj.back(steps)
 * var param_3 = obj.forward(steps)
 */
