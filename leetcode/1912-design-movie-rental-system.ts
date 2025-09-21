// https://leetcode.com/problems/design-movie-rental-system/
// You have a movie renting company consisting of n shops. You want to implement a renting system that supports searching for, booking, and returning movies. The system should also support generating a report of the currently rented movies.
// Each movie is given as a 2D integer array entries where entries[i] = [shopi, moviei, pricei] indicates that there is a copy of movie moviei at shop shopi with a rental price of pricei. Each shop carries at most one copy of a movie moviei.
// The system should support the following functions:
// - Search: Finds the cheapest 5 shops that have an unrented copy of a given movie. The shops should be sorted by price in ascending order, and in case of a tie, the one with the smaller shopi should appear first. If there are less than 5 matching shops, then all of them should be returned. If no shop has an unrented copy, then an empty list should be returned.
// - Rent: Rents an unrented copy of a given movie from a given shop.
// - Drop: Drops off a previously rented copy of a given movie at a given shop.
// - Report: Returns the cheapest 5 rented movies (possibly of the same movie ID) as a 2D list res where res[j] = [shopj, moviej] describes that the jth cheapest rented movie moviej was rented from the shop shopj. The movies in res should be sorted by price in ascending order, and in case of a tie, the one with the smaller shopj should appear first, and if there is still tie, the one with the smaller moviej should appear first. If there are fewer than 5 rented movies, then all of them should be returned. If no movies are currently being rented, then an empty list should be returned.

// Implement the MovieRentingSystem class:
// MovieRentingSystem(int n, int[][] entries) Initializes the MovieRentingSystem object with n shops and the movies in entries.
// List<Integer> search(int movie) Returns a list of shops that have an unrented copy of the given movie as described above.
// void rent(int shop, int movie) Rents the given movie from the given shop.
// void drop(int shop, int movie) Drops off a previously rented movie at the given shop.
// List<List<Integer>> report() Returns a list of cheapest rented movies as described above.
// Note: The test cases will be generated such that rent will only be called if the shop has an unrented copy of the movie, and drop will only be called if the shop had previously rented out the movie.

// Example 1:
// Input
// ["MovieRentingSystem", "search", "rent", "rent", "report", "drop", "search"]
// [[3, [[0, 1, 5], [0, 2, 6], [0, 3, 7], [1, 1, 4], [1, 2, 7], [2, 1, 5]]], [1], [0, 1], [1, 2], [], [1, 2], [2]]
// Output
// [null, [1, 0, 2], null, null, [[0, 1], [1, 2]], null, [0, 1]]
// Explanation
// MovieRentingSystem movieRentingSystem = new MovieRentingSystem(3, [[0, 1, 5], [0, 2, 6], [0, 3, 7], [1, 1, 4], [1, 2, 7], [2, 1, 5]]);
// movieRentingSystem.search(1);  // return [1, 0, 2], Movies of ID 1 are unrented at shops 1, 0, and 2. Shop 1 is cheapest; shop 0 and 2 are the same price, so order by shop number.
// movieRentingSystem.rent(0, 1); // Rent movie 1 from shop 0. Unrented movies at shop 0 are now [2,3].
// movieRentingSystem.rent(1, 2); // Rent movie 2 from shop 1. Unrented movies at shop 1 are now [1].
// movieRentingSystem.report();   // return [[0, 1], [1, 2]]. Movie 1 from shop 0 is cheapest, followed by movie 2 from shop 1.
// movieRentingSystem.drop(1, 2); // Drop off movie 2 at shop 1. Unrented movies at shop 1 are now [1,2].
// movieRentingSystem.search(2);  // return [0, 1]. Movies of ID 2 are unrented at shops 0 and 1. Shop 0 is cheapest, followed by shop 1.

// Constraints:

// 1 <= n <= 3 * 10^5
// 1 <= entries.length <= 10^5
// 0 <= shopi < n
// 1 <= moviei, pricei <= 10^4
// Each shop carries at most one copy of a movie moviei.
// At most 10^5 calls in total will be made to search, rent, drop and report.

// https://leetcode.com/problems/design-movie-rental-system/solutions/7209498/movie-rental-system-efficient-multi-heap-solution/?envType=daily-question&envId=2025-09-21
// This problem requires managing two different types of queries efficiently:
// Search: Find cheapest available movies (sorted by price → shop)
// Report: Find cheapest rented movies (sorted by price → shop → movie)
// The key insight is that we need separate priority queues for each concern, plus efficient state tracking to handle rent/drop operations.
//
// using a multi-heap architecture with lazy deletion handling:

import { PriorityQueue as PQ } from '@datastructures-js/priority-queue';

type Pair = [number, number];
type PairReport = [number, number, number];

class MovieRentingSystem {
  // shop : {movie : price} (In this case we can take price in O(1), availability check
  shopStore: Map<number, Map<number, number>>;
  // same logic as above but bookkeeping for rented once
  rentedShopMovie: Map<number, Map<number, number>>;
  heapReport: PQ<PairReport>; // heap for not rented movies
  heap: Map<number, PQ<Pair>>; // heap for rented movies

  constructor(n: number, entries: number[][]) {
    this.shopStore = new Map();
    this.rentedShopMovie = new Map();
    this.heapReport = new PQ((a: PairReport, b: PairReport) => {
      if (a[0] !== b[0]) return a[0] - b[0];
      if (a[1] !== b[1]) return a[1] - b[1];
      return a[2] - b[2];
    }); //sort by -> price, shop, movie
    this.heap = new Map(); // here we need store not only PQ but movies -> to PQ to get fast access

    for (let i = 0; i < entries.length; i++) {
      let [shop, movie, price] = entries[i];
      if (!this.shopStore.has(shop)) {
        this.shopStore.set(shop, new Map());
      }
      if (!this.rentedShopMovie.has(shop)) {
        this.rentedShopMovie.set(shop, new Map());
      }
      if (!this.heap.has(movie)) {
        this.heap.set(
          movie,
          new PQ((a: Pair, b: Pair) => {
            if (a[0] !== b[0]) return a[0] - b[0];
            return a[1] - b[1];
          }),
        );
      }
      this.heap.get(movie)!.enqueue([price, shop]);
      this.shopStore.get(shop)!.set(movie, price);
    }
  }

  search(movie: number): number[] {
    const temp: Pair[] = [];
    const hashSet: Set<string> = new Set();
    const res: number[] = [];
    if (!this.heap.get(movie)) {
      return [];
    }

    while (temp.length < 5 && this.heap.get(movie)!.size() > 0) {
      let [price, shop] = this.heap.get(movie)!.dequeue()!;
      let key = `${shop}`;

      if (this.shopStore.get(shop)!.has(movie) && !hashSet.has(key)) {
        temp.push([price, shop]);
        hashSet.add(key);
        res.push(shop);
      }
    }

    for (let i = 0; i < temp.length; i++) {
      this.heap.get(movie)!.enqueue([...temp[i]]);
    }

    return res;
  }

  rent(shop: number, movie: number): void {
    let price = this.shopStore.get(shop)!.get(movie)!;
    this.shopStore.get(shop)!.delete(movie);
    this.rentedShopMovie.get(shop)!.set(movie, price);
    this.heapReport.enqueue([price, shop, movie]);
  }

  drop(shop: number, movie: number): void {
    let price = this.rentedShopMovie.get(shop)!.get(movie)!;
    this.rentedShopMovie.get(shop)!.delete(movie);
    this.shopStore.get(shop)!.set(movie, price);
    this.heap.get(movie)!.enqueue([price, shop]);
  }

  report(): number[][] {
    const temp: PairReport[] = [];
    const res: Pair[] = [];
    const hashSet: Set<string> = new Set();

    while (temp.length < 5 && this.heapReport.size() > 0) {
      let [price, shop, movie] = this.heapReport.dequeue()!;
      let key = `${shop}-${movie}`;

      if (this.rentedShopMovie.get(shop)!.has(movie) && !hashSet.has(key)) {
        temp.push([price, shop, movie]);
        hashSet.add(key);
        res.push([shop, movie]);
      }
    }

    for (let i = 0; i < temp.length; i++) {
      this.heapReport.enqueue([...temp[i]]);
    }

    return res;
  }
}

/**
 * Your MovieRentingSystem object will be instantiated and called as such:
 * var obj = new MovieRentingSystem(n, entries)
 * var param_1 = obj.search(movie)
 * obj.rent(shop,movie)
 * obj.drop(shop,movie)
 * var param_4 = obj.report()
 */
