import { collection, doc, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { Link, useParams } from 'react-router-dom';
import Board from "../components/Board";
import Modal from "../components/Modal";
import ModalContent from "../components/ModalContent";
import CreateBoardCard from "../components/CreateBoard";
import CreateBoardForm from "../components/CreateBoardForm";

const BoardPage = ({}) => {
    const [board, setBoard] = useState([])
    const [workspace, setWorkspace] = useState([])
    const {path} = useParams();

    const boardPath = window.atob(path)
    const id = boardPath.split('/')[1]
    const boardCollectionRef = collection(db, boardPath + "/board")

    const workspaceDocumentRef = doc(db, "workspace", id)
    
    useEffect(() => {
        const unsub = onSnapshot(boardCollectionRef, (data) => {
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
                <ModalContent target="modal-cb" content={<CreateBoardForm ws={workspace}/>}/>
            </div>
        </div>
    );
}

const Header = ({ title }) => {
    return (
        <div className="flex flex-row justify-between w-[50%]">
            <h1 className="text-3xl font-bold text-primary">{ title }</h1>
        </div>
    );
}

export default BoardPage