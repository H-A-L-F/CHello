import { collection } from 'firebase/firestore'
import React from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../../firebase'
import { FIRESTORE_FETCH_ERROR, FIRESTORE_FETCH_LOADING } from '../actions/useSnapCollection'
import { useSnapCollection } from '../hooks/useSnapCollection'
import ErrorHolder from '../views/ErrorHolder'
import LoadingHolder from '../views/LoadingHolder'
import Modal from '../views/Modal'
import ModalContent from '../views/ModalContent'
import PermaRemoveBoardForm from './PermaRemoveBoardForm'
import SectionWorkspace from './SectionWorkspace'

export default function ModifyClosedBoardPage() {
    const workspaceState = useSnapCollection(collection(db, "workspace"))
    const {id} = useParams()

    if (workspaceState.status === FIRESTORE_FETCH_LOADING) return <LoadingHolder />
    if (workspaceState.status === FIRESTORE_FETCH_ERROR) return <ErrorHolder error={workspaceState.error} />
    return (
        <div className="w-[90%] mx-auto flex flex-col space-y-8">
            <SectionWorkspace title={"Move To"} workspace={workspaceState.data} />
            <div class="divider">OR</div>
            <Modal body={<div className='btn btn-error'>Permanently Remove Board</div>} target={"modal-prb"}/>
            <ModalContent target={"modal-prb"} content={<PermaRemoveBoardForm bid={id}/>}/>
        </div>
    )
}
