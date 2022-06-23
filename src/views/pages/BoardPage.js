import { collection, doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { Link, useParams } from 'react-router-dom';
import Board from "../components/Board";
import Modal from "../components/Modal";
import ModalContent from "../components/ModalContent";
import CreateBoardCard from "../components/CreateBoard";
import CreateBoardForm from "../components/CreateBoardForm";
import BoardAdmin from "../components/BoardAdmin";
import BoardAdminTag from "../components/BoardAdminTag";

const BoardPage = ({}) => {
    const [board, setBoard] = useState([])
    const [workspace, setWorkspace] = useState([])
    const [isPendingUser, setPendingUser] = useState(true)
    const [users, setUser] = useState()
    const {path} = useParams();

    const userCollectionRef = collection(db, "user")
    const wsPath = window.atob(path)
    const id = wsPath.split('/')[1]
    const boardCollectionRef = collection(db, wsPath + "/board/")

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

    useEffect(() => {
        const unsub = onSnapshot(userCollectionRef, (data) => {
            setUser(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
            setPendingUser(false)
        })

        return unsub
    }, [])

    return (
        <div className="w-[90%] mx-auto">
            <Header title={workspace.name} users={users} wsid={id}/>
            <div className="my-2"></div>
            <div className="flex flex-wrap">
                {board.map((b) => {
                    const boardPath = wsPath + "/board/" + b.id
                    const link = "/main/board/" + window.btoa(boardPath)

                    return (
                        <Link to={link} key={b.id}>
                            <Board title={b.name}/>
                        </Link>
                    );
                })}

                <Modal body={<CreateBoardCard />} target="modal-cb" />
                <ModalContent target="modal-cb" content={<CreateBoardForm ws={workspace}/>}/>
            </div>
            <div className="my-2"></div>
            {!isPendingUser && <BoardAdmin users={users} wsid={id}/>}
        </div>
    );
}

const Header = ({ title, users, wsid }) => {
    return (
        <div className="flex flex-row justify-between w-[50%]">
            <h1 className="text-3xl font-bold text-primary">{ title }</h1>
            <BoardAdminTag users={users} wsid={wsid}/>
        </div>
    );
}

export default BoardPage