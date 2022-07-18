import { collection, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useUserAuth } from '../../AuthContext'
import { db } from '../../firebase'
import { FIRESTORE_FETCH_ERROR, FIRESTORE_FETCH_LOADING } from '../actions/useSnapCollection'
import { userFilterFavoriteBoard } from '../controllers/userBoardController'
import { useSnapCollection } from '../hooks/useSnapCollection'
import ErrorHolder from '../views/ErrorHolder'
import LoadingHolder from '../views/LoadingHolder'
import SectionBoard from './SectionBoard'
import SectionClosedBoard from './SectionClosedBoard'

export default function ClosedBoardPage() {
    // const {user} = useUserAuth()
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))
    const { refreshPage } = useUserAuth()

    const closedBoardState = useSnapCollection(query(collection(db, "board"), where("delete", "==", "closed"), where("admin", "array-contains", user.id)))
    const boardState = useSnapCollection(collection(db, "board"))

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('user')))
    }, [closedBoardState])

    useEffect(() => {
        refreshPage()
    }, [])

    if (closedBoardState.status === FIRESTORE_FETCH_LOADING) return <LoadingHolder />
    if (closedBoardState.status === FIRESTORE_FETCH_ERROR) return <ErrorHolder error={closedBoardState.error} />
    return (
        <div className="w-[90%] mx-auto flex flex-col space-y-8">
            <SectionClosedBoard title={"Closed Boards"} board={closedBoardState.data} />
            <SectionBoard title={"Favorite Boards"} board={userFilterFavoriteBoard(user, boardState.data)} />
        </div>
    )
}

