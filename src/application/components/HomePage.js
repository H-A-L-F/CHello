import { collection, doc } from 'firebase/firestore'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useUserAuth } from '../../AuthContext'
import { db } from '../../firebase'
import { FIRESTORE_FETCH_ERROR, FIRESTORE_FETCH_LOADING, FIRESTORE_FETCH_SUCCESS } from '../actions/useSnapCollection'
import { isUserAuth } from '../controllers/userController'
import { userFilterAuthWS } from '../controllers/userWorkspaceController'
import { useSnapCollection } from '../hooks/useSnapCollection'
import ErrorHolder from '../views/ErrorHolder'
import LoadingHolder from '../views/LoadingHolder'
import SectionWorkspace from './SectionWorkspace'
import StatefulComponent from './StatefulComponent'

export default function HomePage() {
    const workspaceState = useSnapCollection(collection(db, "workspace"))

    const {user} = useUserAuth()
    const memberWorkspaceState = useSnapCollection(collection(db, "workspace"), isUserAuth, user.ws_member)
    const adminWorkspaceState = useSnapCollection(collection(db, "workspace"), isUserAuth, user.ws_admin)

    useEffect(() => {
        console.log(workspaceState)
        console.log(adminWorkspaceState)
    }, [adminWorkspaceState])

    if(workspaceState.status === FIRESTORE_FETCH_LOADING) return <LoadingHolder />
    if(workspaceState.status === FIRESTORE_FETCH_ERROR) return <ErrorHolder error={workspaceState.error}/>
    return (
        <div className="w-[90%] mx-auto flex flex-col space-y-8">
            <SectionWorkspace title={"Workspaces"} workspace={workspaceState.data} />
            <SectionWorkspace title={"Admin Workspaces"} workspace={userFilterAuthWS(user.ws_admin, workspaceState.data)} />
            <SectionWorkspace title={"Member Workspaces"} workspace={userFilterAuthWS(user.ws_member, workspaceState.data)} />
            {/* {workspaces && <AdminWorkspace workspaces={workspaces}/>} */}
            {/* {workspaces && <MemberWorkspace workspaces={workspaces}/>} */}
            {/* {workspaces && <PublicWorkspace workspaces={workspaces}/>} */}
        </div>
    )
}