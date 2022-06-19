import { collection, doc, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import Header from "../components/Header";
import { Link, useParams } from 'react-router-dom';
import Board from "../components/Board";
import Modal from "../components/Modal";
import ModalContent from "../components/ModalContent";
import CreateBoardCard from "../components/CreateBoard";
import CreateBoardForm from "../components/CreateBoardForm";

const BoardPage = ({}) => {
    const [board, setBoard] = useState([])
    const [workspace, setWorkspace] = useState([])
    const {id} = useParams();

    const boardCollectionRef = collection(db, "board")
    const workspaceDocumentRef = doc(db, "workspace", id)
    const qBoardWorkspace = query(boardCollectionRef, where("workspaceID", "==", id))

    useEffect(() => {
        const unsub = onSnapshot(qBoardWorkspace, (data) => {
            setBoard(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
        })

        return unsub
    }, [])

    useEffect(() => {
        const unsub = onSnapshot(workspaceDocumentRef, (data) => {
            setWorkspace(data.data())
        })

        return unsub
    }, [])

    return (
        <div className="w-[90%] mx-auto">
            <Header title={workspace.name} />
            <div className="my-2"></div>
            <div className="flex flex-wrap">
                {board.map((b) => {
                    const link = "/main/board/" + b.id

                    return (
                        <Link to={link} key={b.id}>
                            <Board title={b.name}/>
                        </Link>
                    );
                })}

                <Modal body={<CreateBoardCard />} target="modal-cb" />
                <ModalContent target="modal-cb" content={<CreateBoardForm />}/>
            </div>
        </div>
    );
}

export default BoardPage