type Node<T> = ListNode<T> | null;

class ListNode<T> {
    value: T;
    next: Node<T>;
    prev: Node<T>;

    constructor( value: T, next: Node<T> = null, prev: Node<T> = null ){
        this.value = value;
        this.next = next;
        this.prev =  prev;
    }
}




class DoublyLinkedList<T>{
    private head: Node<T> = null;
    private tail: Node<T> = null;

    prepend(value: T){
        if( !this.head) {
            this.head = new ListNode(value);
            this.tail = this.head;
            return;
        }

        const node = new ListNode( value );
        node.next = this.head;
        this.head.prev = node;
        this.head = node;

    }

    postpend( value: T ) {
        if( !this.tail ) {
            this.tail = new ListNode( value );
            this.head = this.tail;
            return;
        }

        const node = new ListNode( value );
        this.tail.next = node;
        node.prev = this.tail;
        this.tail = node;
    }


    print(){
        let current = this.head;
        while( current ){
            console.log( current.value);
            current = current.next;
        }
    }

    printReverse(){
        let current = this.tail;
        while( current ){
            console.log( current.value );
            current = current.prev;
        }
    }


    delete( value: T): void {        

        let current:Node<T> = this.head;

        while( current ){
            if( current.value === value ){
                if( current.prev ) current.prev.next = current.next;
                else this.head = current.next;

                if( current.next ) current.next.prev = current.prev;
                else this.tail = current.prev;

                return;
            }

            current = current.next;
        }


    }
    
}

const list = new DoublyLinkedList<number>();
list.postpend(1);
list.postpend(2);
list.prepend(0);
list.print();  // Output: 0, 1, 2
list.printReverse(); // Output: 2, 1, 0
list.delete(1);
list.print();  // Output: 0, 2


export { ListNode, DoublyLinkedList };


