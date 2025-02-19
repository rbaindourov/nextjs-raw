export default class Stack<T> {
    private stack: T[] = [];

    push(item: T) {
        this.stack.push(item);
    };

    isEmpty():boolean{
        return this.stack.length === 0;
    }

    pop():T|undefined{
        return this.stack.pop();
    }

    peek():T|undefined{
        return this.stack[this.stack.length -1];
    }

    size():number{
        return this.stack.length;        
    }

    clear(){
        this.stack = [];
    }

}