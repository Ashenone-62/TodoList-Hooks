import React, { useRef } from 'react';

import Modal from '../';
import { formatDate } from '../../../libs/utils.js';

import './index.scss'


function EditModal(props) {
    /*
    从props解构出
    isShowEditModal,是否开启模态框 
    data对象,当前事项数据 
    sumbitEdit函数，提交数据
    */ 
    const { isShowEditModal, data, sumbitEdit } = props;

    /*
    定义inputRef获取textarea中的内容
    checkRef获取checkbox的状态
    */ 
    const inputRef = useRef(),
          checkRef = useRef();

    /* 组装提交数据 */ 
    const formatNewData = () => {
        /* 
        获取输入的内容和check状态
        判断是不是为空
        组装对象
        提交数据
        */ 
        const val = inputRef.current.value.trim(),
              chec = checkRef.current.checked;

        if(val.length === 0){
            inputRef.current.value = data.content;
            return
        }

        const newData = {
            id: new Date().getTime(),
            content: val,
            completed: chec
        }

        sumbitEdit(newData, data.id)
    }

    return (
        <Modal isShowModal={ isShowEditModal } modalTitle={ "编辑事项" }>
            <p className="topic">时间：{ formatDate(data.id) }</p>
            <p className="topic">
                <textarea 
                    ref={ inputRef } 
                    defaultValue={ data.content } 
                    className="text-area" 
                />
            </p>
            <p className="topic">
                状态：
                <input 
                    type="checkbox" 
                    ref={ checkRef } 
                    defaultChecked={ data.completed ? true : false } 
                />
            </p>

            <button className="btn btn-primary comfirm-btn" onClick={ formatNewData }>提交</button>
        </Modal>
    )
}

export default EditModal