import React from 'react';

import './index.scss';

function Header(props) {

    const { openInput } = props;

    return (
        <div className="header">
            <h1>TodoList-React Hooks</h1>
            <span className="icon" onClick={ openInput }>
                &#43;
            </span>
        </div>
    );
}

export default Header;