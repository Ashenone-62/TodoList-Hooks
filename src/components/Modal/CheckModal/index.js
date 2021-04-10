import React from 'react';

import Modal from '../';
import { formatDate } from '../../../libs/utils.js';

import './index.scss';


function CheckModal(props) {

    /* 
    从props中解构出
    isShowCheckModal变量，是否显示模态框
    data对象，事项data
    closeModal方法，关闭模态框
    */ 
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