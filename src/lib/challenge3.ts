/*


You are playing a solitary game whose rules are as follows:
 There are n cards on the table arranged in some order
 from left to right. Each card has a power level of card[i].
 The power level of a card may be positive or negative. Your initial power is 0.
 You start from the first card on the left and go through the cards one by one.
  You can decide whether to pick up the card or not. If the card has a positive power level, its power is added to your power.
   If the card has a negative power level, your power is reduced. Your goal is to pick up the maximum number of cards possible,
   without your power dropping to a negative level (dropping to zero is allowed). If this happens, the game is over for you.
   Write a function MaxCardCount that finds the maximum number of cards you can pick up without your power going to negative levels.
 Note that you must pick up cards in the same order from left to right. The MaxCardCount function takes two parameters: n, the number of cards, and card, an array containing the power of each card.
  It returns result, the max number of cards that can be picked up.Note: 1 &lt;= n &lt;= 40 -99 &lt;= card[i]  &lt;= 99 where 0 &lt;= i &lt; n
  Input:
  n= 6 
  card = 4 -4 1 -3 1 -3
  Output: result= 5
  Explanation:
  For i=1, you will take the card, and have a power of 4.
  For i=2, you will not take the card, and your power will remain at 4.
  For i=3, you will take the card, and your power will increase to 5.
  For i=4, you will take the card, and your power will decrease to 2.

  For i=5, you will take the card, and your power will increase to 3.For i=6, you will take the card, and your power will decrease to 0.
  Therefore, you will take a total of 5 cards (i=1, 3, 4, 5, 6) from the table. Hence return 5.
  
  Example 2 Input:n= 5
card = 4 -4 -1 -2 9 
  Output: result = 4 Explanation: You will pick up the cards with powers 4, -1, -2 and 9 
  You have written the initial code, but it's not functioning as expected. Your task is to investigate the code and fix the bugs.
*/

import * as readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function maxCardCount(n: number, card: number[]): number {
  function dp(i: number, sum: number): number {
    if (i === n) {
      return 0;
    } else if (sum + card[i] - 1 >= 0) {
      return Math.max(1 + dp(i + 1, sum + card[i] - 1), dp(i + 1, sum));
    } else {
      return dp(i, sum + 1);
    }
  }

  return dp(0, 0);
}

// Read input values
rl.question("", (nStr: string) => {
  const n: number = parseInt(nStr, 10);

  rl.question("", (cardsStr: string) => {
    const cards: number[] = cardsStr.split(" ").map(Number);

    // Call the function and display the result
    const result: number = maxCardCount(n, cards);
    console.log(result);

    rl.close();
  });
});

/*
function maxCardCount(n: number, card: number[]): number {
    function dp(i: number, sum: number): number {
      if (i === n) {
        return 0;
      } else if (sum + card[i] >= 0) {
        return Math.max(1 + dp(i + 1, sum + card[i]), dp(i + 1, sum));
      } else {
        return dp(i + 1, sum);
      }
    }
  
    return dp(0, 0);
  }

  */
