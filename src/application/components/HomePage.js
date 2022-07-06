import { collection } from 'firebase/firestore'
import React from 'react'
import { db } from '../../firebase'
import { FIRESTORE_FETCH_ERROR, FIRESTORE_FETCH_LOADING } from '../actions/useSnapCollection'
import { useSnapCollection } from '../hooks/useSnapCollection'
import SectionWorkspace from './SectionWorkspace'
import StatefulComponent from './StatefulComponent'

export default function HomePage() {
    const workspaceState = useSnapCollection(collection(db, "workspace"))

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
            {/* {workspaces && <AdminWorkspace workspaces={workspaces}/>} */}
            {/* {workspaces && <MemberWorkspace workspaces={workspaces}/>} */}
            {/* {workspaces && <PublicWorkspace workspaces={workspaces}/>} */}
        </div>
    )
}