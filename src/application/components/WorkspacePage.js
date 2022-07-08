import { collection, doc, query, where } from 'firebase/firestore'
import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { db } from '../../firebase'
import { FIRESTORE_FETCH_ERROR, FIRESTORE_FETCH_LOADING, FIRESTORE_FETCH_SUCCESS } from '../actions/useSnapCollection'
import { useSnapCollection } from '../hooks/useSnapCollection'
import Board from '../views/Board'
import CreateBoardCard from '../views/CreateBoardCard'
import ErrorHolder from '../views/ErrorHolder'
import LoadingHolder from '../views/LoadingHolder'
import Modal from '../views/Modal'
import ModalContent from '../views/ModalContent'
import CreateBoardForm from './CreateBoardForm'
import WorkspaceAdmin from './WorkspaceAdmin'
import WorkspaceMember from './WorkspaceMember'

export default function WorkspacePage() {
    const { id } = useParams()
    const workspaceState = useSnapCollection(doc(db, "workspace", id))
    const boardState = useSnapCollection(query(collection(db, "board"), where("workspace", "==", id)))

    if (workspaceState.status === FIRESTORE_FETCH_LOADING) return <LoadingHolder />
    if (workspaceState.status === FIRESTORE_FETCH_ERROR) return <ErrorHolder error={workspaceState.error} />
    return (
        <div className="w-[90%] mx-auto">
            <Header title={workspaceState.data.name} />
            <div className="my-2"></div>
            <div className="flex flex-wrap">
                {boardState.status === FIRESTORE_FETCH_SUCCESS && boardState.data.map((b) => {
                    const link = "/main/board/" + b.id

                    return (
                        <Link to={link} key={b.id}>
                            <Board title={b.name} />
                        </Link>
                    );
                })}

                <Modal body={<CreateBoardCard />} target="modal-cb" />
                <ModalContent target="modal-cb" content={<CreateBoardForm ws={workspaceState.data} />} />
            </div>
            <div className="my-4"></div>
            {<WorkspaceAdmin wsid={id}/>}
            <div className="my-2"></div>
            {<WorkspaceMember wsid={id}/>}
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
    )
}