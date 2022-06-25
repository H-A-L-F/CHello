import { collection, doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { Link, useParams } from 'react-router-dom';
import Board from "../components/Board";
import Modal from "../components/Modal";
import ModalContent from "../components/ModalContent";
import CreateBoardCard from "../components/CreateBoard";
import CreateBoardForm from "../components/CreateBoardForm";
import WorkspaceAdmin from "../components/WorkspaceAdmin";
import WorkspaceAdminTag from "../components/WorkspaceAdminTag";
import WorkspaceMemberTag from "../components/WorkspaceMemberTag";
import WorkspaceMember from "../components/WorkspaceMember";
import WorkspaceAddMemberTag from "../components/WorkspaceAddMemberTag";
import { useUserAuth } from "../../AuthContext";
import WorkspacePromoteTag from "../components/WorkspacePromoteTag";

const BoardPage = ({}) => {
    const [board, setBoard] = useState([])
    const [workspace, setWorkspace] = useState([])
    const [isPendingUser, setPendingUser] = useState(true)
    const [users, setUser] = useState()
    const {path} = useParams();
    const {user} = useUserAuth()

    const userCollectionRef = collection(db, "user")
    const wsPath = window.atob(path)
    const id = wsPath.split('/')[1]
    const boardCollectionRef = collection(db, wsPath + "/board/")
    const workspaceDocumentRef = doc(db, "workspace", id)

    const userUid = user.uid
    const userWsLink = wsPath + "/" + userUid
    
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
            <Header title={workspace.name} users={users} wsid={id} pending={isPendingUser} wspath={userWsLink}/>
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
            <div className="my-4"></div>
            {!isPendingUser && <WorkspaceAdmin users={users} wsid={id}/>}
            <div className="my-2"></div>
            {!isPendingUser && <WorkspaceMember users={users} wsid={id}/>}
        </div>
    );
}

const Header = ({ title, users, wsid, pending, wspath }) => {
    return (
        <div className="flex flex-row justify-between w-[50%]">
            <h1 className="text-3xl font-bold text-primary">{ title }</h1>
            <div className="flex flex-row space-x-2">
                {!pending && <WorkspaceAdminTag users={users} wsid={wsid}/>}
                {!pending && <WorkspaceMemberTag users={users} wsid={wsid}/>}
                {!pending && <WorkspaceAddMemberTag users={users} wsid={wsid} wspath={wspath}/>}
                {!pending && <WorkspacePromoteTag users={users} wsid={wsid}/>}
            </div>
        </div>
    );
}

export default BoardPage