export const square = (i: number): bigint => {
  if (i <= 0 || i > 64) {
    throw new Error('not in the input range');
  }
  return 2n ** BigInt(i - 1);
};

export const total = (): bigint => {
  // const grains: bigint[] = [];
  // for (let i = 0; i < 64; i++) {
  //   grains.push(square(i + 1));
  // }

  // return grains.reduce((acc, pre) => acc + pre, 0n);
  return 2n ** 64n - 1n; // 1 + 2^1 + 2^2 + 2^3 + ... + 2^63 = 2^64 - 1
};
