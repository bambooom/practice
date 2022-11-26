// Perfect: aliquot sum = number
// Abundant: aliquot sum > number
// Deficient: aliquot sum < number

export function classify(num: number): string {
  const divisorsSum = (n: number) =>
    [...Array(n - 1)]
      .map((v, i) => i + 1)
      .reduce((s, a) => {
        return s + (!(n % a) ? a : 0);
      }, 0);

  if (divisorsSum(num) === num) return 'perfect';
  else if (divisorsSum(num) > num) return 'abundant';
  else return 'deficient';
}

console.log(classify(6));
