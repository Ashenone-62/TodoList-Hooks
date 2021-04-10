import React from 'react'

import './index.scss'

function Modal(props) {
    /* children大坑 */ 
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