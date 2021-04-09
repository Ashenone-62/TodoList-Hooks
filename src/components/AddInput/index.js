import React, { useRef } from 'react';

import './index.scss';

function AddInput(props) {
    
    /*
    从props中解构
    isInputShow变量，
    addItem方法

    定义Ref钩子
    */ 
    const { isInputShow, addItem } = props,
          inputRef = useRef();

    /*
    定义submitValue函数，
    通过inputRef.current.value获取input输入框的内容
    判断一下输入框有无内容，
    没有——直接return掉，
    有——执行addItem，清空输入框
    */ 
    const submitValue = () => {
        const inputValue = inputRef.current.value.trim();

        if(inputValue.length === 0) {
            return
        }else {
            addItem(inputValue)
            inputRef.current.value = "";
        }
    }
    
    return (
        <>
            {
                /* 
                如果isInputShow为
                true 渲染一个视图
                false 渲染一个空字符串
                */ 
                isInputShow
                ?
                (
                    <div className="input-wrapper">
                        {/* 标记ref */}
                        <input type="text" placeholder="请输入待办事件" ref={ inputRef }  />
                        {/* 点击执行submitValue */}
                        <button className="btn btn-primary" onClick={ submitValue }>添加</button>
                    </div>
                )
                :
                (
                    ""
                )
            }
        </>
    );
}

export default AddInput;