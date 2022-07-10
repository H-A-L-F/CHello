import React from 'react'
import Modal from '../views/Modal'
import ModalContent from '../views/ModalContent'
import Tag from '../views/Tag'
import { HiOutlineUserRemove } from "react-icons/hi";

export default function LeaveTag({ form }) {
    return (
        <div>
            <Modal body={<Tag icon={<HiOutlineUserRemove size={24} />} text={"Leave"} />} target="modal-lws" />
            <ModalContent target="modal-lws" content={form} />
        </div>
    )
}
