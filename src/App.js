import React, { useState, useCallback, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import AddInput from './components/AddInput';
import TodoItem from './components/TodoItem';
import CheckModal from './components/Modal/CheckModal'
import EditModal from './components/Modal/EditModal'
import NoTodoList from './components/NoTodoList'

function App() {

  /* 
  开关AddInput的变量
  定义isInputShow，修改函数setInputShow，初始值false 
  */ 
  const [ isInputShow, setInputShow ] = useState(false);

  /* 
  存储待办事项的数组
  定义todoList，修改函数setTodoList，初始值[] 
  */
  const [ todoList, setTodoList ] = useState([]);

  const [ isShowCheckModal, setShowCheckModal ] = useState(false);

  const [ isShowEditModal, setShowEditModal] = useState(false);

  const [ currentData, setCurrentData ] = useState({});

  /*
  ⚠⚠⚠
  注意执行顺序，如果下面的Effect先执行，
  那么第一次[]给todoList的时候也算是变化，
  随之而来的空数组就会清空localStorage中的数据
  ⚠⚠⚠
  */ 
  useEffect(() => {

    /* 
    获取localStorage的todoData，如果没有就初始化为空字符串数组
    获取后设置给todoList

    外部依赖: 无
    */ 
    const todoData = JSON.parse(localStorage.getItem('todoData') || '[]')
    setTodoList(todoData)
  }, []);

  useEffect(() => {

    /*
    当todoList发生改变（增添，删除，修改）的时候，将改变后的todoList保存到本地

    外部依赖: todoList
    */ 
    localStorage.setItem('todoData', JSON.stringify(todoList))
  }, [ todoList ]);

  /*
  ⚠⚠⚠
  这里addItem需要传给子组件，
  如果不用useCallback包裹，如果父组件重绘，
  子组件识别addItem也是认为是新的，从而引发不必要的重绘
  ⚠⚠⚠
  */ 
  const addItem = useCallback((value) => {

    /*
    接收一个参数value（input输入框的值）
    创建一个事项对象
    通过setTodoList解构原始数组，然后把新增的放入
    关闭AddInput
    */ 
    const dataItem = {
      id: new Date().getTime(),
      content: value,
      completed: false
    };

    setTodoList(( todoList )=> [ ...todoList, dataItem ]);

    setInputShow(false)
  }, []);

  const completeItem = useCallback((id) => {
    setTodoList((todoList) => {
      
      return todoList.map((item) => {
        if(item.id === id){
          item.completed = !item.completed
        }

        return item
      })
    })
  }, [])

  const removeItem = useCallback((id) => {
    setTodoList((todoList) => {
      
      return todoList.filter((item) => {
        return item.id !== id
      })
    })
  }, [])

  const openCheckModal = useCallback((id) => {
    setCurrentData(() => {
      return todoList.filter(item => item.id === id)[0]
    })

    setShowCheckModal(true)
  }, [todoList])

  const openEditModal = useCallback((id) => {
    setCurrentData(() => {
      return todoList.filter(item => item.id === id)[0]
    })

    setShowEditModal(true)
  }, [todoList])

  const sumbitEdit = useCallback((newData, id) => {
    setTodoList((todoList) => {
      
      return todoList.map((item) => {
        if(item.id === id){
          item = newData
        }

        return item
      })
    })

    setShowEditModal(false)
  }, [])

  return (
    <div className="App">

      <CheckModal isShowCheckModal={ isShowCheckModal } closeModal={ ()=>{ setShowCheckModal(false) } } data={ currentData } />

      <EditModal isShowEditModal={ isShowEditModal } data={ currentData } sumbitEdit={ sumbitEdit } />

      {/* 
      传入openInput函数，通过修改isInputShow开关AddInput
      */}
      <Header openInput={ () => { setInputShow(!isInputShow) } } />

      {/* 
      传入isInputShow，AddInput组件根据此判断是否渲染
      传入addItem函数，添加待办事项
      */}
      <AddInput  isInputShow={ isInputShow } addItem={ (value) => { addItem(value) } }  />

      {  
        !todoList || todoList.length === 0
        ?
        (<NoTodoList />)
        :
        (<ul className="todo-list">
          {
            /*
            通过map循环渲染TodoItem
            TodoItem传入todoList中的数据
            */ 
            todoList.map((item,index) => {
  
              return (
                <TodoItem data={ item } key={ index } openCheckModal={ openCheckModal } openEditModal={ openEditModal } completeItem={ completeItem } removeItem={ removeItem } />
              );
            })
          }
        </ul>)
      }
    </div>
  );
}

export default App;
