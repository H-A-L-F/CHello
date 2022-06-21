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

const Section = ({ ws }) => {
    const [board, setBoard] = useState([])

    const boardCollectionRef = collection(db, "workspace/" + ws.id + "/board")
    // const boardCollectionRef = collection(db, "board")
    // const qBoardWorkspace = query(boardCollectionRef, where("workspaceID", "==", ws.id))
    const target = "modal-cb" + ws.id

    useEffect(() => {
        const unsub = onSnapshot(boardCollectionRef, (data) => {
            setBoard(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
        })

        return unsub
    }, [])

    return (
        <div className="flex flex-col">
            <Header ws={ws} />
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
                <ModalContent target={target} content={<CreateBoardForm ws={ws}/>}/>
            </div>
        </div>
    );
}

export default Section;