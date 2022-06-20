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
import { Link } from 'react-router-dom';

const Section = ({ title, wsid }) => {
    const [board, setBoard] = useState([])

    const boardCollectionRef = collection(db, "board")
    const qBoardWorkspace = query(boardCollectionRef, where("workspaceID", "==", wsid))
    const target = "modal-cb" + wsid

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
            <div className="flex flex-wrap justify-start content-start">
                {board.map((b) => {
                    const link = "/main/board/" + b.id

                    // return <Board title={b.name} key={b.id}/>
                    return (
                        <Link to={link} key={b.id}>
                            <Board title={b.name}/>
                        </Link>
                    );
                })}
                <Modal body={<CreateBoardCard />} target={target} />
                <ModalContent target={target} content={<CreateBoardForm wsid={wsid}/>}/>
            </div>
        </div>
    );
}

export default Section;