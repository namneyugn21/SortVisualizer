import closeIcon from '../../assets/icons/close.svg';
import './Infotab.css';

function InfoTab({ optionName, onClose, isOpen }: { optionName: string; onClose: () => void; isOpen: boolean }) {
  let description = "";
  let timeComplexity: { best: string | JSX.Element; average: string | JSX.Element; worst: string | JSX.Element } = {
    best: "",
    average: "",
    worst: "",
  };  let spaceComplexity = "";
  let stability = "";
  let useCases: String[] = [];
  switch (optionName) {
    case 'Bubble Sort':
      description = "Bubble sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. This process is repeated until the list is sorted.";
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
      description = "Insertion sort is a simple sorting algorithm that builds the final sorted array one item at a time by inserting each new item into its correct position relative to the already sorted items.";
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
      description = "Selection sort is an in-place comparison sorting algorithm. It repeatedly selects the smallest element from the unsorted part of the list and swaps it with the first unsorted element.";
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
      description = "Merge sort is an efficient, stable, comparison-based sorting algorithm. It uses a divide-and-conquer strategy to split the array into halves, recursively sort them, and then merge the sorted halves back together.";
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
