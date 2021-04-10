import React, { useRef } from 'react'

import Modal from '../'
import { formatDate } from '../../../libs/utils.js'
import './index.scss'


function EditModal(props) {
    const { isShowEditModal, data, sumbitEdit } = props;

    const inputRef = useRef(),
          checkRef = useRef();

    const formatNewData = () => {
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
                <textarea ref={ inputRef } defaultValue={ data.content } className="text-area" ></textarea>
            </p>
            <p className="topic">
                状态：
                <input type="checkbox" ref={ checkRef } defaultChecked={ data.completed ? true : false } />
            </p>

            <button className="btn btn-primary comfirm-btn" onClick={ formatNewData }>提交</button>
        </Modal>
    )
}

export default EditModal