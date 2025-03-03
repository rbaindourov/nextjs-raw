/**
 * @param {number[]} arr
 * @return {number[][]}
 */
const permutations = (arr: number[] = [1, 2, 3]): number[][] => {
  const result: number[][] = [];

  const backtrack = (temp: number[], start: number) => {
    for (let i = start; i < arr.length; i++) {
      temp.push(arr[i]);
      result.push([...temp]);
      backtrack(temp, start + 1);
      temp.pop();
    }
  };

  backtrack([], 0);

  return result;
};

console.log(permutations());

/**
 * @param {number[]} arr
 * @return {number[][]}
 */
const subarrays = (arr: number[] = [1, 2, 3]): number[][] => {
  const result: number[][] = [];

  const backtrack = (temp: number[], start: number) => {
    for (let i = start; i < arr.length; i++) {
      temp.push(arr[i]);
      result.push([...temp]);
      backtrack(temp, i + 1);
      temp.pop();
    }
  };

  backtrack([], 0);

  return result;
};

console.log(subarrays());

const greedyPermutations = (arr: number[] = [1, 2, 3]): number[][] => {
  const result: number[][] = [];

  const backtrack = (temp: number[], start: number) => {
    result.push([...temp]);
    for (let i = start; i < arr.length; i++) {
      temp.push(arr[i]);
      backtrack(temp, start + 1);
      temp.pop();
    }
  };

  backtrack([], 0);

  return result;
};

console.log(greedyPermutations());
