import React from 'react';

import './index.scss';

function TodoItem(props) {

    /*
    从props中解构
    data对象
    openCheckModal方法，打开查看模态框
    openEditModal方法，打开编辑模态框
    completeItem方法，完成事项
    removeItem 方法，删除事项
    */ 
    const { data, openCheckModal, openEditModal, completeItem, removeItem } = props; 
    
    return (
        <li className="todo-item">

            <div className="check-box">
                <input type="checkbox" 
                    checked={ data.completed } 
                    onChange={ ()=>{ completeItem(data.id) } }  
                />
            </div>

            <span 
                className="content" 
                style={ { 'textDecoration': data.completed ? 'line-through' : 'none' } } 
            >
                { data.content }
            </span>

            <div className="btn-group">
                <button className="btn btn-primary" onClick={ ()=>{ openCheckModal(data.id) } }>查看</button>
                <button className="btn btn-warning" onClick={ ()=>{ openEditModal(data.id) } }>编辑</button>
                <button className="btn btn-danger" onClick={ ()=>{ removeItem(data.id) } } >删除</button>
            </div>
        </li>
    );
}

export default TodoItem