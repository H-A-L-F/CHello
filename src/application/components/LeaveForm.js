import { collection, query, where } from 'firebase/firestore'
import React, { useState } from 'react'
import { db } from '../../firebase'
import { FIRESTORE_FETCH_ERROR, FIRESTORE_FETCH_LOADING } from '../actions/useSnapCollection'
import { useSnapCollection } from '../hooks/useSnapCollection'
import ErrorHolder from '../views/ErrorHolder'
import LoadingHolder from '../views/LoadingHolder'
import Select from 'react-select';
import { generateOptions } from '../modules/convertForSelect'
import { deleteWorkspaceFromAllUser, demoteUserWorkspace, promoteUserWorkspace, removeUserWorkspace } from '../controllers/userWorkspaceController'
import { useNavigate } from 'react-router-dom'
import { closeBoardFromAllUser, demoteUserBoard, promoteUserBoard, removeUserBoard } from '../controllers/userBoardController'

export default function LeaveForm({ data, user, isAdmin }) {
    const memberState = useSnapCollection(query(collection(db, "user"), where("ws_member", "array-contains", data.id)))
    const boardState = useSnapCollection(query(collection(db, "board"), where("workspace", "==", data.id)))
    const [selecteds, setSelected] = useState([])

    const boardMemberState = useSnapCollection(query(collection(db, "user"), where("b_member", "array-contains", data.id)))

    const navigate = useNavigate()

    function isWorkspace() {
        return data.workspace === undefined
    }

    function handleLeave() {
        if (isWorkspace()) {
            // berarti ini di workspace
            selecteds.forEach(e => {
                promoteUserWorkspace(e.uid, data.id)
            })
            if (isAdmin) demoteUserWorkspace(user.id, data.id)
            removeUserWorkspace(user.id, data.id)
            if (onlyAdmin()) deleteWorkspaceFromAllUser(data.id, boardState.data).then(() => {
                navigate("/main/home")
            })
            navigate("/main/home")
        } else {
            // berarti ini board
            selecteds.forEach(e => {
                promoteUserBoard(e.uid, data.id)
            })
            if (isAdmin) demoteUserBoard(user.id, data.id)
            removeUserBoard(user.id, data.id)
            if (onlyAdmin()) closeBoardFromAllUser(data.id).then(() => {
                navigate("/main/home")
            })
            navigate("/main/home")
        }
    }

    function handleChange(options) {
        setSelected(options)
    }

    function onlyAdmin() {
        return data.admin.length === 1 && isAdmin
    }

    if (memberState.status === FIRESTORE_FETCH_LOADING) return <LoadingHolder />
    if (memberState.status === FIRESTORE_FETCH_ERROR) return <ErrorHolder error={memberState.error} />
    return (
        <div>
            <div>
                {isAdmin &&
                    <p>Before leaving do you wish to promote another member?</p>
                }
                {isAdmin &&
                    isWorkspace() ?
                    <Select
                        defaultMenuIsOpen={true}
                        closeMenuOnSelect={false}
                        closeMenuOnScroll={false}
                        options={generateOptions(memberState.data)}
                        onChange={handleChange}
                    /> :
                    <Select
                        defaultMenuIsOpen={true}
                        closeMenuOnSelect={false}
                        closeMenuOnScroll={false}
                        options={generateOptions(boardMemberState.data)}
                        onChange={handleChange}
                    />
                }
                <div className='my-14'></div>
                {onlyAdmin() && <p>Leaving this workspace would also mean closing it, since you are the only admin. Are you sure?</p>}
                <div className="form-control mt-2">
                    <button className="btn btn-error" onClick={handleLeave}>Leave</button>
                </div>
            </div>
        </div>
    )
}