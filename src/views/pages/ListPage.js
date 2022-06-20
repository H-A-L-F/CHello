import { useState } from "react";
import CreateListCard from "../components/CreateListCard";
import ListCard from "../components/ListCard";
import { useParams } from 'react-router-dom';
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import { useEffect } from "react";
import Modal from "../components/Modal";
import ModalContent from "../components/ModalContent";
import CreateList from "../components/CreateList";

const ListPage = () => {
    const [list, setList] = useState([])
    const {id} = useParams()

    const listCollectionRef = collection(db, "list")
    const qListBoard = query(listCollectionRef, where("boardID", "==", id))

    useEffect(() => {
        const unsub = onSnapshot(qListBoard, (data) => {
            setList(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
        })

        return unsub
    }, [])

    return (
        <div className="flex flex-row w-[90%] mx-auto space-x-8">
            {list.map((l) => {
                return <ListCard title={l.name} lid={l.id} key={l.id}/>
            })}
            <Modal body={<CreateListCard />} target="modal-cl"/>
            <ModalContent target="modal-cl" content={<CreateList />}/>
        </div>
    );
}

export default ListPage