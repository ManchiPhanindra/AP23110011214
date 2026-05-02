export class PriorityQueue<T> {
  private heap: T[] = [];
  private comparator: (a: T, b: T) => number;

  constructor(comparator: (a: T, b: T) => number) {
    this.comparator = comparator;
  }

  public push(val: T): void {
    this.heap.push(val);
    this.siftUp();
  }

  public pop(): T | undefined {
    if (this.size() === 0) return undefined;
    const top = this.heap[0];
    const bottom = this.heap.pop();
    if (this.size() > 0 && bottom !== undefined) {
      this.heap[0] = bottom;
      this.siftDown();
    }
    return top;
  }

  public peek(): T | undefined {
    return this.heap[0];
  }

  public size(): number {
    return this.heap.length;
  }

  public toArray(): T[] {
    return [...this.heap];
  }

  private siftUp(): void {
    let node = this.heap.length - 1;
    while (node > 0) {
      const parent = Math.floor((node - 1) / 2);
      if (this.comparator(this.heap[node], this.heap[parent]) < 0) {
        this.swap(node, parent);
        node = parent;
      } else {
        break;
      }
    }
  }

  private siftDown(): void {
    let node = 0;
    while (true) {
      const left = 2 * node + 1;
      const right = 2 * node + 2;
      let smallest = node;

      if (left < this.heap.length && this.comparator(this.heap[left], this.heap[smallest]) < 0) {
        smallest = left;
      }
      if (right < this.heap.length && this.comparator(this.heap[right], this.heap[smallest]) < 0) {
        smallest = right;
      }

      if (smallest !== node) {
        this.swap(node, smallest);
        node = smallest;
      } else {
        break;
      }
    }
  }

  private swap(i: number, j: number): void {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }
}
