import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import AddInput from './components/AddInput';

function App() {

  const [ isInputShow, setInputShow ] = useState( false );

  return (
    <div className="App">
      <Header openInput={ () => { setInputShow( !isInputShow ) } } />
      <AddInput  isInputShow={ isInputShow } />
    </div>
  );
}

export default App;
