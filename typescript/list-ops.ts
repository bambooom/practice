/**
 * Implement basic list operations.

The precise number and names of the operations to be implemented will be track dependent
to avoid conflicts with existing names, but the general operations you will implement include:
- append (given two lists, add all items in the second list to the end of the first list);
- concatenate (given a series of lists, combine all items in all lists into one flattened list);
- filter (given a predicate and a list, return the list of all items for which predicate(item) is True);
- length (given a list, return the total number of items within it);
- map (given a function and a list, return the list of the results of applying function(item) on all items);
- foldl (given a function, a list, and initial accumulator, fold (reduce) each item into the accumulator from the left using function(accumulator, item));
- foldr (given a function, a list, and an initial accumulator, fold (reduce) each item into the accumulator from the right using function(item, accumulator));
- reverse (given a list, return a list with all the original items, but in reversed order);

Using core language features to build and deconstruct arrays via destructuring,
and using the array literal [] are allowed, but no functions from the Array.prototype should be used.
In order to be able to test your solution, ensure forEach is implemented.
 */

// https://exercism.org/tracks/typescript/exercises/list-ops/solutions/eruwinu
// https://exercism.org/tracks/typescript/exercises/list-ops/solutions/rkaustchr

// https://exercism.org/tracks/typescript/exercises/list-ops/solutions/glennj
export class List {
  public values: unknown[] = [];
  private _length = 0;
  static create(...elements: unknown[]): List {
    // Do *not* construct any array literal ([]) in your solution.
    // Do *not* construct any arrays through new Array in your solution.
    // DO *not* use any of the Array.prototype methods in your solution.

    // You may use the destructuring and spreading (...) syntax from Iterable.
    return new this(elements);
  }
  constructor(elements: unknown[] = []) {
    for (const element of elements) {
      this.values[this._length++] = element;
    }
  }
  length(): number {
    return this._length;
  }
  append(other: List): List {
    for (let j = 0; j < other.length(); j++) {
      this.values[this._length++] = other.values[j];
    }
    return this;
  }
  concat(other: List): List {
    other.forEach((elem) => {
      if (elem instanceof List) {
        this.append(elem);
      } else {
        this.push(elem);
      }
    });
    return this;
  }
  // add/remove an element from start/end of list
  push(element: unknown): List {
    this.values[this._length++] = element;
    return this;
  }
  unshift(element: unknown): List {
    this.values = [element, ...this.values];
    this._length++;
    return this;
  }
  pop(): unknown {
    const value: unknown = this.values.splice(this._length - 1, 1)[0];
    this._length--;
    return value;
  }
  shift(): unknown {
    const value: unknown = this.values.splice(0, 1)[0];
    this._length--;
    return value;
  }
  // iterate over the elements
  forEach(callback: (element: unknown, index?: number) => void): void {
    for (let i = 0; i < this._length; i++) {
      callback(this.values[i], i);
    }
  }
  // implement foldl using forEach
  foldl<U, V>(callback: (accumulator: U, element: V) => U, seed: U): U {
    let accumulator = seed;
    this.forEach((element) => {
      accumulator = callback(accumulator, element as V);
    });
    return accumulator;
  }
  // all the rest can be implemented using foldl
  map<T>(callback: (element: T) => unknown): List {
    return this.foldl(
      (result, element) => result.push(callback(element as T)),
      List.create(),
    );
  }
  filter<T>(callback: (element: T) => boolean): List {
    return this.foldl((result, element) => {
      if (callback(element as T)) {
        result.push(element);
      }
      return result;
    }, List.create());
  }
  reverse(): List {
    return this.foldl(
      (result, element) => result.unshift(element),
      List.create(),
    );
  }
  foldr<U, V>(callback: (accumulator: U, element: V) => U, seed: U): U {
    return this.reverse().foldl(callback, seed);
  }
}

// https://exercism.org/tracks/javascript/exercises/list-ops/solutions/paparomeo
export class List2 {
  values: unknown[];
  constructor(values = []) {
    this.values = [...values];
  }
  _cons(value) {
    this.values = [value, ...this.values];
    return this;
  }
  append(list) {
    return this.foldr((acc, head) => acc._cons(head), list);
  }
  concat(lists) {
    return lists.foldl((acc, list) => acc.append(list), this);
  }
  filter(fn) {
    return this.foldr(
      (acc, head) => (fn(head) ? acc._cons(head) : acc),
      new List(),
    );
  }
  length() {
    return this.foldl((acc) => acc + 1, 0);
  }
  map(fn) {
    return this.foldr((acc, head) => acc._cons(fn(head)), new List());
  }
  foldl(fn, acc) {
    if (this.values.length === 0) return acc;
    const [head, ...tail] = this.values;
    return new List(tail).foldl(fn, fn(acc, head));
  }
  foldr(fn, acc) {
    if (this.values.length === 0) return acc;
    const [head, ...tail] = this.values;
    return fn(new List(tail).foldr(fn, acc), head);
  }
  reverse() {
    return this.foldl((acc, head) => acc._cons(head), new List());
  }
}

// https://exercism.org/tracks/typescript/exercises/list-ops/solutions/SleeplessByte
const Null: Cons = {
  get value() {
    return undefined;
  },
  get next() {
    return this;
  },
  get() {
    return this.value;
  },
  push(item): Cons {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    return new Cons(item, this);
  },

  length() {
    return 0;
  },

  append(other: Cons): Cons {
    return other;
  },

  concat(): Cons {
    return this;
  },

  forEach(): void {
    /* done */
  },

  foldl<TValue = unknown, TReturn = unknown>(
    _: (initial: TReturn, value: TValue) => TReturn,
    initial?: TReturn,
  ): TReturn {
    return initial as TReturn;
  },

  foldr<TValue = unknown, TReturn = unknown>(
    _: (initial: TReturn, value: TValue) => TReturn,
    initial?: TReturn,
  ): TReturn {
    return initial as TReturn;
  },

  filter(): Cons {
    return Null;
  },

  reverse(): Cons {
    return this;
  },

  map(): Cons {
    return this;
  },
};
class Cons {
  constructor(public readonly value: unknown, public next: Cons = Null) {}
  public get(i: number): unknown {
    return i === 0 ? this.value : this.next.get(i - 1);
  }
  public push(item: unknown): this {
    this.next = this.next.push(item);
    return this;
  }
  public length(): number {
    return 1 + this.next.length();
  }
  public append(other: Cons): Cons {
    return other.foldl((result, item) => result.push(item), this);
  }
  public concat(others: Cons): Cons {
    return others.foldl<Cons, Cons>(
      (result, other) => result.append(other),
      this,
    );
  }
  public foldl<TValue = unknown>(
    callback: (initial: TValue, value: TValue) => TValue,
  ): TValue;
  public foldl<TValue = unknown, TReturn = unknown>(
    callback: (initial: TReturn, value: TValue) => TReturn,
    initial: TReturn,
  ): TReturn;
  public foldl<TValue = unknown, TReturn = unknown>(
    callback: (initial: TReturn | undefined, value: TValue) => TReturn,
    initial?: TReturn,
  ): TReturn {
    return this.next.foldl<TValue, TReturn>(
      callback,
      callback(initial, this.value as TValue),
    );
  }
  public forEach(callback: (value: unknown) => void): void {
    this.foldl((_, item) => callback(item));
  }
  public foldr<TValue = unknown>(
    callback: (initial: TValue, value: TValue) => TValue,
  ): TValue;
  public foldr<TValue = unknown, TReturn = unknown>(
    callback: (initial: TReturn, value: TValue) => TReturn,
    initial: TReturn,
  ): TReturn;
  public foldr<TValue = unknown, TReturn = unknown>(
    callback: (initial: TReturn, value: TValue) => TReturn,
    initial?: TReturn,
  ): TReturn {
    return callback(
      this.next.foldr<TValue, TReturn>(callback, initial as TReturn),
      this.value as TValue,
    );
  }
  public filter<TValue = unknown>(predicate: (value: TValue) => boolean): Cons {
    return this.foldl<TValue, Cons>(
      (result, item) => (predicate(item) && result.push(item)) || result,
      Null,
    );
  }
  public map<TValue = unknown, TReturn = unknown>(
    expression: (value: TValue) => TReturn,
  ): Cons {
    return this.foldl<TValue, Cons>(
      (result, item) => result.push(expression(item)),
      Null,
    );
  }
  public reverse(): Cons {
    return this.next.reverse().push(this.value);
  }
}
export class List3 {
  public static create(...values: unknown[]): Cons {
    const [head, ...tail] = values;
    if (head === undefined) {
      return Null;
    }
    return new Cons(head, List3.create(...tail));
  }
}

// https://exercism.org/tracks/typescript/exercises/list-ops/solutions/luan
export class List4 {
  private _head: Node | null;
  private _tail: Node | null;

  public static create(...values: any[]): List {
    const list = new List();
    for (const v of values) {
      list.push(v);
    }
    return list;
  }
  constructor(head: Node | null = null, tail: Node | null = null) {
    this._head = head;
    this._tail = tail;
  }
  private push(value: any): void {
    const node = new Node({
      value: value,
      next: null,
      prev: this._tail,
    });

    if (this._head == null) {
      this._head = node;
    }
    if (this._tail != null) {
      this._tail.next = node;
    }

    this._tail = node;
  }
  append(other: List): List {
    const list = new List();
    this.forEach((v) => list.push(v));
    other.forEach((v) => list.push(v));
    return list;
  }
  concat(other: List): List {
    let list = new List();
    const f = (v: any) => {
      if (v instanceof List) {
        list = list.concat(v);
      } else {
        list.push(v);
      }
    };
    this.forEach(f);
    other.forEach(f);
    return list;
  }
  filter<T>(f: (v: T) => boolean): List {
    const list = new List();
    this.forEach((v) => f(v) && list.push(v));
    return list;
  }
  map<T>(f: (v: T) => T): List {
    const list = new List();
    this.forEach((v) => list.push(f(v)));
    return list;
  }
  foldl<Ta, Tv>(f: (a: Ta, v: Tv) => Ta, initial: Ta): Ta {
    let acc: Ta = initial;
    this.forEach((v) => (acc = f(acc, v)));
    return acc;
  }
  foldr<Ta, Tv>(f: (a: Ta, v: Tv) => Ta, initial: Ta): Ta {
    return this.reverse().foldl<Ta, Tv>(f, initial);
  }
  reverse(): List {
    const list = new List();
    this.forEachR((v) => list.push(v));
    return list;
  }
  length(): number {
    return this.map<number>((_) => 1).foldl<number, number>((a, v) => a + v, 0);
  }
  forEach(f: (v: any) => void): void {
    let node = this._head;
    while (node != null) {
      f(node.value);
      node = node.next;
    }
  }
  forEachR(f: (v: any) => void): void {
    let node = this._tail;
    while (node != null) {
      f(node.value);
      node = node.prev;
    }
  }
}
class Node {
  private _value: any;
  prev: Node | null;
  next: Node | null;
  constructor({
    value,
    prev,
    next,
  }: {
    value: any;
    prev: Node | null;
    next: Node | null;
  }) {
    this._value = value;
    this.prev = prev;
    this.next = next;
  }
  get value() {
    return this._value;
  }
}
