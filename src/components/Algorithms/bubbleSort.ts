export function bubbleSort(array: number[]): { type: string, indices: number[] }[] {
  const animations: { type: string, indices: number[] }[] = [];
  let swapped: boolean;

  // each iteration will make the last element the largest
  // hence the outer loop acts as a counter for the number of elements that are sorted
  // and the inner loop compares the elements and swaps them if necessary and only run up to the unsorted elements
  for (let i = 0; i < array.length - 1; i++) { 
    swapped = false;

    for (let j = 0; j < array.length - i - 1; j++) {
      // compare the two elements
      animations.push({
        type: 'comparison',
        indices: [j, j + 1]
      })

      if (array[j] > array[j + 1]) {
        // swap the elements 
        swap(array, j, j + 1, animations);
        swapped = true;
      }
    }

    // if no two elements were swapped, then the array is sorted
    if (!swapped) {
      break;
    };
  }

  for (let i = 0; i < array.length; i++) {
    animations.push({
      type: 'sorted',
      indices: [i]
    });
  }

  return animations;
}

function swap(array: number[], i: number, j: number, animations: { type: string, indices: number[] }[]) {
  let temp = array[i];
  array[i] = array[j];
  array[j] = temp;

  animations.push({
    type: 'swap',
    indices: [i, j]
  });
}