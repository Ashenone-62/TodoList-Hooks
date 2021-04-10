import React from 'react';

import './index.scss';

/* 无事项提示组件 */ 
function NoTodoList() {
    
    return (
        <div className="nodatatip-wrapper">
            <span>
                您还没有待办事项
            </span>
        </div>
    )
}

export default NoTodoList