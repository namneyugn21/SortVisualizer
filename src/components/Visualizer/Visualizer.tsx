import { useState } from 'react';
import './Visualizer.css';
import { bubbleSort } from '../Algorithms/bubbleSort';
import { insertionSort } from '../Algorithms/insertionSort';
import { selectionSort } from '../Algorithms/selectionSort';
import soundA from '../../assets/audio/compareSound.wav';
import soundB from '../../assets/audio/swapSound.wav';

// Visualizer component
function Visualizer() {
  const ANIMATION_SPEED_MS = 75; // speed of the animations
  const compareSound = new Audio(soundA); // sound effect for comparing elements
  const swapSound = new Audio(soundB); // sound effect for swapping elements
  compareSound.volume = 0.1;
  swapSound.volume = 0.1;

  // state variables
  const [isSorting, setIsSorting] = useState<boolean>(false); // boolean to check if sorting is in progress
  const [sorted, setSorted] = useState<boolean>(false); // boolean to check if array is sorted
  const [sliderValue, setSliderValue] = useState<number>(15); // slider value to set the number of elements to be visualized
  const [array, setArray] = useState<number[]>([]);  // array of random numbers to store the numbers to be visualized

  // color codes for the bars
  const PRIMARY_COLOUR = '#a9d6e5';
  const ACTIVE_COMPARISON = '#61a5c2';
  const SORTED = '#89c2d9';


  // generate initial array when component mounts
  useState(() => {
    getRandomIntInclusive(sliderValue);
  });

  // function to generate random numbers
  function getRandomIntInclusive(numberValue: number) {
    if (isSorting) return; // return if sorting is in progress
    setSorted(false); // reset the sorted state
    setIsSorting(false); // reset the sorting state
  
    // clear previous array bar styles
    const bars = document.getElementsByClassName('barContainer')[0]?.children;
    if (bars) {
      for (let k = 0; k < bars.length; k++) {
        const bar = bars[k] as HTMLElement;
        bar.style.background = PRIMARY_COLOUR; // Reset to initial color
      }
    }

    const minCeiled = Math.ceil(5); // minimum value is 5
    const maxFloored = Math.floor(500); // maximum value is 100
    const filledArray = new Array(numberValue);
    for (let i = 0; i < numberValue; i++) {
      filledArray[i] = Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
    }
    setArray(filledArray);
  }

  // function to handle bubble sort
  function handleAnimations(sortAlgorithm: string) {
    if (isSorting) return; // return if sorting is in progress
    if (sorted) return; // return if array is already sorted
    setIsSorting(true); // set isSorting to true

    let animations: { type: string, indices: number[] }[] = [];
    let animationArray = [...array];

    // call the sorting algorithm based on the sortAlgorithm parameter
    switch (sortAlgorithm) {
      case "bubbleSort":
        animations = bubbleSort(animationArray);
        break;
      case "insertionSort":
        animations = insertionSort(animationArray);
        break;
      case "selectionSort":
        animations = selectionSort(animationArray);
        break;
      default:
        break;
    }
    
    // loop through the animations array
    for (let i = 0; i < animations.length; i++) {
      setTimeout(() => {
        const animation = animations[i];
        
        if (animation.type === 'comparison') {
          // play sound effect
          compareSound.currentTime = 0;
          compareSound.play();

          const [index1, index2] = animations[i].indices;

          // get the two elements being compared and highlight them
          const bar1 = document.getElementsByClassName('barContainer')[0].children[index1] as HTMLElement;
          const bar2 = document.getElementsByClassName('barContainer')[0].children[index2] as HTMLElement;

          bar1.style.background = ACTIVE_COMPARISON;
          bar2.style.background = ACTIVE_COMPARISON;
          
          // set the two elements back to their original color after 250ms
          setTimeout(() => {
            bar1.style.background = PRIMARY_COLOUR;
            bar2.style.background = PRIMARY_COLOUR;
          }, ANIMATION_SPEED_MS);
        } else if (animation.type === 'swap') {
          const [index1, index2] = animation.indices;

          // swap bar heights
          const bar1 = document.getElementsByClassName('barContainer')[0].children[index1] as HTMLElement;
          const bar2 = document.getElementsByClassName('barContainer')[0].children[index2] as HTMLElement;

          const tempHeight = bar1.style.height;
          bar1.style.height = bar2.style.height;
          bar2.style.height = tempHeight;

          // play sound effect
          swapSound.currentTime = 0;
          swapSound.play();
        } else if (animation.type === 'sorted') {
          const [index] = animation.indices;

          // highlight the sorted element in a different color
          const bar = document.getElementsByClassName('barContainer')[0].children[index] as HTMLElement;
          bar.style.background = SORTED;
        }
      }, i * ANIMATION_SPEED_MS);
    }

    // turn off sorting state after animations are complete
    setTimeout(() => {
      setIsSorting(false); // mark sorting as complete
      setSorted(true); // mark the array as sorted
    }, animations.length * ANIMATION_SPEED_MS);
  }

  return (
    <div className='container'>
      <div className='editContainer'>
        <h1>Sort Visualizer</h1>
        <input id="slider" type="range" defaultValue={15} min={10} max={100} step={5} onChange={(event) => setSliderValue(Number(event.target.value))} /><br />

        <div className='button-menu'>
          <button onClick={() => getRandomIntInclusive(sliderValue)}>Generate</button>
          {/* List of sorting algorithms */}
          <button onClick={() => handleAnimations("bubbleSort")}>Bubble Sort</button>
          <button onClick={() => handleAnimations("insertionSort")}>Insertion Sort</button>
          <button onClick={() => handleAnimations("selectionSort")}>Selection Sort</button>
        </div>

        <p>Generating {sliderValue} elements...</p><br />
      </div>
    
      <div className='barContainer'>
        {array.map((value, index) => {
          const maxValue = Math.max(...array);
          const heightPercentage = (value / maxValue) * 100;
          
          return (
            <div 
              key={index}
              style={{
                height: `${heightPercentage}%`,
                width: "20px",
                background: PRIMARY_COLOUR,
                margin: "0 1px",
                transition: `all ${ANIMATION_SPEED_MS}ms ease-in-out`
              }}>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Visualizer;