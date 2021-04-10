import React from 'react';

import './index.scss';

function Modal(props) {
    /* 这里children为组件下面所有的字节点，应用场景是插槽 */
    
    /* 
    从props中解构出
    isShowModal，是否显示模态框
    modalTitle，模态框标题
    children，插槽内容
    */ 
    const { isShowModal, modalTitle, children } = props

    return (
        <>
        {
            isShowModal
            ?
            (
                <div className="modal">
                    <div className="inner">
                        <div className="m-header">{ modalTitle }</div>
                        <div className="content-wrapper">{ children }</div>
                    </div>
                </div>
            )
            :
            ('')
        }
        </>
    )
}

export default Modal