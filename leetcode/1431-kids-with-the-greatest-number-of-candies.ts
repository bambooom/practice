function kidsWithCandies(candies: number[], extraCandies: number): boolean[] {
  const result = new Array(candies.length).fill(false);
  const max = Math.max(...candies);

  for (let i = 0; i < candies.length; i++) {
    // if (candies[i] < max) {
    //     if (candies[i] + extraCandies >= max) {
    //         result[i] = true;
    //     }
    // } else {
    //     result[i] = true;
    // }

    // simplify above, can only check this
    if (candies[i] + extraCandies >= max) {
      result[i] = true;
    }
  }

  return result;
}

// more simple via 2 lines
function kidsWithCandies2(candies: number[], extraCandies: number): boolean[] {
  const maxNumber = Math.max(...candies);
  return candies.map((el) => el + extraCandies >= maxNumber);
}
