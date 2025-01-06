import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import Visualizer from './components/Visualizer/Visualizer'

function App() {
  const [optionSelected, setOptionSelected] = useState<string>('BUB')

  return (
    <div className="App">
      <Navbar optionSelected={optionSelected} setOptionSelected={setOptionSelected} />
      <Visualizer optionSelected={optionSelected} />
    </div>
  )
}

export default App
