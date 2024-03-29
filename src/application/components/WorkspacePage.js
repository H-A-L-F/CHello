import { collection, doc, query, where } from 'firebase/firestore'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useUserAuth } from '../../AuthContext'
import { db } from '../../firebase'
import { FIRESTORE_FETCH_ERROR, FIRESTORE_FETCH_LOADING, FIRESTORE_FETCH_SUCCESS } from '../actions/useSnapCollection'
import { authorizeUserForBoard, isClosedBoard } from '../controllers/boardController'
import { isUserAuth } from '../controllers/userController'
import { userAllowedWorkspace } from '../controllers/userWorkspaceController'
import { useSnapCollection } from '../hooks/useSnapCollection'
import Board from '../views/Board'
import CreateBoardCard from '../views/CreateBoardCard'
import ErrorHolder from '../views/ErrorHolder'
import LoadingHolder from '../views/LoadingHolder'
import ManageTag from '../views/ManageTag'
import Modal from '../views/Modal'
import ModalContent from '../views/ModalContent'
import CreateBoardForm from './CreateBoardForm'
import DeleteForm from './DeleteForm'
import DeleteTag from './DeleteTag'
import LeaveForm from './LeaveForm'
import LeaveTag from './LeaveTag'
import ManageWorkspaceForm from './ManageWorkspaceForm'
import WorkspaceAdmin from './WorkspaceAdmin'
import WorkspaceInviteTag from './WorkspaceInviteTag'
import WorkspaceMember from './WorkspaceMember'

export default function WorkspacePage() {
    const { id } = useParams()
    const workspaceState = useSnapCollection(doc(db, "workspace", id))
    const boardState = useSnapCollection(query(collection(db, "board"), where("workspace", "==", id)))

    const { user } = useUserAuth()
    const [authorized, setAuthorized] = useState(false)

    useEffect(() => {
        if (user) setAuthorized(userAllowedWorkspace(user, id))
    }, [user])


    if (workspaceState.status === FIRESTORE_FETCH_LOADING) return <LoadingHolder />
    if (workspaceState.status === FIRESTORE_FETCH_ERROR) return <ErrorHolder error={workspaceState.error} />
    return (
        <div className="w-[90%] mx-auto">
            {user ? <Header title={workspaceState.data.name} id={id} user={user} ws={workspaceState.data} authorized={authorized} /> : <LoadingHolder />}
            <div className="my-2"></div>
            <div className="flex flex-wrap">
                {boardState.status === FIRESTORE_FETCH_SUCCESS && boardState.data.map((b) => {
                    const link = "/main/board/" + b.id

                    if (!isClosedBoard(b)) {
                        if (authorizeUserForBoard(user, b, workspaceState.data)) {
                            return (
                                <Link to={link} key={b.id}>
                                    <Board title={b.name} />
                                </Link>
                            )
                        }
                        else return <div></div>
                    }
                    else return <div></div>

                })}

                {authorized && <Modal body={<CreateBoardCard />} target="modal-cb" />}
                {authorized && <ModalContent target="modal-cb" content={<CreateBoardForm ws={workspaceState.data} />} />}
            </div>
            <div className="my-4"></div>
            {<WorkspaceAdmin wsid={id} user={user} />}
            <div className="my-2"></div>
            {<WorkspaceMember wsid={id} user={user} />}
        </div>
    )
}

const Header = ({ title, id, user, ws, authorized }) => {
    function isAdmin() {
        return isUserAuth(user.ws_admin, id)
    }

    return (
        <div className="flex flex-row justify-between w-[50%]">
            <h1 className="text-3xl font-bold text-primary">{title}</h1>
            <div className="flex flex-row space-x-2">
                {authorized && <AuthorizedHeader ws={ws} user={user} isAdmin={isAdmin()} />}
                {isAdmin() && <AdminHeader ws={ws} user={user} />}
            </div>
        </div>
    )
}

const AdminHeader = ({ ws }) => {
    return (
        <div className='flex flex-row space-x-2'>
            <WorkspaceInviteTag wsid={ws.id} />
            <ManageTag form={<ManageWorkspaceForm ws={ws} />} />
            <DeleteTag form={<DeleteForm data={ws} type={"workspace"} />} />
        </div>
    )
}

const AuthorizedHeader = ({ ws, user, isAdmin }) => {
    return (
        <div className='flex flex-row space-x-2'>
            <LeaveTag form={<LeaveForm data={ws} user={user} isAdmin={isAdmin} />} />
        </div>
    )
}