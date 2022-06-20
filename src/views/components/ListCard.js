import { collection, doc, onSnapshot, query, updateDoc, where } from "firebase/firestore";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { db } from "../../firebase";
import Card from "./Card";
import CreateCard from "./CreateCard";
import CreateCardForm from "./CreateCardForm";
import Modal from "./Modal";
import ModalContent from "./ModalContent";

const ListCard = ({ title, lid }) => {
    const [card, setCard] = useState([])
    const titleRef = useRef()
    const target = "modal-cc-" + lid

    const cardCollectionRef = collection(db, "card")
    const qCardList = query(cardCollectionRef, where("listID", "==", lid))

    useEffect(() => {
        const unsub = onSnapshot(qCardList, (data) => {
            setCard(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
        })

        return unsub
    }, [])

    const updateList = async () => {
        const listDoc = doc(db, "list", lid)
        const newField = { name: titleRef.current.value }
        await updateDoc(listDoc, newField)
    }

    const enterPress = (e) => {
        if (e.keyCode === 13) {
            updateList(lid)
            titleRef.current.blur()
        }
    }

    return (
        <div className="w-72 h-fit flex flex-col border-4 border-primary rounded-md px-4 pt-2 relative pb-16 space-y-4">
            {/* <h2 className="text-primary text-2xl font-bold"> {title} </h2> */}
            <input type="text" ref={titleRef} onKeyDown={enterPress} className="text-primary text-2xl font-bold input input-ghost w-full max-w-xs truncate" defaultValue={title} />
            <div className="my-2"></div>
            {card.map((c) => {
                return <Card title={c.name} status={c.status} key={c.id}/>
            })}
            
            <Modal body={<CreateCardModal />} target={target}/>
            <ModalContent target={target} content={<CreateCardForm lid={lid} />}/>
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