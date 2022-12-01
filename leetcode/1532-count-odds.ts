function countOdds(low: number, high: number): number {
  if (low % 2 === 0) {
    return Math.floor((high - low + 1) / 2);
  } else {
    return Math.floor((high - low) / 2) + 1;
  }
}
