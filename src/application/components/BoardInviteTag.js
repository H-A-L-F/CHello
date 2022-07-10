import { collection, where } from 'firebase/firestore'
import React from 'react'
import { HiOutlineUserAdd } from 'react-icons/hi'
import { db } from '../../firebase'
import { useSnapCollection } from '../hooks/useSnapCollection'
import Modal from '../views/Modal'
import ModalContent from '../views/ModalContent'
import Tag from '../views/Tag'
import BoardAddMemberForm from './BoardAddMemberForm'

export default function BoardInviteTag({bid}) {
    const defState = useSnapCollection(collection(db, "user"), where("ws_member", "not-in"))

    return (
        <div>
            <div>
                <Modal body={<Tag icon={<HiOutlineUserAdd size={24} />} text={"Add Member"} />} target={"modal-bam"} />
                <ModalContent content={<BoardAddMemberForm bid={bid} />} target={"modal-bam"} />
            </div>
        </div>
    )
}
