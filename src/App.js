import React, { useState, useCallback, useEffect } from 'react';

import Header from './components/Header';
import AddInput from './components/AddInput';
import TodoItem from './components/TodoItem';
import CheckModal from './components/Modal/CheckModal';
import EditModal from './components/Modal/EditModal';
import NoTodoList from './components/NoTodoList';

import './App.css';

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

  /*
  开关CheckModal
  定义isShowCheckModal，setShowCheckModal，初始值false
  */ 
  const [ isShowCheckModal, setShowCheckModal ] = useState(false);

  /*
  开关EditModal
  定义isShowEditModal，setShowEditModal，初始值false
  */ 
  const [ isShowEditModal, setShowEditModal] = useState(false);

  /*
  保存当前选择的事项
  定义currentData，setCurrentData，初始值{}
  */ 
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
    localStorage.setItem('todoData', JSON.stringify(todoList));
  }, [ todoList ]);

  /*
  ⚠⚠⚠
  这里addItem需要传给子组件，
  如果不用useCallback包裹，如果父组件重绘，
  子组件识别addItem也是认为是新的，从而引发不必要的重绘
  ⚠⚠⚠
  */ 

  /* 添加事项 */ 
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
    setTodoList(( todoList ) => [ ...todoList, dataItem ]);
    setInputShow(false);
  }, []);

  /* 完成事项 */
  const completeItem = useCallback((id) => {
    
    /*
    接收参数id
    修改传入id的事项的checkbox的状态
    通过map去比对每一项的id，找到后将其completed取反
    */ 
    setTodoList((todoList) => {
      
      return todoList.map((item) => {
        if(item.id === id){
          item.completed = !item.completed;
        }
        return item;
      })
    })
  }, [])

  /* 删除事项 */
  const removeItem = useCallback((id) => {

    /*
    接收参数id
    删除传入id的事项
    通过filter过滤掉传入id的事项
    */ 
    setTodoList((todoList) => {
      
      return todoList.filter((item) => {
        return item.id !== id;
      })
    })
  }, [])

  /* 打开查看模态框 */ 
  const openCheckModal = useCallback((id) => {
    
    /* 
    接收参数id
    将当前点击的事项拿到传给currentData
    显示模态框
    */ 
    setCurrentData(() => {
      return todoList.filter(item => item.id === id)[0];
    })
    setShowCheckModal(true);
  }, [todoList])

  /* 打开编辑模态框 */ 
  const openEditModal = useCallback((id) => {
    
    /* 操作同上 */ 
    setCurrentData(() => {
      return todoList.filter(item => item.id === id)[0]
    });
    setShowEditModal(true);
  }, [todoList])

  /* 提交数据 */ 
  const sumbitEdit = useCallback((newData, id) => {
    
    /* 
    接收参数新数据和老id
    通过老id找到要修改的数据，然后把newData替换老数据
    关闭编辑模态框
    */ 
    setTodoList((todoList) => {
      
      return todoList.map((item) => {
        if(item.id === id){
          item = newData;
        }

        return item;
      })
    })
    setShowEditModal(false);
  }, [])

  return (
    <div className="App">

      <CheckModal 
        isShowCheckModal={ isShowCheckModal } 
        closeModal={ ()=>{ setShowCheckModal(false) } } 
        data={ currentData } 
      />

      <EditModal 
        isShowEditModal={ isShowEditModal } 
        data={ currentData } 
        sumbitEdit={ sumbitEdit } 
      />

      
      <Header openInput={ () => { setInputShow(!isInputShow) } } />

      <AddInput  
        isInputShow={ isInputShow } 
        addItem={ (value) => { addItem(value) } }  
      />

      {  
        !todoList || todoList.length === 0
        ?
        (<NoTodoList />)
        :
        (<ul className="todo-list">
          { 
            todoList.map((item,index) => {
  
              return (
                <TodoItem 
                  data={ item } 
                  key={ index } 
                  openCheckModal={ openCheckModal } 
                  openEditModal={ openEditModal } 
                  completeItem={ completeItem } 
                  removeItem={ removeItem } 
                />
              );
            })
          }
        </ul>)
      }
    </div>
  );
}

export default App;
