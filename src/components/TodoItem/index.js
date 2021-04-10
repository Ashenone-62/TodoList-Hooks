import React from 'react';

import './index.scss'

function TodoItem(props) {

    /*
    从props中解构
    data对象
    */ 
    const { data, openCheckModal, openEditModal, completeItem, removeItem } = props; 
    
    return (
        <li className="todo-item">
            {/* checkbox绑定data.completed */}
            <div className="check-box">
                <input type="checkbox" checked={ data.completed } onChange={ ()=>{ completeItem(data.id) } }  />
            </div>
            {/* 根据data.completed设置content的样式 */}
            <span className="content" style={ { 'textDecoration': data.completed ? 'line-through' : 'none' } } >{ data.content }</span>
            {/* 查看，编辑，删除按钮 */}
            <div className="btn-group">
                <button className="btn btn-primary" onClick={ ()=>{ openCheckModal(data.id) } }>查看</button>
                <button className="btn btn-warning" onClick={ ()=>{ openEditModal(data.id) } }>编辑</button>
                <button className="btn btn-danger" onClick={ ()=>{ removeItem(data.id) } } >删除</button>
            </div>
        </li>
    );
}

export default TodoItem