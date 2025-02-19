export default class Queue<T> {
    private queue: T[] = [];

    push(item: T):void{
        this.queue.push(item);
    }

    pop():T | undefined{
        return this.queue.shift();
    }

    isEmpty():boolean{
        return this.queue.length === 0;
    }

    size(): number {
        return this.queue.length;
    }

    clear(): void {
        this.queue = [];
    }

    peek(): T | undefined {
        return this.queue[0];
    }


}