import { collection, doc, onSnapshot, query, updateDoc, where } from "firebase/firestore";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { db } from "../../firebase";
import Card from "./Card";
import CardDetail from "./CardDetail";
import CreateCard from "./CreateCard";
import CreateCardForm from "./CreateCardForm";
import Modal from "./Modal";
import ModalContent from "./ModalContent";

const ListCard = ({ l }) => {
    const [card, setCard] = useState([])
    const titleRef = useRef()
    const target = "modal-cc-" + l.id

    // const cardCollectionRef = collection(db, "card")
    // const qCardList = query(cardCollectionRef, where("listID", "==", l.id))
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
        <div className="min-w-[18rem] h-fit flex flex-col border-4 border-primary rounded-md px-4 pt-2 relative pb-16 space-y-4">
            <input type="text" ref={titleRef} onKeyDown={enterPress} className="text-primary text-2xl font-bold input input-ghost w-full max-w-xs truncate" defaultValue={l.name} />
            <div className="my-2"></div>
            {card.map((c) => {
                return <CardModal c={c} key={c.id}/>
            })}
            
            <Modal body={<CreateCardModal />} target={target}/>
            <ModalContent target={target} content={<CreateCardForm l={l} />}/>
        </div>
    );
}

const CardModal = ({ c }) => {
    const target = "modal-ce-" + c.id

    return (
        <div>
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

export default ListCard