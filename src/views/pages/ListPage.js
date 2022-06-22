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
    const {path} = useParams()

    const boardPath = window.atob(path)
    const listCollectionRef = collection(db, boardPath + "/list")

    useEffect(() => {
        const unsub = onSnapshot(listCollectionRef, (data) => {
            setList(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
        })

        return unsub
    }, [])

    return (
        <div className="flex flex-row w-full bg-red-300 mx-auto space-x-8 max-w-none overflow-scroll">
            {list.map((l) => {
                return <ListCard l={l} key={l.id}/>
            })}
            <Modal body={<CreateListCard />} target="modal-cl"/>
            <ModalContent target="modal-cl" content={<CreateList />}/>
        </div>
    );
}

export default ListPage