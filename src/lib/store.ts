class Store<T> {
    private values: Array<T> = [];
    private valueToIndices: Map<T, Set<number>> = new Map();
  
    /**
     * Insert a value into the store
     * Time Complexity: O(1)
     */
    insert(value: T): void {
      const index = this.values.length;
      this.values.push(value);
      
      if (!this.valueToIndices.has(value)) {
        this.valueToIndices.set(value, new Set());
      }
      
      this.valueToIndices.get(value)!.add(index);
    }
  
    /**
     * Delete a value from the store
     * Time Complexity: O(1)
     */
    delete(value: T): boolean {
      const indices = this.valueToIndices.get(value);
      
      if (!indices || indices.size === 0) {
        return false;
      }
      
      // Get first index of the value (any will do)
      const indexToRemove = Number(indices.values().next().value);
      
      // Get the last element in the values array
      const lastIndex = this.values.length - 1;
      const lastValue = this.values[lastIndex];
      
      // Replace the value to remove with the last value
      this.values[indexToRemove] = lastValue;
      
      // Update the indices for the last value
      this.valueToIndices.get(lastValue)!.delete(lastIndex);
      this.valueToIndices.get(lastValue)!.add(indexToRemove);
      
      // Remove the index from the set for the deleted value
      indices.delete(indexToRemove);
      
      // Remove the last element
      this.values.pop();
      
      return true;
    }
  
    /**
     * Get a random value from the store
     * Time Complexity: O(1)
     */
    getRandom(): T | undefined {
      if (this.values.length === 0) {
        return undefined;
      }
      
      const randomIndex = Math.floor(Math.random() * this.values.length);
      return this.values[randomIndex];
    }
  
    /**
     * Check if the store contains a value
     * Time Complexity: O(1)
     */
    contains(value: T): boolean {
      const indices = this.valueToIndices.get(value);
      return indices !== undefined && indices.size > 0;
    }
  
    /**
     * Get the number of elements in the store
     * Time Complexity: O(1)
     */
    size(): number {
      return this.values.length;
    }
  
    /**
     * Get all indices for a specific value
     * Time Complexity: O(1)
     */
    getIndices(value: T): number[] {
      const indices = this.valueToIndices.get(value);
      return indices ? Array.from(indices) : [];
    }
  }

export default Store;