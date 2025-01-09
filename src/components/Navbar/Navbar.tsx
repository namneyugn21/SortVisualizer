import { useState } from 'react';
import './Navbar.css';
import InfoTab from '../Infotab/Infotab';

function Navbar({ optionSelected, setOptionSelected }: { optionSelected: string, setOptionSelected: Function }) {
  const [optionName, setOptionName] = useState('Bubble Sort');
  const [showInfo, setShowInfo] = useState(false);

  return (
    <nav className='navbar'>
      <ul className='sort-menu'>
        {optionSelected === 'BUB' ? 
          <li className='selected'>BUBBLE SORT</li> : 
          <li onClick={() => {setOptionSelected('BUB'), setOptionName('Bubble Sort')}}>BUB</li>
        }
        {optionSelected === 'INS' ? 
          <li className='selected'>INSERTION SORT</li> : 
          <li onClick={() => {setOptionSelected('INS'), setOptionName('Insertion Sort')}}>INS</li>
        }
        {optionSelected === 'SEL' ? 
          <li className='selected'>SELECTION SORT</li> : 
          <li onClick={() => {setOptionSelected('SEL'), setOptionName('Selection Sort')}}>SEL</li>
        }
        {optionSelected === 'MER' ? 
          <li className='selected'>MERGE SORT</li> : 
          <li onClick={() => {setOptionSelected('MER'), setOptionName('Merge Sort')}}>MER</li>
        }
      </ul>
      <ul className='info-menu'>
        <li onClick={() => setShowInfo(true)}>Learn more about {optionName}</li>
      </ul>

      {showInfo && (
        <InfoTab
          optionName={optionName}
          onClose={() => setShowInfo(false)}
          isOpen={showInfo}
        />
      )}
    </nav>
  );
}

export default Navbar;