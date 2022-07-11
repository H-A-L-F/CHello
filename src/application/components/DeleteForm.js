import { collection, query, where } from 'firebase/firestore'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { db } from '../../firebase'
import { FIRESTORE_FETCH_ERROR, FIRESTORE_FETCH_LOADING } from '../actions/useSnapCollection'
import { closeBoardFromAllUser } from '../controllers/userBoardController'
import { deleteWorkspaceFromAllUser } from '../controllers/userWorkspaceController'
import { useSnapCollection } from '../hooks/useSnapCollection'
import ErrorHolder from '../views/ErrorHolder'
import LoadingHolder from '../views/LoadingHolder'

export default function DeleteForm({data, type}) {
    const navigate = useNavigate()
    const boardState = useSnapCollection(query(collection(db, "board"), where("workspace", "==", data.id)))

    function handleDelete() {
        if(type === "workspace") {
            deleteWorkspaceFromAllUser(data.id, boardState.data).then(() => {
                navigate("/main/home")
            })
        } else if(type === "board") {
            closeBoardFromAllUser(data.id).then(() => {
                navigate("/main/home")
            })
        }
    }

    if (boardState.status === FIRESTORE_FETCH_LOADING) return <LoadingHolder />
    if (boardState.status === FIRESTORE_FETCH_ERROR) return <ErrorHolder error={boardState.error} />
    return (
        <div>
            {type === "workspace" && <p>Are you sure? This workspace will be removed forever. The boards contained in this workspace are still recoverable by the board admin</p>}
            {type === "board" && <p>This board will be closed, it could still be reopened by the board's admin. Do you still want to proceed?</p>}
            <div className="form-control mt-4">
                <button className="btn btn-error" onClick={handleDelete}>{type === "workspace" ? "Delete" : "Close"}</button>
            </div>
        </div>
    )
}
