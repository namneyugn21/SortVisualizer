import closeIcon from '../../assets/icons/close.svg';
import './Infotab.css';

function InfoTab({ optionName, onClose, isOpen }: { optionName: string; onClose: () => void; isOpen: boolean }) {
  let description: string | JSX.Element = "";
  let instruction: string | JSX.Element = "";
  let timeComplexity: { best: string | JSX.Element; average: string | JSX.Element; worst: string | JSX.Element } = {
    best: "",
    average: "",
    worst: "",
  };  let spaceComplexity = "";
  let stability = "";
  let useCases: String[] = [];
  switch (optionName) {
    case 'Bubble Sort':
      description = 
      <>
        Bubble Sort is the simplest sorting algorithm that works by repeatedly swapping the adjacent elements if they are in the wrong order. This algorithm is not suitable for large data sets as its average and worst-case time complexity are quite high. (<a href="https://www.geeksforgeeks.org/bubble-sort-algorithm/" target='_blank'>Source</a>)
      </>;
      instruction = 
      <>
        <ul>
          <li>During the sorting process, the array is traversed multiple times. After the first traversal (pass), the largest element is moved to its correct position at the end of the array. Similarly, after the second traversal, the second-largest element moves to its correct position, and this pattern continues.</li>
          <li>In the demo, after every pass, the largest sorted element will be highlighted in a different color to visually indicate its position in the array.</li>
        </ul>
      </>;
      timeComplexity = {
        best: "O(n)",
        average: <>O(n<sup>2</sup>)</>,
        worst: <>O(n<sup>2</sup>)</>,
      };
      spaceComplexity = "O(1)";
      stability = "Stable";
      useCases = [
        "When the input is small and nearly sorted",
        "For educational purposes to demonstrate the concept of sorting",
        "When ease of implementation is more important than performance",
      ];
      break;
    case 'Insertion Sort':
      description = <>
        Insertion sort is a simple sorting algorithm that works by iteratively inserting each element of an unsorted list into its correct position in a sorted portion of the list. It is like sorting playing cards in your hands. You split the cards into two groups: the sorted cards and the unsorted cards. Then, you pick a card from the unsorted group and put it in the right place in the sorted group. (<a href="https://www.geeksforgeeks.org/insertion-sort/" target='_blank'>Source</a>)
      </>;
      instruction =
      <>
        <ul>
          <li>The array is divided into a sorted and unsorted portion. Starting with the second element, each element from the unsorted portion is compared to the sorted portion.</li>
          <li>Elements in the sorted portion are shifted right to make space, and the current element is inserted into its correct position.
          </li>
        </ul>
      </>;
      timeComplexity = {
        best: "O(n)",
        average: <>O(n<sup>2</sup>)</>,
        worst: <>O(n<sup>2</sup>)</>,
      };
      spaceComplexity = "O(1)";
      stability = "Stable";
      useCases = [
        "When the input size is small",
        "When the input is already mostly sorted",
        "When a simple, adaptive, and stable sorting algorithm is preferred",
      ];
      break;
    case 'Selection Sort':
      description = <>Selection Sort is a comparison-based sorting algorithm. It sorts an array by repeatedly selecting the smallest (or largest) element from the unsorted portion and swapping it with the first unsorted element. This process continues until the entire array is sorted. (<a href="https://www.geeksforgeeks.org/selection-sort-algorithm-2/" target='_blank'>Source</a>)</>;
      instruction =
      <>
        <ul>
          <li>The array is divided into a sorted and unsorted portion. Starting from the first element, the smallest element from the unsorted portion is located.</li>
          <li>Swap the smallest element with the first element of the unsorted portion, effectively adding it to the sorted portion.</li>
          <li>In the demo, the sorted portion is highlighted in a different color to visually indicate the elements that are in their correct position.</li>
        </ul>
      </>
      timeComplexity = {
        best: <>O(n<sup>2</sup>)</>,
        average: <>O(n<sup>2</sup>)</>,
        worst: <>O(n<sup>2</sup>)</>,
      };
      spaceComplexity = "O(1)";
      stability = "Not stable";
      useCases = [
        "When memory writes are a costly operation (e.g., flash-based storage)",
        "When simplicity of implementation is more important than efficiency",
        "For small datasets",
      ];
      break;
    case 'Merge Sort':
      description = <>
      Merge sort is a sorting algorithm that follows the divide-and-conquer approach. It works by recursively dividing the input array into smaller subarrays and sorting those subarrays then merging them back together to obtain the sorted array.
      <br />
      In simple terms, we can say that the process of merge sort is to divide the array into two halves, sort each half, and then merge the sorted halves back together. This process is repeated until the entire array is sorted.
      (<a href="https://www.geeksforgeeks.org/merge-sort/" target='_blank'>Source</a>)</>;
      instruction =
      <>
        <ul>
          <li><b>Divide the Array:</b> Recursively split the array into two halves until each half contains only one element (base case).</li>
          <li><b>Merge Step:</b> Compare elements from the two halves and merge them in sorted order to form a single sorted array.</li>
          <li><b>Repeat:</b> Continue merging the sorted halves step by step until the entire array is merged and sorted.</li>
        </ul>
      </>
      timeComplexity = {
        best: "O(n log n)",
        average: "O(n log n)",
        worst: "O(n log n)",
      };
      spaceComplexity = "O(n)";
      stability = "Stable";
      useCases = [
        "When stability is required (e.g., sorting linked lists)",
        "For sorting large datasets",
        "For external sorting (e.g., sorting data that doesn’t fit in memory)",
      ];
      break;
    case 'Counting Sort':
      description = <>
        Counting Sort is a non-comparison-based sorting algorithm. It is particularly efficient when the range of input values is small compared to the number of elements to be sorted. 
        <br />The basic idea behind Counting Sort is to count the frequency of each distinct element in the input array and use that information to place the elements in their correct sorted positions. (<a href="https://www.geeksforgeeks.org/counting-sort/" target='_blank'>Source</a>)
      </>
      instruction = <>
        <ul>
          <li><b>Find the Range:</b> Identify the maximum value to size the countArray</li>
          <li><b>Initialize Count Array:</b> Create a countArray with zeros where each index represents a value in the input array.</li>
          <li><b>Count Frequencies:</b> Traverse the input array, incrementing the corresponding index in the countArray.</li>
          <li><b>Build Sorted Array:</b> Use the countArray to append each value to the sorted array based on its frequency.</li>
        </ul>
      </>
      timeComplexity = {
        best: "O(n + k)",
        average: "O(n + k)",
        worst: "O(n + k)",
      };
      spaceComplexity = "O(n + k)";
      stability = "Stable";
      useCases = [
        "Efficient for datasets where elements are small, non-negative integers (e.g., student grades, ages, or IDs).",
        "Ideal for scenarios where the range of values (k) is not significantly larger than the number of elements (n), such as sorting zip codes or shoe sizes.",
        "Useful when maintaining the relative order of duplicate elements is important, such as organizing data records with duplicate keys.",
      ];
      break;
    default:
      description = "";
      timeComplexity = { best: "", average: "", worst: "" };
      spaceComplexity = "";
      stability = "";
      useCases = [];
  }

  return (
    <>
      <div className={`info-tab ${isOpen ? 'open' : ''}`}>
        <div className='close-container'>
          <img
            src={closeIcon}
            alt="Close"
            className="close-icon"
            onClick={onClose}
          />
        </div>

        <div className='section info-title'>
          <h1>{optionName}</h1>
          <p>{description}</p>
        </div>

        <div className='section info-time-complexity'>
          <h2>How it works?</h2>
          <p>{instruction}</p>
        </div>

        <div className='section info-time-complexity'>
          <h2>Time Complexity</h2>
          <ul>
            <li>Best Case: {timeComplexity.best}</li>
            <li>Average Case: {timeComplexity.average}</li>
            <li>Worst Case: {timeComplexity.worst}</li>
          </ul>
        </div>

        <div className='section info-space-complexity'>
          <h2>Space Complexity: <i>{spaceComplexity}</i></h2>
        </div>

        <div className='section info-stability'>
          <h2>Stability: <i>{stability}</i></h2>
        </div>

        <div className='section info-use-cases'>
          <h2>Use Cases</h2>
          <ul>
            {useCases.map((useCase, index) => (
              <li key={index}>{useCase}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default InfoTab;
