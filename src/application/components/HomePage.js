import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { collection, doc, query, where } from 'firebase/firestore'
import React, { useCallback, useRef } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useUserAuth } from '../../AuthContext'
import { auth, db } from '../../firebase'
import { FIRESTORE_FETCH_ERROR, FIRESTORE_FETCH_LOADING, FIRESTORE_FETCH_SUCCESS } from '../actions/useSnapCollection'
import { userFilterFavoriteBoard } from '../controllers/userBoardController'
import { getUserDB, getUserLocal, isUserAuth } from '../controllers/userController'
import { userFilterAuthWS } from '../controllers/userWorkspaceController'
import { useSnapCollection } from '../hooks/useSnapCollection'
import ErrorHolder from '../views/ErrorHolder'
import LoadingHolder from '../views/LoadingHolder'
import SectionBoard from './SectionBoard'
import SectionWorkspace from './SectionWorkspace'
import StatefulComponent from './StatefulComponent'

export default function HomePage() {
    const workspaceState = useSnapCollection(collection(db, "workspace"))

    //problem di user ga update realtime
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))
    // const memberWorkspaceState = useSnapCollection(collection(db, "workspace"), isUserAuth, user.ws_member)
    // const adminWorkspaceState = useSnapCollection(collection(db, "workspace"), isUserAuth, user.ws_admin)
    const publicWorkspaceState = useSnapCollection(query(collection(db, "workspace"), where("visibility", "==", true)))
    const publicBoardState = useSnapCollection(query(collection(db, "board"), where("visibility", "==", "public")))
    const boardState = useSnapCollection(collection(db, "board"))

    const { refreshPage } = useUserAuth()
    const searchRef = useRef()

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('user')))
    }, [workspaceState])

    useEffect(() => {
        refreshPage()
    }, [])

    const handleKey = useCallback((e) => {
        if (e.ctrlKey == true && e.shiftKey == true && e.key == "F") searchRef.current.focus()
    }, []);

    useEffect(() => {
        document.addEventListener("keydown", handleKey);
        return () => {
            document.removeEventListener("keydown", handleKey);
        }
    }, [handleKey])

    function filterClosedBoard(b) {
        return !(b.delete === "closed")
    }

    if (workspaceState.status === FIRESTORE_FETCH_LOADING) return <LoadingHolder />
    if (workspaceState.status === FIRESTORE_FETCH_ERROR) return <ErrorHolder error={workspaceState.error} />
    return (
        <div className="w-[90%] mx-auto flex flex-col space-y-8">
            <div className="form-control">
                <input ref={searchRef} type="text" placeholder="Search" className="input input-bordered" />
            </div>
            <div className='flex flex-row'>
                <kbd className="kbd bg-base-300">ctrl</kbd>
                +
                <kbd className="kbd bg-base-300">shift</kbd>
                +
                <kbd className="kbd bg-base-300">f</kbd>
            </div>
            {/* <StatefulComponent 
                state={workspaceState.status}
                content={<SectionWorkspace title={"Workspaces"} workspace={workspaceState.data} />}
                loading={FIRESTORE_FETCH_LOADING}
                error={FIRESTORE_FETCH_ERROR}
            />
            <StatefulComponent 
                state={adminWorkspaceState.status}
                content={<SectionWorkspace title={"Admin Workspaces"} workspace={userFilterAuthWS(user.ws_admin, workspaceState.data)} />}
                loading={FIRESTORE_FETCH_LOADING}
                error={FIRESTORE_FETCH_ERROR}
            />
            <StatefulComponent 
                state={memberWorkspaceState.status}
                content={<SectionWorkspace title={"Member Workspaces"} workspace={userFilterAuthWS(user.ws_member, workspaceState.data)} />}
                loading={FIRESTORE_FETCH_LOADING}
                error={FIRESTORE_FETCH_ERROR}
            /> */}
            {/* <StatefulComponent 
                state={adminWorkspaceState.status}
                content={<SectionWorkspace title={"Admin Workspaces"} workspace={adminWorkspaceState.data} />}
                loading={FIRESTORE_FETCH_LOADING}
                error={FIRESTORE_FETCH_ERROR}
            />
            <StatefulComponent 
                state={memberWorkspaceState.status}
                content={<SectionWorkspace title={"Member Workspaces"} workspace={memberWorkspaceState.data} />}
                loading={FIRESTORE_FETCH_LOADING}
                error={FIRESTORE_FETCH_ERROR}
            /> */}
            <SectionWorkspace title={"Workspaces"} workspace={workspaceState.data} />
            <SectionWorkspace title={"Admin Workspaces"} workspace={userFilterAuthWS(user.ws_admin, workspaceState.data)} />
            <SectionWorkspace title={"Member Workspaces"} workspace={userFilterAuthWS(user.ws_member, workspaceState.data)} />
            <SectionWorkspace title={"Public Workspaces"} workspace={publicWorkspaceState.data} />
            <SectionBoard title={"Public Boards"} board={publicBoardState.data.filter(filterClosedBoard)} />
            <SectionBoard title={"Favorite Boards"} board={userFilterFavoriteBoard(user, boardState.data)} />
            {/* {workspaces && <PublicWorkspace workspaces={workspaces}/>} */}
        </div>
    )
}