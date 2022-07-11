import { collection, doc, onSnapshot, query, updateDoc, where } from "firebase/firestore";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { db } from "../../firebase";
import { FIRESTORE_FETCH_ERROR, FIRESTORE_FETCH_LOADING } from "../actions/useSnapCollection";
import { updateListTitle } from "../controllers/listController";
import { useSnapCollection } from "../hooks/useSnapCollection";
import CreateCard from "../views/CreateCard";
import ErrorHolder from "../views/ErrorHolder";
import LoadingHolder from "../views/LoadingHolder";
import Modal from "../views/Modal";
import ModalContent from "../views/ModalContent";
import CreateCardForm from "./CreateCardForm";
import DraggableCard from "./DraggableCard";

const ListCard = ({ l, provided, snapshot, auth, board, user }) => {
    const cardState = useSnapCollection(query(collection(db, "card"), where("list", "==", l.id)))
    const titleRef = useRef()

    const updateList = async () => {
        const name = titleRef.current.value
        await updateListTitle(l.id, name)
    }

    const enterPress = (e) => {
        if (e.keyCode === 13) {
            updateList()
            titleRef.current.blur()
        }
    }

    // if (cardState.status === FIRESTORE_FETCH_LOADING) return <LoadingHolder />
    // if (cardState.status === FIRESTORE_FETCH_ERROR) return <ErrorHolder error={cardState.error} />
    if (cardState.status === FIRESTORE_FETCH_LOADING) return <div {...provided.droppableProps} ref={provided.innerRef}></div>
    if (cardState.status === FIRESTORE_FETCH_ERROR) return <div {...provided.droppableProps} ref={provided.innerRef}></div>
    return (
        <div {...provided.droppableProps} ref={provided.innerRef} className="min-w-[18rem] w-[18rem] h-fit flex flex-col border-4 border-primary rounded-md px-4 pt-2 relative pb-16 space-y-4">
            <input type="text" ref={titleRef} onKeyDown={enterPress} className="text-primary text-2xl font-bold input input-ghost w-full max-w-xs truncate" defaultValue={l.name} />
            <div className="my-2"></div>
            {cardState?.data.map((c, index) => {
                return <DraggableCard c={c} index={index} key={index} board={board} user={user}/>
            })}
            {auth && <AuthBody l={l} />}
            {provided.placeholder}
        </div>
    );
}

const AuthBody = ({ l }) => {
    const target = "modal-cl" + l.id

    return (
        <div>
            <Modal body={<CreateCardModal />} target={target} />
            <ModalContent target={target} content={<CreateCardForm l={l} />} />
        </div>
    )
}

const CreateCardModal = () => {
    return (
        <div className="absolute bottom-2 right-4">
            <CreateCard />
        </div>
    );
}

export default ListCard