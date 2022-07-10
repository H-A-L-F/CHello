import { collection, query, where } from 'firebase/firestore'
import React from 'react'
import { db } from '../../firebase'
import { FIRESTORE_FETCH_ERROR, FIRESTORE_FETCH_LOADING } from '../actions/useSnapCollection'
import { promoteUserBoard, removeUserBoard } from '../controllers/userBoardController'
import { isUserAuth } from '../controllers/userController'
import { useSnapCollection } from '../hooks/useSnapCollection'
import ErrorHolder from '../views/ErrorHolder'
import LoadingHolder from '../views/LoadingHolder'
import SectionPeople from '../views/SectionPeople'

export default function BoardMember({ bid, user }) {
    const boardMemberState = useSnapCollection(query(collection(db, "user"), where("b_member", "array-contains", bid)))

    if (boardMemberState.status === FIRESTORE_FETCH_LOADING) {
        return <LoadingHolder />
    }

    if (boardMemberState.status === FIRESTORE_FETCH_ERROR) {
        return <ErrorHolder error={boardMemberState.error.message} />
    }

    return (
        <div>
            <SectionPeople
                title={"Members"}
                users={boardMemberState.data}
                currUser={user}
                admin={isUserAuth(user.b_member, bid)}
                promote={promoteUserBoard}
                demote={removeUserBoard} />
        </div>
    )
}
