export function countingSort(array: number[]): { type: string, indices: number[] }[] {
  // we will have two animations arrays - one for the comparison animations and one for the overwrite animations
  const animations: { type: string, indices: number[], value?: number }[] = [];

  // find the maximum value in the array
  const max = Math.max(...array);

  // create a count array with size max + 1
  // count array serves as a frequency array
  // we will create the sorted array animations
  // countArray index represents the element in the array and 
  // the value at that index represents the count of that element
  const countArray = new Array(max + 1).fill(0);
  for (let i = 0; i < array.length; i++) {
    countArray[array[i]]++;
    animations.push({
      type: 'overwrite',
      indices: [i, 0] // store the index and the value of the element
    })
    animations.push({
      type: 'count',
      indices: [array[i]], // store the element
      value: countArray[array[i]] // store the count of the element
    })
  }

  // calculate the prefix sum of the count array
  // prefix sum is the sum of all elements from the start of the array to the current index
  // now, countArray will represent the index at which each element should be placed in the sorted array - 1
  const sortedArray: number[] = [];
  for (let value = 0; value < countArray.length; value++) {
    while (countArray[value] > 0) {
      sortedArray.push(value);
      animations.push({
        type: 'overwrite',
        indices: [sortedArray.length - 1, value], // Store the index and the value being placed
      });
      countArray[value]--; // Decrease the count for this value
      animations.push({
        type: 'count',
        indices: [value], // Store the value
        value: countArray[value], // Store the count of the value
      });
    }
  }

  // mark as done
  animations.push({
    type: 'done',
    indices: []
  });

  return animations;
}