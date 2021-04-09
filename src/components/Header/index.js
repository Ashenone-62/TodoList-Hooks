import React from 'react';

import './index.scss';

function Header(props) {

    /*
    从props中解构
    openInput方法
    */
    const { openInput } = props;

    return (
        <div className="header">
            <h1>TodoList-React Hooks</h1>
            
            {/* 点击执行openInput，开关AddInput */}
            <span className="icon" onClick={ openInput }>
                &#43;
            </span>
        </div>
    );
}

export default Header;