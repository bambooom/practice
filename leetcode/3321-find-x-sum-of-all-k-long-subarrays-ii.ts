// https://leetcode.com/problems/find-x-sum-of-all-k-long-subarrays-ii
// You are given an array nums of n integers and two integers k and x.
// The x-sum of an array is calculated by the following procedure:
// Count the occurrences of all elements in the array.
// Keep only the occurrences of the top x most frequent elements. If two elements have the same number of occurrences, the element with the bigger value is considered more frequent.
// Calculate the sum of the resulting array.
// Note that if an array has less than x distinct elements, its x-sum is the sum of the array.
// Return an integer array answer of length n - k + 1 where answer[i] is the x-sum of the subarray nums[i..i + k - 1].

// Example 1:
// Input: nums = [1,1,2,2,3,4,2,3], k = 6, x = 2
// Output: [6,10,12]
// Explanation:
// For subarray [1, 1, 2, 2, 3, 4], only elements 1 and 2 will be kept in the resulting array. Hence, answer[0] = 1 + 1 + 2 + 2.
// For subarray [1, 2, 2, 3, 4, 2], only elements 2 and 4 will be kept in the resulting array. Hence, answer[1] = 2 + 2 + 2 + 4. Note that 4 is kept in the array since it is bigger than 3 and 1 which occur the same number of times.
// For subarray [2, 2, 3, 4, 2, 3], only elements 2 and 3 are kept in the resulting array. Hence, answer[2] = 2 + 2 + 2 + 3 + 3.

// Example 2:
// Input: nums = [3,8,7,8,7,5], k = 2, x = 2
// Output: [11,15,15,15,12]
// Explanation:
// Since k == x, answer[i] is equal to the sum of the subarray nums[i..i + k - 1].

// Constraints:
// nums.length == n
// 1 <= n <= 10^5
// 1 <= nums[i] <= 10^9
// 1 <= x <= k <= nums.length

// Note: almost same with Q3318, but Constraints changed

// https://leetcode.com/problems/find-x-sum-of-all-k-long-subarrays-ii/editorial/?envType=daily-question&envId=2025-11-05
// Editorial: Hash Table + Ordered Set
// Intuition:
// When we calculate the x-sum of the subarray starting at nums[i] and then calculate the x-sum of the subarray starting at nums[i+1],
// the latter includes nums[i+k] instead of nums[i]. Therefore, we need to design a data structure that supports the following three operations:
//   - Add an element.
//   - Delete an element.
//   - Calculate the x-sum of all current elements
// According to the problem description, x-sum is the sum of the x most frequently occurring elements. T
// his suggests that we can use a sorted set to maintain these elements and their frequencies.
// Specifically, we maintain two sorted sets:
//   - A set large for the most frequently occurring x elements.
//   -  A set small for the remaining elements.
// Each item in a sorted set is a tuple (occ,num), representing the element num and its frequency occ.
// Both sorted sets are maintained in ascending order based on occ as the primary key and num as the secondary key.
// When we add an element num, we first obtain its occurrence count occ.
// If occ>0, we remove (occ,num) from the ordered set and then add (occ+1,num).
// When we delete an element num, we obtain its occurrence count occ, remove (occ,num) from the ordered set, and if occ>1, we add (occ−1,num).
// For adding (occ,num) to an ordered set:
//  - If the number of tuples in large is less than x, add (occ,num) to large.
//  - If (occ,num) is smaller than the smallest pair in large, add it to small.
//  - Otherwise, remove the smallest tuple from large, move it to small, and add (occ,num) to large.
// For removing (occ,num) from an ordered set:
//  - If (occ,num) is smaller than the smallest pair in large, it belongs to small and should be removed from it.
//  - Otherwise, it is removed from large. At this point, if small is not empty, the largest tuple in small is moved to large.
// The frequency occ of each element can be maintained using an auxiliary hash table.
// Whenever a pair is added to or removed from large, we increase or decrease occ×num accordingly.
// This allows us to efficiently obtain the x-sum at any moment.

import { AvlTree } from '@datastructures-js/binary-search-tree';
type FrequencyPair = [number, number];
class Helper {
  private x: number;
  private result: bigint;
  private large: AvlTree<FrequencyPair>;
  private small: AvlTree<FrequencyPair>;
  private occ: Map<number, number>;

  constructor(x: number) {
    this.x = x;
    this.result = 0n;

    const comparator = (a: FrequencyPair, b: FrequencyPair): number => {
      if (a[0] !== b[0]) {
        return a[0] - b[0];
      }
      return a[1] - b[1];
    };

    this.large = new AvlTree<FrequencyPair>(comparator);
    this.small = new AvlTree<FrequencyPair>(comparator);
    this.occ = new Map<number, number>();
  }

  insert(num: number): void {
    const currentFreq = this.occ.get(num) || 0;
    if (currentFreq > 0) {
      this.internalRemove([currentFreq, num]);
    }

    const newFreq = currentFreq + 1;
    this.occ.set(num, newFreq);
    this.internalInsert([newFreq, num]);
  }

  remove(num: number): void {
    const currentFreq = this.occ.get(num);
    if (currentFreq === undefined || currentFreq === 0) {
      return;
    }
    this.internalRemove([currentFreq, num]);
    const newFreq = currentFreq - 1;
    if (newFreq > 0) {
      this.occ.set(num, newFreq);
      this.internalInsert([newFreq, num]);
    } else {
      this.occ.delete(num);
    }
  }

  get(): number {
    return Number(this.result);
  }

  private internalInsert(p: FrequencyPair): void {
    const [freq, value] = p;
    const minLarge = this.large.min();
    if (
      this.large.count() < this.x ||
      (minLarge && this.comparePairs(p, minLarge.getValue()) > 0)
    ) {
      this.result += BigInt(freq) * BigInt(value);
      this.large.insert(p);
      if (this.large.count() > this.x) {
        const smallestLarge = this.large.min();
        if (smallestLarge) {
          const value = smallestLarge.getValue();
          this.result -= BigInt(value[0]) * BigInt(value[1]);
          this.large.remove(value);
          this.small.insert(value);
        }
      }
    } else {
      this.small.insert(p);
    }
  }

  private internalRemove(p: FrequencyPair): void {
    const [freq, value] = p;

    if (this.large.has(p)) {
      this.result -= BigInt(freq) * BigInt(value);
      this.large.remove(p);
      if (this.small.count() > 0) {
        const largestSmall = this.small.max();
        if (largestSmall) {
          const value = largestSmall.getValue();
          this.result += BigInt(value[0]) * BigInt(value[1]);
          this.small.remove(value);
          this.large.insert(value);
        }
      }
    } else {
      this.small.remove(p);
    }
  }

  private comparePairs(a: FrequencyPair, b: FrequencyPair): number {
    if (a[0] !== b[0]) {
      return a[0] - b[0];
    }
    return a[1] - b[1];
  }
}

function findXSum(nums: number[], k: number, x: number): number[] {
  const helper = new Helper(x);
  const ans: number[] = [];

  for (let i = 0; i < nums.length; i++) {
    helper.insert(nums[i]);

    if (i >= k) {
      helper.remove(nums[i - k]);
    }

    if (i >= k - 1) {
      ans.push(helper.get());
    }
  }

  return ans;
}

// https://leetcode.com/problems/find-x-sum-of-all-k-long-subarrays-ii/solutions/7327345/sliding-window-top-x-frequency-sum-types-63b9/?envType=daily-question&envId=2025-11-05
// Intuition:
// We want to calculate, for each sliding window of size k, the weighted sum of the x most frequent elements — where the weight of an element is (value * frequency).
// A naïve approach would be to recount all elements in every window, resulting in O(n * k) time, which is inefficient for large inputs.
// Instead, we can maintain frequency information dynamically as the window slides, updating only the elements entering and leaving the window.

// Approach:
// Maintain two balanced ordered sets:
//  - top — stores the current top x elements with the highest frequencies (and higher values as tiebreakers).
//  - rest — stores the remaining elements.
// As each new element enters or leaves the window:
//  1. Update its frequency count in a hash map.
//  2. Remove the old (value, freq) pair from top or rest.
//  3. Insert the new (value, freq) pair into rest.
//  4. Rebalance: move elements between top and rest to ensure top always contains the highest x elements.
// The sum of (value * frequency) in top represents the answer for the current window.
// The Red-Black Tree ensures all insertions, deletions, and min/max operations are O(log n).

function findXSumII2(nums: number[], k: number, x: number): number[] {
  const freq = new Map<number, number>();
  const top = new OrderedSet();
  const rest = new OrderedSet();
  let sum = 0,
    res: number[] = [];

  const rebalance = () => {
    while (top.size > x) {
      const m = top.getMin();
      if (!m) break;
      const [a, b] = m;
      top.delete(a, b);
      sum -= a * b;
      rest.insert(a, b);
    }
    while (top.size < x && rest.size) {
      const m = rest.getMax();
      if (!m) break;
      const [a, b] = m;
      rest.delete(a, b);
      top.insert(a, b);
      sum += a * b;
    }
    while (top.size && rest.size) {
      const minT = top.getMin()!,
        maxR = rest.getMax()!;
      if (OrderedSet.cmp(maxR, minT) > 0) {
        top.delete(minT[0], minT[1]);
        rest.delete(maxR[0], maxR[1]);
        sum -= minT[0] * minT[1];
        sum += maxR[0] * maxR[1];
        top.insert(maxR[0], maxR[1]);
        rest.insert(minT[0], minT[1]);
      } else break;
    }
  };

  const add = (n: number) => {
    const c = freq.get(n) ?? 0;
    if (c) {
      if (!rest.delete(n, c)) {
        if (top.delete(n, c)) sum -= n * c;
      }
    }
    freq.set(n, c + 1);
    rest.insert(n, c + 1);
    rebalance();
  };

  const remove = (n: number) => {
    const c = freq.get(n)!;
    if (!rest.delete(n, c)) {
      if (top.delete(n, c)) sum -= n * c;
    }
    if (c - 1 > 0) {
      freq.set(n, c - 1);
      rest.insert(n, c - 1);
    } else freq.delete(n);
    rebalance();
  };

  for (let i = 0; i < nums.length; i++) {
    add(nums[i]);
    if (i >= k) remove(nums[i - k]);
    if (i >= k - 1) res.push(sum);
  }
  return res;
}

class RBNode {
  k: number;
  v: number;
  c: 'r' | 'b';
  l: RBNode;
  r: RBNode;
  p: RBNode;
  constructor(k: number, v: number, nil: RBNode) {
    this.k = k;
    this.v = v;
    this.c = 'r';
    this.l = this.r = this.p = nil;
  }
}

class RBTree {
  nil: RBNode;
  root: RBNode;
  constructor() {
    this.nil = new RBNode(0, 0, null as any);
    this.nil.c = 'b';
    this.nil.l = this.nil.r = this.nil.p = this.nil;
    this.root = this.nil;
  }
  static cmpKV(a: [number, number], b: [number, number]) {
    return a[1] === b[1] ? a[0] - b[0] : a[1] - b[1];
  }
  insert(k: number, v: number): boolean {
    const z = new RBNode(k, v, this.nil);
    let y = this.nil,
      x = this.root;
    while (x !== this.nil) {
      y = x;
      const c = RBTree.cmpKV([z.k, z.v], [x.k, x.v]);
      if (c === 0) return false;
      x = c < 0 ? x.l : x.r;
    }
    z.p = y;
    if (y === this.nil) this.root = z;
    else if (RBTree.cmpKV([z.k, z.v], [y.k, y.v]) < 0) y.l = z;
    else y.r = z;
    z.l = z.r = this.nil;
    z.c = 'r';
    this.fixIns(z);
    return true;
  }
  delete(k: number, v: number): boolean {
    let z = this.root;
    while (z !== this.nil) {
      const c = RBTree.cmpKV([k, v], [z.k, z.v]);
      if (c === 0) break;
      z = c < 0 ? z.l : z.r;
    }
    if (z === this.nil) return false;
    let y = z,
      yc = y.c,
      x: RBNode;
    if (z.l === this.nil) {
      x = z.r;
      this.trans(z, z.r);
    } else if (z.r === this.nil) {
      x = z.l;
      this.trans(z, z.l);
    } else {
      y = this.min(z.r);
      yc = y.c;
      x = y.r;
      if (y.p === z) x.p = y;
      else {
        this.trans(y, y.r);
        y.r = z.r;
        y.r.p = y;
      }
      this.trans(z, y);
      y.l = z.l;
      y.l.p = y;
      y.c = z.c;
    }
    if (yc === 'b') this.fixDel(x);
    return true;
  }
  min(n: RBNode) {
    while (n.l !== this.nil) n = n.l;
    return n;
  }
  max(n: RBNode) {
    while (n.r !== this.nil) n = n.r;
    return n;
  }
  trans(u: RBNode, v: RBNode) {
    if (u.p === this.nil) this.root = v;
    else if (u === u.p.l) u.p.l = v;
    else u.p.r = v;
    v.p = u.p;
  }
  fixIns(z: RBNode) {
    while (z.p.c === 'r') {
      const gp = z.p.p;
      if (z.p === gp.l) {
        const y = gp.r;
        if (y.c === 'r') {
          z.p.c = y.c = 'b';
          gp.c = 'r';
          z = gp;
        } else {
          if (z === z.p.r) {
            z = z.p;
            this.left(z);
          }
          z.p.c = 'b';
          gp.c = 'r';
          this.right(gp);
        }
      } else {
        const y = gp.l;
        if (y.c === 'r') {
          z.p.c = y.c = 'b';
          gp.c = 'r';
          z = gp;
        } else {
          if (z === z.p.l) {
            z = z.p;
            this.right(z);
          }
          z.p.c = 'b';
          gp.c = 'r';
          this.left(gp);
        }
      }
    }
    this.root.c = 'b';
  }
  fixDel(x: RBNode) {
    while (x !== this.root && x.c === 'b') {
      if (x === x.p.l) {
        let w = x.p.r;
        if (w.c === 'r') {
          w.c = 'b';
          x.p.c = 'r';
          this.left(x.p);
          w = x.p.r;
        }
        if (w.l.c === 'b' && w.r.c === 'b') {
          w.c = 'r';
          x = x.p;
        } else {
          if (w.r.c === 'b') {
            w.l.c = 'b';
            w.c = 'r';
            this.right(w);
            w = x.p.r;
          }
          w.c = x.p.c;
          x.p.c = 'b';
          w.r.c = 'b';
          this.left(x.p);
          x = this.root;
        }
      } else {
        let w = x.p.l;
        if (w.c === 'r') {
          w.c = 'b';
          x.p.c = 'r';
          this.right(x.p);
          w = x.p.l;
        }
        if (w.r.c === 'b' && w.l.c === 'b') {
          w.c = 'r';
          x = x.p;
        } else {
          if (w.l.c === 'b') {
            w.r.c = 'b';
            w.c = 'r';
            this.left(w);
            w = x.p.l;
          }
          w.c = x.p.c;
          x.p.c = 'b';
          w.l.c = 'b';
          this.right(x.p);
          x = this.root;
        }
      }
    }
    x.c = 'b';
  }
  left(x: RBNode) {
    const y = x.r;
    x.r = y.l;
    if (y.l !== this.nil) y.l.p = x;
    y.p = x.p;
    if (x.p === this.nil) this.root = y;
    else if (x === x.p.l) x.p.l = y;
    else x.p.r = y;
    y.l = x;
    x.p = y;
  }
  right(x: RBNode) {
    const y = x.l;
    x.l = y.r;
    if (y.r !== this.nil) y.r.p = x;
    y.p = x.p;
    if (x.p === this.nil) this.root = y;
    else if (x === x.p.r) x.p.r = y;
    else x.p.l = y;
    y.r = x;
    x.p = y;
  }
}

class OrderedSet {
  t = new RBTree();
  size = 0;
  static cmp(a: [number, number], b: [number, number]) {
    return RBTree.cmpKV(a, b);
  }
  insert(k: number, v: number): boolean {
    const ok = this.t.insert(k, v);
    if (ok) this.size++;
    return ok;
  }
  delete(k: number, v: number): boolean {
    const ok = this.t.delete(k, v);
    if (ok) this.size--;
    return ok;
  }
  getMin(): [number, number] | null {
    if (!this.size) return null;
    const n = this.t.min(this.t.root);
    return [n.k, n.v];
  }
  getMax(): [number, number] | null {
    if (!this.size) return null;
    const n = this.t.max(this.t.root);
    return [n.k, n.v];
  }
}
