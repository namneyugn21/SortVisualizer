export function insertionSort(array: number[]): { type: string, indices: number[] }[] {
  // animations array to store the animations
  const animations: { type: string, indices: number[] }[] = [];

  // the outer loop will iterate through the array
  // we will mark the first element as sorted and start comparing the next element with the sorted elements
  for (let i = 1; i < array.length; i++) {
    let j = i;
    while (j > 0 && array[j] < array[j - 1]) {
      // compare the two elements
      animations.push({
        type: 'comparison',
        indices: [j, j - 1]
      });
      swap(array, j, j - 1, animations);
      j--;
    }
  }

  // highlight all the sorted elements in a different color
  for (let i = 0; i < array.length; i++) {
    animations.push({
      type: 'sorted',
      indices: [i]
    });
  }

  return animations;
}

function swap(array: number[], i: number, j: number, animations: { type: string, indices: number[] }[]) {
  // swap the elements
  animations.push({
    type: 'swap',
    indices: [i, j]
  });

  let temp = array[i];
  array[i] = array[j];
  array[j] = temp;
}