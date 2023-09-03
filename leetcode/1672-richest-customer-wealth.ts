function maximumWealth(accounts: number[][]): number {
  let max = 0;

  for (let i = 0; i < accounts.length; i++) {
    const sum = accounts[i].reduce((a, b) => a + b);
    max = Math.max(max, sum);
  }

  return max;
}
