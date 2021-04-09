import React from 'react';

import './index.scss';

function AddInput(props) {

    const { isInputShow } = props;
    
    return (
        <>
            {
                isInputShow
                ?
                (
                    <div className="input-wrapper">
                        <input type="text" placeholder="请输入待办事件" />
                        <button className="btn btn-primary">添加</button>
                    </div>
                )
                :
                ""
            }
        </>
    );
}

export default AddInput;