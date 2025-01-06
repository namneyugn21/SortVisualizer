import './Navbar.css';

function Navbar({ optionSelected, setOptionSelected }: { optionSelected: string, setOptionSelected: Function }) {
  return (
    <nav className='navbar'>
      <ul className='sort-menu'>
        {optionSelected === 'BUB' ? 
          <li className='selected'>BUBBLE SORT</li> : 
          <li onClick={() => setOptionSelected('BUB')}>BUB</li>
        }
        {optionSelected === 'INS' ? 
          <li className='selected'>INSERTION SORT</li> : 
          <li onClick={() => setOptionSelected('INS')}>INS</li>
        }
        {optionSelected === 'SEL' ? 
          <li className='selected'>SELECTION SORT</li> : 
          <li onClick={() => setOptionSelected('SEL')}>SEL</li>
        }
      </ul>
    </nav>
  );
}

export default Navbar;