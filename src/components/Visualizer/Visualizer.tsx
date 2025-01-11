import { useState, useEffect } from 'react';
import './Visualizer.css';
import { bubbleSort } from '../Algorithms/bubbleSort';
import { insertionSort } from '../Algorithms/insertionSort';
import { selectionSort } from '../Algorithms/selectionSort';
import { mergeSort } from '../Algorithms/mergeSort';
import soundA from '../../assets/audio/compareSound.wav';
import soundB from '../../assets/audio/swapSound.wav';
import { countingSort } from '../Algorithms/countingSort';

// Visualizer component
function Visualizer({ optionSelected }: { optionSelected: string }) {
  const ANIMATION_SPEED_MS = 100; // speed of the animations
  const compareSound = new Audio(soundA); // sound effect for comparing elements
  const swapSound = new Audio(soundB); // sound effect for swapping elements
  compareSound.volume = 0.1;
  swapSound.volume = 0.1;

  // state variables
  const [isSorting, setIsSorting] = useState<boolean>(false); // boolean to check if sorting is in progress
  const [sorted, setSorted] = useState<boolean>(false); // boolean to check if array is sorted
  const [sliderValue, setSliderValue] = useState<number>(15); // slider value to set the number of elements to be visualized
  const [array, setArray] = useState<number[]>([]);  // array of random numbers to store the numbers to be visualized
  const [isNonComparison, setIsNonComparison] = useState<boolean>(true); // boolean to check if the sort algorithm is non-comparison based

  // color codes for the bars
  const PRIMARY_COLOUR = '#ffc285'; // golden Sand
  // const SECONDARY_COLOUR = '#b8a38d'; // taupe beige
  const TERTIARY_COLOUR = '#a44a3f'; // clay red
  const ACTIVE = '#693f1a'; // desert mahogany
  const SORTED = '#d88252'; // terracotta orange

  // generate random numbers when the optionSelected changes or the component mounts
  useEffect(() => {
    getRandomIntInclusive(sliderValue);
  }, [optionSelected]);

  // function to generate random numbers
  function getRandomIntInclusive(numberValue: number) {
    if (isSorting) return; // return if sorting is in progress
    setIsNonComparison(false); // check if the sort algorithm is non-comparison based
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

    const minCeiled = Math.ceil(1); // minimum value is 5
    const maxFloored = Math.floor(10); // maximum value is 100
    const filledArray = new Array(numberValue);
    for (let i = 0; i < numberValue; i++) {
      filledArray[i] = Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
    }
    setArray(filledArray);
  }

  // function to handle comparison-based sort
  function handleAnimations() {
    if (isSorting) return; // return if sorting is in progress
    if (sorted) return; // return if array is already sorted
    setIsSorting(true); // set isSorting to true
    setIsNonComparison(optionSelected === 'COU'); // check if the sort algorithm is non-comparison based

    let animations: { type: string, indices: number[], value?: number }[] = [];
    let animationArray = [...array];

    // call the sorting algorithm based on the sortAlgorithm parameter
    switch (optionSelected) {
      case "BUB":
        animations = bubbleSort(animationArray);
        break;
      case "INS":
        animations = insertionSort(animationArray);
        break;
      case "SEL":
        animations = selectionSort(animationArray);
        break;
      case "MER":
        animations = mergeSort(animationArray);
        break;
      case "COU":
        animations = countingSort(animationArray);
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

          bar1.style.background = ACTIVE;
          bar2.style.background = ACTIVE;
          
          // set the two elements back to their original color after 250ms
          setTimeout(() => {
            bar1.style.background = PRIMARY_COLOUR;
            bar2.style.background = PRIMARY_COLOUR;
          }, ANIMATION_SPEED_MS);

        } else if (animation.type === 'overwrite') {
          const [index, newValue] = animation.indices;
        
          // overwrite bar height with the new value
          const bar = document.getElementsByClassName('barContainer')[0].children[index] as HTMLElement;
          const maxValue = Math.max(...array);
          const newHeightPercentage = (newValue / maxValue) * 100;
        
          bar.style.background = SORTED;
          bar.style.height = `${newHeightPercentage}%`;

          // play sound effect
          swapSound.currentTime = 0;
          swapSound.play();
        } else if (animation.type === 'highlighted') {
          const [index] = animation.indices;

          // highlight the range of elements being merged
          const bar = document.getElementsByClassName('barContainer')[0].children[index] as HTMLElement;
          bar.style.background = TERTIARY_COLOUR; 

          // play sound effect
          compareSound.currentTime = 0;
          compareSound.play();
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
        } else if (animation.type === 'count') {
          const [index] = animation.indices;
          const count = animation.value || 0;
          
          // add opacity to the count bar
          const bar = document.getElementsByClassName('countBarContainer')[0].children[index] as HTMLElement;
          bar.style.opacity = '1.0';

          const countValue = document.getElementsByClassName('countBarContainer')[0].children[index].children[0] as HTMLElement;
          if (countValue) {
            countValue.innerHTML = count.toString();
          }

          // change the opacity of the count bar to 0.25 when the count is zero
          if (count === 0) {
            bar.style.opacity = '0.25';
          }
        } else if (animation.type === 'done') {
          // hide the countBarContainer after sorting is complete
          const display = document.getElementsByClassName('countBarContainer')[0] as HTMLElement;
          display.classList.add('hidden');

          // make it corresponding with the CSS transition time
          setTimeout(() => {
            display.style.display = 'none';
          }, 500);
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
        <input id="slider" type="range" defaultValue={15} min={10} max={50} step={5} onChange={(event) => setSliderValue(Number(event.target.value))} />

        <div className='button-menu'>
          <button onClick={() => getRandomIntInclusive(sliderValue)}>Generate</button>
          {/* List of sorting algorithms */}
          <button onClick={() => handleAnimations()}>Sort</button>
        </div>

        <p>Sorting {sliderValue} elements...</p>
      </div>
    
      <div className='visualizer'>
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
                  margin: "0 0.5px",
                  transition: `all ${ANIMATION_SPEED_MS}ms ease-in-out`
                }}>
              </div>
            );
          })}
        </div>

        {isNonComparison && (
          <div className='countBarContainer'>
            {/* create an array of size {Math.max(...array) + 1}
            then fill it initially with zeros 
            the map(_, index) notation means that we are not using the first argument of the map function as it is not needed
            */}
            {new Array(Math.max(0, ...array) + 1).fill(0).map((_, index) => (
              <div
                key={index}
                style={{
                  height: `${index / Math.max(...array) * 100}%`, // initially zero height
                  width: "20px",
                  background: PRIMARY_COLOUR,
                  opacity: 0.25,
                  margin: "0 0.5px",
                  transition: `all ${ANIMATION_SPEED_MS}ms ease-in-out`,
                }}
              >
                <p id='countValue'>0</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Visualizer;