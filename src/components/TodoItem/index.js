import React from 'react';

import './index.scss'

function TodoItem(props) {

    /*
    从props中解构
    data对象
    */ 
    const { data } = props; 
    
    return (
        <li className="todo-item">
            {/* checkbox绑定data.completed */}
            <div className="check-box">
                <input type="checkbox" checked={ data.completed }  />
            </div>
            {/* 根据data.completed设置content的样式 */}
            <span className="content" style={ { 'textDecoration': data.completed ? 'line-through' : 'none' } } >{ data.content }</span>
            {/* 查看，编辑，删除按钮 */}
            <div className="btn-group">
                <button className="btn btn-primary">查看</button>
                <button className="btn btn-warning">编辑</button>
                <button className="btn btn-danger">删除</button>
            </div>
        </li>
    );
}

export default TodoItem