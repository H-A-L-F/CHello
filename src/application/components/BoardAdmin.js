import { collection, query, where } from 'firebase/firestore'
import React from 'react'
import { db } from '../../firebase'
import { FIRESTORE_FETCH_ERROR, FIRESTORE_FETCH_LOADING } from '../actions/useSnapCollection'
import { demoteUserBoard, promoteUserBoard } from '../controllers/userBoardController'
import { isUserAuth } from '../controllers/userController'
import { useSnapCollection } from '../hooks/useSnapCollection'
import ErrorHolder from '../views/ErrorHolder'
import LoadingHolder from '../views/LoadingHolder'
import SectionPeople from '../views/SectionPeople'

export default function BoardAdmin({ bid, user }) {
    const boardAdminState = useSnapCollection(query(collection(db, "user"), where("b_admin", "array-contains", bid)))

    if (boardAdminState.status === FIRESTORE_FETCH_LOADING) {
        return <LoadingHolder />
    }

    if (boardAdminState.status === FIRESTORE_FETCH_ERROR) {
        return <ErrorHolder error={boardAdminState.error.message} />
    }

    return (
        <div>
            <SectionPeople
                title={"Admins"}
                users={boardAdminState.data}
                currUser={user}
                admin={isUserAuth(user.ws_admin, bid)}
                promote={promoteUserBoard}
                demote={demoteUserBoard} />
        </div>
    )
}
