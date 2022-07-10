import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useParams } from 'react-router-dom';
import { collection, doc, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import { useRef } from "react";
import CardDetail from "./CardDetail";
import CreateCardForm from "./CreateCardForm";
import { useSnapCollection } from '../hooks/useSnapCollection';
import { updateListTitle } from '../controllers/listController';
import { moveCard } from '../controllers/cardController';
import Modal from '../views/Modal';
import ModalContent from '../views/ModalContent';
import Card from '../views/Card';
import CreateCard from '../views/CreateCard';
import CreateListCard from '../views/CreateListCard';
import CreateListForm from './CreateListForm';
import { FIRESTORE_FETCH_ERROR, FIRESTORE_FETCH_LOADING } from '../actions/useSnapCollection';
import LoadingHolder from '../views/LoadingHolder';
import ErrorHolder from '../views/ErrorHolder';

const KanbanPage = () => {
    const { id } = useParams()
    const boardState = useSnapCollection(doc(db, "board", "id"))
    const listState = useSnapCollection(query(collection(db, "list"), where("board", "==", id)))

    function onDragEnd(result) {
        if (!result.destination) return;
        const { draggableId, source, destination } = result;
        moveCard(draggableId, destination.id)
    }

    if (boardState.status === FIRESTORE_FETCH_LOADING) return <LoadingHolder />
    if (boardState.status === FIRESTORE_FETCH_ERROR) return <ErrorHolder error={boardState.error} />
    return (
        <div className="flex flex-row w-[90%] mx-auto space-x-8 overflow-hidden">
            <DragDropContext onDragEnd={(result) => { onDragEnd(result) }}>
                {listState?.data.map((l, id) => {
                    return (
                        <Droppable droppableId={l.id} key={id}>
                            {(provided, snapshot) => {
                                return <ListCard provided={provided} snapshot={snapshot} l={l} key={l.id} />
                            }}
                        </Droppable>
                    )
                })}
            </DragDropContext>
            <Modal body={<CreateListCard />} target="modal-cl" />
            <ModalContent target="modal-cl" content={<CreateListForm />} />
        </div>
    );
}



const ListCard = ({ l, provided, snapshot }) => {
    const cardState = useSnapCollection(query(collection(db, "card"), where("list", "==", l.id)))
    const titleRef = useRef()

    const target = "modal-cl" + l.id

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

    if (cardState.status === FIRESTORE_FETCH_LOADING) return <LoadingHolder />
    if (cardState.status === FIRESTORE_FETCH_ERROR) return <ErrorHolder error={cardState.error} />
    return (
        <div {...provided.droppableProps} ref={provided.innerRef} className="min-w-[18rem] w-[18rem] h-fit flex flex-col border-4 border-primary rounded-md px-4 pt-2 relative pb-16 space-y-4">
            <input type="text" ref={titleRef} onKeyDown={enterPress} className="text-primary text-2xl font-bold input input-ghost w-full max-w-xs truncate" defaultValue={l.name} />
            <div className="my-2"></div>
            {cardState?.data.map((c, index) => {
                return (
                    <Draggable key={c.id} draggableId={c.id} index={index}>
                        {(provided, snapshot) => {
                            return (
                                <CardModal provided={provided} snapshot={snapshot} c={c} key={c.id} />
                            )
                        }}
                    </Draggable>
                )
            })}
            <Modal body={<CreateCardModal />} target={target} />
            <ModalContent target={target} content={<CreateCardForm l={l} />} />
        </div>
    );
}

const CardModal = ({ c, provided, snapshot }) => {
    const target = "modal-ce-" + c.id

    return (
        <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} >
            {provided.placeholder}
            <Modal body={<Card c={c} />} target={target} />
            <ModalContent content={<CardDetail c={c} />} target={target} />
        </div>
    );
}

const CreateCardModal = () => {
    return (
        <div className="absolute bottom-2 right-4">
            <CreateCard />
        </div>
    );
}

export default KanbanPage