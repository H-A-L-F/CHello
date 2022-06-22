import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useState } from "react";
import CreateListCard from "../components/CreateListCard";
import { useParams } from 'react-router-dom';
import { addDoc, collection, deleteDoc, doc, getDoc, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useEffect } from "react";
import Modal from "../components/Modal";
import ModalContent from "../components/ModalContent";
import CreateList from "../components/CreateList";

import { useRef } from "react";
import Card from "./Card";
import CardDetail from "./CardDetail";
import CreateCard from "./CreateCard";
import CreateCardForm from "./CreateCardForm";

const KanbanPage = () => {
    const [list, setList] = useState([])
    const [refresh, setRefresh] = useState(true);
    const {path} = useParams()

    const boardPath = window.atob(path)
    const listPath = boardPath + "/list/"
    const listCollectionRef = collection(db, listPath)

    useEffect(() => {
        const unsub = onSnapshot(listCollectionRef, (data) => {
            setList(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
        })

        return unsub
    }, [])

    function refreshPage() {
        if (refresh) {
          setRefresh(false);
        } else {
          setRefresh(true);
        }
      }

    function updateCardWithPath(cardPath, changes) {
        const ref = doc(db, cardPath)
        return updateDoc(ref, changes)
    }

    function moveCardToAnotherList(card, source, target, cardId) {
        const cardPathTarget = listPath + target + "/card/" + cardId;
        const cardRefTarget = doc(db, cardPathTarget)
        const data = {
            name: card.name,
            status: card.status,
            path: card.path
        }
        setDoc(cardRefTarget, data)
        const cardPathSource = listPath + source + "/card/" + cardId;
        const cardRefSource = doc(db, cardPathSource)
        deleteDoc(cardRefSource)
    }

    const getCardById = async (listIdSource, listIdTarget, cardId) => {
        const cardPath = listPath + listIdSource + "/card/" + cardId;
        const cardRef = doc(db, cardPath)
        const temp = await getDoc(cardRef)
        return {card: temp.data(), target: listIdTarget, source: listIdSource, id: cardId}
    }

    function onDragEnd(result) {
        if (!result.destination) return;

        const { draggableId, source, destination } = result;
        
        const cardPath = listPath + destination.droppableId + "/card/" + draggableId;

        getCardById(source.droppableId, destination.droppableId, draggableId)
            .then(({card, target, source, id}) => {
                moveCardToAnotherList(card, source, target, id)
            })  

        const changes = {
          listId: destination.droppableId,
        };
    
        updateCardWithPath(cardPath, changes)
          .then(() => {
            refreshPage();
          })
          .catch((error) => {
            console.log("error moving card :", error);
          });
      }

    return (
        <div className="flex flex-row w-[90%] mx-auto space-x-8 overflow-hidden">
            <DragDropContext onDragEnd={(result) => {onDragEnd(result, list, setList)}}>
                {list.map((l, id) => {
                    return (
                        <Droppable droppableId={l.id} key={id}>
                            {(provided, snapshot) => {
                                return <ListCard provided={provided} snapshot={snapshot}  l={l} key={l.id}/>
                            }}
                        </Droppable>
                    )
                })}
            </DragDropContext>
            <Modal body={<CreateListCard />} target="modal-cl"/>
            <ModalContent target="modal-cl" content={<CreateList />}/>
        </div>
    );
}



const ListCard = ({ l, provided, snapshot }) => {
    const [card, setCard] = useState([])
    const titleRef = useRef()
    const target = "modal-cc-" + l.id

    const cardCollectionRef = collection(db, l.path + "/card")

    useEffect(() => {
        const unsub = onSnapshot(cardCollectionRef, (data) => {
            setCard(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
        })

        return unsub
    }, [])

    const updateList = async () => {
        const listDoc = doc(db, "list", l.id)
        const newField = { name: titleRef.current.value }
        await updateDoc(listDoc, newField)
    }

    const enterPress = (e) => {
        if (e.keyCode === 13) {
            updateList()
            titleRef.current.blur()
        }
    }

    return (
        <div {...provided.droppableProps} ref={provided.innerRef} className="min-w-[18rem] h-fit flex flex-col border-4 border-primary rounded-md px-4 pt-2 relative pb-16 space-y-4">
            <input type="text" ref={titleRef} onKeyDown={enterPress} className="text-primary text-2xl font-bold input input-ghost w-full max-w-xs truncate" defaultValue={l.name} />
            <div className="my-2"></div>
            {card.map((c, index) => {
                return (
                    <Draggable key={c.id} draggableId={c.id} index={index}>
                        {(provided, snapshot) => {
                            return (
                                <CardModal provided={provided} snapshot={snapshot} c={c} key={c.id}/>
                            )
                        }}
                    </Draggable>
                )
            })}
            <Modal body={<CreateCardModal />} target={target}/>
            <ModalContent target={target} content={<CreateCardForm l={l} />}/>
        </div>
    );
}

const CardModal = ({ c, provided, snapshot }) => {
    const target = "modal-ce-" + c.id

    return (
        <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} >
            {provided.placeholder}
            <Modal body={<Card c={c}/>} target={target}/>
            <ModalContent content={<CardDetail c={c}/>} target={target}/>
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