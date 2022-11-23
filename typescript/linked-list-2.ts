class Node<TElement> {
  value: TElement;
  prev: Node<TElement> | null;
  next: Node<TElement> | null;
  constructor(value: TElement) {
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

export class LinkedList<TElement> {
  private head: Node<TElement> | null;
  private tail: Node<TElement> | null;
  private size = 0;
  constructor() {
    this.head = null;
    this.tail = null;
  }

  public push(element: TElement): void {
    const node = new Node<TElement>(element);
    if (this.head == null) {
      this.head = node;
    }
    if (this.tail) {
      this.tail.next = node;
    }
    node.prev = this.tail;
    this.tail = node;
    this.size++;
  }
  public pop(): TElement | null {
    if (this.tail) {
      const node = this.tail;
      this.tail = this.tail.prev;
      if (this.tail) {
        this.tail.next = null;
      }
      node.prev = null;
      this.size--;
      return node.value;
    }
    return null;
  }
  public shift(): TElement | null {
    if (this.head) {
      const node = this.head;
      this.head = this.head.next;
      if (this.head) {
        this.head.prev = null;
      }
      this.size--;
      return node.value;
    }
    return null;
  }
  public unshift(element: TElement): void {
    const node = new Node<TElement>(element);
    node.next = this.head;
    if (this.head) {
      this.head.prev = node;
    }
    this.head = node;
    if (this.tail == null) {
      this.tail = node;
    }
    this.size++;
  }
  public delete(element: TElement): Node<TElement> | null {
    let curr = this.head;
    while (curr != null && curr?.value != element) {
      curr = curr.next;
    }
    if (curr) {
      if (curr.prev) {
        curr.prev.next = curr.next;
      }
      if (curr.next) {
        curr.next.prev = curr.prev;
      }
      this.size--;
    }
    return curr;
  }
  public count(): number {
    return this.size;
  }
}
