import { collection, doc, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import { useParams } from 'react-router-dom'
import { useUserAuth } from '../../AuthContext'
import { db } from '../../firebase'
import { FIRESTORE_FETCH_ERROR, FIRESTORE_FETCH_LOADING } from '../actions/useSnapCollection'
import { moveCard } from '../controllers/cardController'
import { userAllowedBoard } from '../controllers/userBoardController'
import { useSnapCollection } from '../hooks/useSnapCollection'
import CreateListCard from '../views/CreateListCard'
import ErrorHolder from '../views/ErrorHolder'
import LoadingHolder from '../views/LoadingHolder'
import Modal from '../views/Modal'
import ModalContent from '../views/ModalContent'
import BoardAdmin from './BoardAdmin'
import BoardMember from './BoardMember'
import CreateListForm from './CreateListForm'
import DroppableList from './DroppableList'

export default function BoardPage() {
    const { id } = useParams()
    const boardState = useSnapCollection(doc(db, "board", id))
    const listState = useSnapCollection(query(collection(db, "list"), where("board", "==", id)))

    const { user } = useUserAuth()
    const [authorized, setAuthorized] = useState(false)

    useEffect(() => {
        if (user) setAuthorized(userAllowedBoard(user, id))
    }, [user])

    function onDragEnd(result) {
        if (!result.destination) return;
        const { draggableId, source, destination } = result;
        moveCard(draggableId, destination.id)
    }

    if (boardState.status === FIRESTORE_FETCH_LOADING) return <LoadingHolder />
    if (boardState.status === FIRESTORE_FETCH_ERROR) return <ErrorHolder error={boardState.error} />
    return (
        <div className="w-[90%] mx-auto">
            {user ? <Header title={boardState.data.name} id={id} user={user} b={boardState.data} authorized={authorized} /> : <LoadingHolder />}
            <div className='my-2'></div>
            <div className="flex flex-row w-[100%] mx-auto space-x-8 overflow-hidden">
                <DragDropContext onDragEnd={(result) => { onDragEnd(result) }}>
                    {listState?.data.map((l, id) => {
                        return <DroppableList l={l} id={id} key={id} />
                    })}
                </DragDropContext>
                <Modal body={<CreateListCard />} target="modal-cl" />
                <ModalContent target="modal-cl" content={<CreateListForm />} />
            </div>
            <div className="my-4"></div>
            {<BoardAdmin bid={id} user={user} />}
            <div className="my-2"></div>
            {<BoardMember bid={id} user={user} />}
        </div>
    )
}

const Header = ({ title, id, user, b, authorized }) => {
    return (
        <div className="flex flex-row justify-between w-[80%]">
            <h1 className="text-3xl font-bold text-primary">{title}</h1>
            <div className="flex flex-row space-x-2">

            </div>
        </div>
    )
}