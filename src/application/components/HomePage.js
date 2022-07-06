import { collection, doc } from 'firebase/firestore'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useUserAuth } from '../../AuthContext'
import { db } from '../../firebase'
import { FIRESTORE_FETCH_ERROR, FIRESTORE_FETCH_LOADING, FIRESTORE_FETCH_SUCCESS } from '../actions/useSnapCollection'
import { userFilterAdminWS } from '../controllers/userWorkspaceController'
import { useSnapCollection } from '../hooks/useSnapCollection'
import SectionWorkspace from './SectionWorkspace'
import StatefulComponent from './StatefulComponent'

export default function HomePage() {
    const workspaceState = useSnapCollection(collection(db, "workspace"))
    const {user} = useUserAuth()
    const [adminWorkspace, setAdminWorkspace] = useState([])

    useEffect(() => {
        if(workspaceState.status === FIRESTORE_FETCH_SUCCESS) {
            setAdminWorkspace(userFilterAdminWS(user.ws_admin, workspaceState.data))
            console.log(adminWorkspace)
        }
    }, [workspaceState])

    return (
        <div className="w-[90%] mx-auto flex flex-col space-y-8">
            {/* {isPending && <LoadingHolder /> } */}
            {/* {workspaces && <SectionWorkspace title={"Workspaces"} workspace={workspaces} />} */}
            <StatefulComponent 
                state={workspaceState} 
                content={<SectionWorkspace title={"Workspaces"} workspace={workspaceState.data} />}
                loading={FIRESTORE_FETCH_LOADING}
                error={FIRESTORE_FETCH_ERROR}
            />
            <StatefulComponent 
                state={workspaceState} 
                content={<SectionWorkspace title={"Admin Workspace"} workspace={adminWorkspace} />}
                loading={FIRESTORE_FETCH_LOADING}
                error={FIRESTORE_FETCH_ERROR}
            />
            {/* {workspaces && <AdminWorkspace workspaces={workspaces}/>} */}
            {/* {workspaces && <MemberWorkspace workspaces={workspaces}/>} */}
            {/* {workspaces && <PublicWorkspace workspaces={workspaces}/>} */}
        </div>
    )
}