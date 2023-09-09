// https://leetcode.com/problems/lemonade-change/

function lemonadeChange(bills: number[]): boolean {
  if (bills.length === 0) return false;
  if (bills[0] !== 5) return false;

  const hash = new Map<number, number>();
  hash.set(5, 1);
  hash.set(10, 0);

  for (let i = 1; i < bills.length; i++) {
    if (bills[i] === 5) {
      hash.set(5, (hash.get(5) as number) + 1);
    } else if (bills[i] === 10) {
      if (hash.get(5) === 0) {
        return false;
      } else {
        hash.set(10, (hash.get(10) as number) + 1);
        hash.set(5, (hash.get(5) as number) - 1);
      }
    } else if (bills[i] === 20) {
      if ((hash.get(10) as number) > 0 && (hash.get(5) as number) > 0) {
        hash.set(10, (hash.get(10) as number) - 1);
        hash.set(5, (hash.get(5) as number) - 1);
      } else if ((hash.get(5) as number) >= 3) {
        hash.set(5, (hash.get(5) as number) - 3);
      } else {
        return false;
      }
    }
  }

  return true;
}
