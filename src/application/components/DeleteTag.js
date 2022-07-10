import React from 'react'
import Tag from '../views/Tag'
import { HiOutlineTrash } from "react-icons/hi";
import Modal from '../views/Modal';
import ModalContent from '../views/ModalContent';

export default function DeleteTag({form}) {
    return (
        <div>
            <Modal body={<Tag icon={<HiOutlineTrash size={24} />} text={"Delete"} />} target="modal-dws" />
            <ModalContent target="modal-dws" content={form} />
        </div>
    )
}
