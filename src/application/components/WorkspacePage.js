import { collection, doc } from 'firebase/firestore'
import React from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../../firebase'
import { FIRESTORE_FETCH_ERROR, FIRESTORE_FETCH_LOADING } from '../actions/useSnapCollection'
import { useSnapCollection } from '../hooks/useSnapCollection'
import CreateBoardCard from '../views/CreateBoardCard'
import ErrorHolder from '../views/ErrorHolder'
import LoadingHolder from '../views/LoadingHolder'
import Modal from '../views/Modal'
import ModalContent from '../views/ModalContent'
import CreateBoardForm from './CreateBoardForm'

export default function WorkspacePage() {
    const { id } = useParams()
    const workspaceState = useSnapCollection(doc(db, "workspace", id))

    if (workspaceState.status === FIRESTORE_FETCH_LOADING) return <LoadingHolder />
    if (workspaceState.status === FIRESTORE_FETCH_ERROR) return <ErrorHolder error={workspaceState.error} />
    return (
        <div className="w-[90%] mx-auto">
            <Header title={workspaceState.data.name} />
            <div className="my-2"></div>
            <div className="flex flex-wrap">
                <Modal body={<CreateBoardCard />} target="modal-cb" />
                <ModalContent target="modal-cb" content={<CreateBoardForm ws={workspaceState.data} />} />
            </div>
        </div>
    )
}

const Header = ({ title }) => {
    return (
        <div className="flex flex-row justify-between w-[80%]">
            <h1 className="text-3xl font-bold text-primary">{title}</h1>
            <div className="flex flex-row space-x-2">

            </div>
        </div>
    );
}