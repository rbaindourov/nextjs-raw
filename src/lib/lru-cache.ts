class LRUNode<K, V> {
    key: K;
    value: V;
    prev: LRUNode<K, V> | null = null;
    next: LRUNode<K, V> | null = null;
  
    constructor(key: K, value: V) {
      this.key = key;
      this.value = value;
    }
  }

  
class LRUCache<K, V> {
    private capacity: number;
    private cache: Map<K, LRUNode<K, V>>;
    private head: LRUNode<K, V> | null = null;
    private tail: LRUNode<K, V> | null = null;
  
    constructor(capacity: number) {
      this.capacity = capacity;
      this.cache = new Map<K, LRUNode<K, V>>();
    }
  
    get(key: K): V | undefined {
      const node = this.cache.get(key);
      if (node) {
        this.moveToFront(node);
        return node.value;
      }
      return undefined;
    }
  
    put(key: K, value: V): void {
      if (this.cache.has(key)) {
        const node = this.cache.get(key)!;
        node.value = value;
        this.moveToFront(node);
      } else {
        const newNode = new LRUNode(key, value);
        if (this.cache.size >= this.capacity) {
          this.removeLeastUsed();
        }
        this.addToFront(newNode);
        this.cache.set(key, newNode);
      }
    }
  
    private moveToFront(node: LRUNode<K, V>): void {
      if (node === this.head) return;
  
      if (node.prev) node.prev.next = node.next;
      if (node.next) node.next.prev = node.prev;
      if (node === this.tail) this.tail = node.prev;
  
      node.prev = null;
      node.next = this.head;
      if (this.head) this.head.prev = node;
      this.head = node;
  
      if (!this.tail) this.tail = node;
    }
  
    private addToFront(node: LRUNode<K, V>): void {
      node.next = this.head;
      if (this.head) this.head.prev = node;
      this.head = node;
      if (!this.tail) this.tail = node;
    }
  
    private removeLeastUsed(): void {
      if (!this.tail) return;
  
      const leastUsed = this.tail;
      this.tail = this.tail.prev;
      if (this.tail) this.tail.next = null;
      else this.head = null;
  
      this.cache.delete(leastUsed.key);
    }
  
    // Optional: method to get the current size of the cache
    size(): number {
      return this.cache.size;
    }
  }
  

  // Create a new LRU cache with a capacity of 3
const cache = new LRUCache<string, number>(3);

// Add some items
cache.put("one", 1);
cache.put("two", 2);
cache.put("three", 3);

console.log(cache.get("one"));   // Output: 1
console.log(cache.get("two"));   // Output: 2

// This will evict "three" as it's the least recently used
cache.put("four", 4);

console.log(cache.get("three")); // Output: undefined
console.log(cache.get("four"));  // Output: 4

console.log(cache.size());       // Output: 3
