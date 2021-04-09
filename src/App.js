import React, { useState, useCallback, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import AddInput from './components/AddInput';
import TodoItem from './components/TodoItem';

function App() {

  const [ isInputShow, setInputShow ] = useState(false);
  const [ todoList, setTodoList ] = useState([]);

  /* 注意顺序 */ 
  useEffect(() => {
    const todoData = JSON.parse(localStorage.getItem('todoData') || '[]')
    setTodoList(todoData)
  }, []);

  useEffect(() => {
    localStorage.setItem('todoData', JSON.stringify(todoList))
  }, [ todoList ]);

  /* 防止子组件因为父组件更新，子组件识别additem是新的而变化重绘 */ 
  const addItem = useCallback((value) => {
    const dataItem = {
      id: new Date().getTime(),
      content: value,
      completed: false
    };

    setTodoList(( todoList )=> [ ...todoList, dataItem ]);

    setInputShow(false)
  }, []);

  return (
    <div className="App">
      <Header openInput={ () => { setInputShow(!isInputShow) } } />
      <AddInput  isInputShow={ isInputShow } addItem={ (value) => { addItem(value) } }  />
      <ul className="todo-list">
        {
          todoList.map((item,index) => {

            return (
              <TodoItem data={ item } key={ index } />
            );
          })
        }
      </ul>
    </div>
  );
}

export default App;
