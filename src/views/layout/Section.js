import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect } from "react";
import { useState } from "react";
import { db } from "../../firebase";
import Board from "../components/Board";
import CreateBoardCard from "../components/CreateBoard";
import CreateBoardForm from "../components/CreateBoardForm";
import Header from "../components/Header";
import Modal from "../components/Modal";
import ModalContent from "../components/ModalContent";

const Section = ({ title, wsid }) => {
    const [board, setBoard] = useState([])

    const boardCollectionRef = collection(db, "board")
    const qBoardWorkspace = query(boardCollectionRef, where("workspaceID", "==", wsid))

    useEffect(() => {
        const unsub = onSnapshot(qBoardWorkspace, (data) => {
            setBoard(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
        })

        return unsub
    }, [])

    return (
        <div className="flex flex-col">
            <Header title = {title} />
            <div className="my-2"></div>
            <div className="flex flex-wrap space-x-4">
                {board.map((b) => {
                    return <Board title={b.name} key={b.id}/>
                })}
                <Modal body={<CreateBoardCard />} target="modal-cb" />
                <ModalContent target="modal-cb" content={<CreateBoardForm wsid={wsid}/>}/>
            </div>
        </div>
    );
}

export default Section;