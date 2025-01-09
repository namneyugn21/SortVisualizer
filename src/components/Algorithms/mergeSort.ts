export function mergeSort(array: number[]): { type: string, indices: number[] }[] {
  // animations array to store the animations
  const animations: { type: string, indices: number[] }[] = [];

  // call the mergeSort function
  const auxArray = [...array]; // create a copy of the array to store the intermediate values
  mergeSortHelper(array, auxArray, 0, array.length - 1, animations);

  return animations;
}

function mergeSortHelper(
  array: number[], 
  auxArray: number[], 
  start: number, 
  end: number, 
  animations: { type: string, indices: number[] }[]
) {
  if (start === end) return; // base case

  const middle = Math.floor((start + end) / 2);

  // recursively call mergeSort on the left and right halves until the base case is reached aka one element in the array
  mergeSortHelper(auxArray, array, start, middle, animations); // pass auxArray as the main array and vice versa
  mergeSortHelper(auxArray, array, middle + 1, end, animations);

  merge(array, auxArray, start, middle, end, animations);
}

function merge(
  array: number[],
  auxArray: number[],
  start: number,
  middle: number,
  end: number,
  animations: { type: string, indices: number[] }[]
) {
  let i = start; // pointer for the left subarray
  let j = middle + 1; // pointer for the right subarray
  let k = start; // pointer for the main array that will store the next smallest element

  // highlight the range of elements being merged
  for (let l = start; l <= end; l++) {
    animations.push({ 
      type: 'highlighted', 
      indices: [l] 
    });
  }
  
  while (i <= middle && j <= end) {
    // Comparison:
    // The condition auxArray[i] <= auxArray[j] checks whether 
    // the current element in the left subarray (auxArray[i]) is smaller than 
    // or equal to the current element in the right subarray (auxArray[j])

    // Decision:
    // If auxArray[i] is smaller or equal, it should go into the main array first (at index k).
    // Otherwise, auxArray[j] (the smaller value) is placed into the main array.
    if (auxArray[i] <= auxArray[j]) {
      animations.push({ 
        type: 'overwrite', 
        indices: [k, auxArray[i]] 
      });
      array[k++] = auxArray[i++];
    } else {
      animations.push({ 
        type: 'overwrite', 
        indices: [k, auxArray[j]] 
      });
      array[k++] = auxArray[j++];
    }
  }


  // The while loops ensure that any leftover elements from the left or right subarray are copied into the main array. 
  // This is essential because merge sort divides the array into subarrays, and during the merge step, one subarray may have elements remaining after the comparisons are complete.
  while (i <= middle) {
    animations.push({ 
      type: 'overwrite', 
      indices: [k, auxArray[i]] 
    });
    array[k++] = auxArray[i++];
  }

  while (j <= end) {
    animations.push({ 
      type: 'overwrite', 
      indices: [k, auxArray[j]] 
    });
    array[k++] = auxArray[j++];
  }
}