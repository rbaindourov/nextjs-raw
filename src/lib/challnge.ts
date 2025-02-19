    /**
     * @description Splits an array of mixed data types into three separate arrays: integers, strings, and special characters.
     * 
     * The integers array will include numeric strings that can be converted to integers.
     * 
     * @example
     * Input: input = ['A', 'B', 'C', 1, 2, 3, '4', '5', 6, '@', '~', 'D', '0']
     * Output:
     *   integers = [1, 2, 3, 4, 5, 6]
     *   strings = ['A', 'B', 'C', 'D']
     *   specialChars = ['@', '~']
     */
    function stringSplit( input: (string|number)[]  = [ 'A', 'B','C', 1, 2, 3, '4', '5', 6, '@', '~', 'D', '0' ] ) {
    
        const integers: number[] = input
            .filter( (item): item is number => typeof item === 'number' || !isNaN( Number(item) ) )
            .map((item) => Number(item) );

        const characters = input.filter( 
          (item): item is string => 
            typeof item === 'string' &&  
            item.charCodeAt(0) >= 'A'.charCodeAt(0) && 
            item.charCodeAt(0) <= 'Z'.charCodeAt(0)       
        )

        const special = input.filter( 
          (item): item is string => 
            typeof item === 'string' &&
            isNaN( Number(item) ) && 
            !(item.charCodeAt(0) >= 'A'.charCodeAt(0) && 
              item.charCodeAt(0) <= 'Z'.charCodeAt(0)) 
          )
          
        console.log( `ingteger = ${integers}`);
        console.log( `string = ${characters}` )
        console.log( `chars = ${special}`  ); 

    }

    stringSplit();

    /**
     *  
     * @description Splits an integer array into two arrays with random elements and calculates the sum of each array.
     * 
     * @example
     * Input: integer = [1, 2, 3, 4, 5, 6]
     * Output:
     *   array_1 = [1, 4, 6]
     *   array_2 = [2, 3, 5]
     *   array_1 sum = 11
     *   array_2 sum = 10
     */
    function integerSplit( input: (number)[]  = [ 1, 2, 3, 4, 5, 6 ] ) {
        const random = input.sort( () => Math.random() - 0.5 );
        const array_1 =  random.splice( 0, Math.random() * random.length );
        const array_2 =  random;
        
        console.log( `array_1 = ${array_1}`);
        console.log( `array_2 = ${array_2}`);

        const sum1 =array_1.reduce( (a,b) => a + b, 0 );
        const sum2 =array_2.reduce( (a,b) => a + b, 0 )
        
        console.log( `array_1 sum = ${sum1}`);
        console.log( `array_2 sum = ${sum2}`);
    }

    integerSplit();

    type TreeNodeType<T> = TreeNode<T> | null;

    class TreeNode<T> {
        value: T;
        left: TreeNode<T> | null;
        right: TreeNode<T> | null;
        constructor(value: T, left: TreeNodeType<T> = null, right: TreeNodeType<T> = null,) {
            this.value = value;
            this.left = left;
            this.right = right;
        }
    }

  
  //is binary tree balanced
  function isBalacned<T>( root:TreeNodeType<T> = null ): boolean {
    function checkHeight<T>( node: TreeNodeType<T> ): number {
      if( !node ) return 0;
      
      const left = checkHeight( node.left );
      if( left === -1 ) return -1;
      
      const right = checkHeight( node.right );
      if( right === -1 ) return -1;

      if( Math.abs( left - right ) > 1) return -1;

      return Math.max(left, right) + 1;
    }

    return checkHeight(root) !== -1;
  }

  const tree1 = new TreeNode(1,
    new TreeNode(2, new TreeNode(4), new TreeNode(5)),
    new TreeNode(3)
  );
  
  const balanced = isBalacned(tree1);
  console.log( `tree1 isBalacned() =   ${balanced}` );


//-------------------------------------------------------------
  const tree2 =  new TreeNode(1,
    new TreeNode(2),
    new TreeNode(3,
      null,
      new TreeNode(4,
        null,
        new TreeNode(5)
      )
    )
  );

  const balanced2 = isBalacned(tree2);
  console.log(  `tree2 isBalacned() =   ${balanced2}` );

