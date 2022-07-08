import { collection, doc, onSnapshot, query, updateDoc, where } from "firebase/firestore";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { db } from "../../firebase";
import CreateCard from "../views/CreateCard";
import Modal from "../views/Modal";
import ModalContent from "../views/ModalContent";
import CreateCardForm from "./CreateCardForm";
import DraggableCard from "./DraggableCard";

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
        <div {...provided.droppableProps} ref={provided.innerRef} className="min-w-[18rem] w-[18rem] h-fit flex flex-col border-4 border-primary rounded-md px-4 pt-2 relative pb-16 space-y-4">
            <input type="text" ref={titleRef} onKeyDown={enterPress} className="text-primary text-2xl font-bold input input-ghost w-full max-w-xs truncate" defaultValue={l.name} />
            <div className="my-2"></div>
            {card.map((c, index) => {
                return <DraggableCard c={c} index={index}/>
            })}
            <Modal body={<CreateCardModal />} target={target}/>
            <ModalContent target={target} content={<CreateCardForm l={l} />}/>
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

export default ListCard