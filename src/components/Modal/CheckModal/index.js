import React from 'react'

import Modal from '../'
import { formatDate } from '../../../libs/utils.js'
import './index.scss'


function CheckModal(props) {

    const { isShowCheckModal, data, closeModal } = props;

    return (
        <Modal isShowModal={ isShowCheckModal } modalTitle={"查看事项"}>
            <p className="topic">时间：{ formatDate(data.id) }</p>
            <p className="topic">内容：{ data.content }</p>
            <p className="topic">状态：{ data.completed ? "已完成" : "未完成" }</p>

            <button className="comfirm-btn btn btn-primary" onClick={ closeModal }>完成</button>
        </Modal>
    );
}

export default CheckModal