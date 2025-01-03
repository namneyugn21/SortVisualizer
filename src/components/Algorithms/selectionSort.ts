// animation approach to the selectionSort function below:
// if the animation type is 'comparison', highlight the two elements being compared
// if the animation type is 'swap', swap the two elements
// for every run of the outer loop, we are guaranteed to have an element sorted, hence we highlight the sorted element in a different color

export function selectionSort(array: number[]): { type: string, indices: number[] }[] {
  const animations: { type: string, indices: number[] }[] = [];

  // the outer loop will iterate through the entire array
  // the inner loop will iterate through the unsorted part of the array and find the minimum value
  // when the inner loop found the min value, it will swap the min value with the first element of the unsorted part of the array
  for (let i = 0; i < array.length - 1; i++) {
    let minIndex = i;

    // find the min value in the unsorted part of the array
    for (let j = i + 1; j < array.length; j++) {
      animations.push({ 
        type: 'comparison', 
        indices: [minIndex, j] 
      });

      if (array[j] < array[minIndex]) {
        minIndex = j;
      }
    }

    // if new min value is found, swap the min value with the first element of the unsorted part of the array
    if (minIndex !== i) { 
      swap(array, i, minIndex, animations);
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
  animations.push({ 
    type: 'swap', 
    indices: [i, j] 
  });

  const temp = array[i];
  array[i] = array[j];
  array[j] = temp;
}