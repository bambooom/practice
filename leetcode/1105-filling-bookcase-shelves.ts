// https://leetcode.com/problems/filling-bookcase-shelves
// You are given an array books where books[i] = [thicknessi, heighti] indicates the thickness and height of the ith book. You are also given an integer shelfWidth.

// We want to place these books in order onto bookcase shelves that have a total width shelfWidth.

// We choose some of the books to place on this shelf such that the sum of their thickness is less than or equal to shelfWidth, then build another level of the shelf of the bookcase so that the total height of the bookcase has increased by the maximum height of the books we just put down. We repeat this process until there are no more books to place.

// Note that at each step of the above process, the order of the books we place is the same order as the given sequence of books.

// For example, if we have an ordered list of 5 books, we might place the first and second book onto the first shelf, the third book on the second shelf, and the fourth and fifth book on the last shelf.
// Return the minimum possible height that the total bookshelf can be after placing shelves in this manner.

// dynamic programming

function minHeightShelves(books: number[][], shelfWidth: number): number {
  const n = books.length;
  const dp = new Array(n + 1).fill(0); // dp[i] represents the minimum height of the bookshelf to place the first i books.

  for (let i = 1; i <= n; i++) {
    let width = 0;
    let height = 0;
    dp[i] = Infinity;

    // consider placing the i-th book on the same shelf with some previous books up to the current shelf width constraint.
    for (let j = i; j > 0; j--) {
      width += books[j - 1][0];
      if (width > shelfWidth) {
        break;
      }
      // The height of the current shelf will be the maximum height among these books.
      height = Math.max(height, books[j - 1][1]);
      dp[i] = Math.min(dp[i], dp[j - 1] + height);
      // update it as  minimum of its current value and the value obtained by adding the height of the current shelf to dp[j-1] (the height of the bookshelf if the current shelf starts from book j).
    }
  }

  return dp[n];
}
