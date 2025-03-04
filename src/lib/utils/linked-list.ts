class Node<T> {
    value: T;
    next: Node<T> | null;

    constructor(value: T) {
        this.value = value;
        this.next = null;
    }

}

class LinkedList<T> {
    head: Node<T> | null;
    
    constructor() {
        this.head = null;     
    }

    prepend(value: T){
        const node = new Node(value);
        const head = this.head;
        this.head = node;
        this.head.next = head;        
    }

    postpend(value: T){
        const node  = new Node(value);
        if( !this.head ) {
            this.head = node;
            return;
        }

        let current = this.head;
        while(current?.next){
            current = current.next;
        }
        current.next = node;
    }


    delete(value: T){
        let current = this.head;
        if( current?.value === value) {
            this.head = current.next;
            return;
        }
        while( current?.next){
            if( current.next?.value === value){
                current.next = current.next.next;
                return;
            }
            current = current.next;
        }
    }

    print(){
        let current = this.head;
        while( current ){
            console.log( current.value );
            current = current.next;
        }
    }


}

const list = new LinkedList<number>();
list.postpend(1);
list.postpend(2);
list.prepend(0);
list.print(); // Output: 0, 1, 2
console.log("--------------");
list.delete(1);
list.print(); // Output: 0, 2

export { Node, LinkedList };