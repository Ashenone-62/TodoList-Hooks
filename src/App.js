import React, { useState, useCallback } from 'react';
import './App.css';
import Header from './components/Header';
import AddInput from './components/AddInput';

function App() {

  const [ isInputShow, setInputShow ] = useState(false);
  const [ todoList, setTodoList ] = useState([]);

  /* 防止子组件因为父组件更新，子组件识别additem是新的而变化重绘 */ 
  const addItem = useCallback((value) => {
    const dataItem = {
      id: new Date().getTime(),
      content: value,
      completed: false
    };

    setTodoList(( todoList )=> [ ...todoList, dataItem ]);

    setInputShow(false)
  },[]);

  return (
    <div className="App">
      <Header openInput={ () => { setInputShow(!isInputShow) } } />
      <AddInput  isInputShow={ isInputShow } addItem={ (value) => { addItem(value) } }  />
    </div>
  );
}

export default App;
