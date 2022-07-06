import { collection } from "firebase/firestore"
import { useRef } from "react"
import { useState, useEffect } from 'react';
import { db } from "../../firebase"
import { convertForSelect } from "../modules/convertForSelect"
import { useSnapCollection } from "../hooks/useSnapCollection"
import Select from 'react-select';

const CreateWorkspaceForm = () => {
    const userState = useSnapCollection(collection(db, "user"))
    let data = []

    const titleRef = useRef()
    const publicRef = useRef()
    const memberRef = useRef()

    useEffect(() => {
        console.log(userState)
        if(userState.status === FIRESTORE_FETCH_SUCCESS) {
            
        }
    }, [userState])

    function handleCreateWorkspace() {
        console.log(userState)
    }

    return(
        <div>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Title</span>
                </label>
                <input ref={titleRef} type="text" placeholder="title" className="input input-bordered" />
            </div>
            <div className="my-2"></div>
            <div className="form-control">
                <label className="label cursor-pointer">
                    <span className="label-text">Public</span>
                    <input ref={publicRef} type="checkbox" className="toggle toggle-primary" defaultChecked />
                </label>
            </div>
            <div className="form-control mt-2 h-28">
                {userState.status === "loading" && <div>loading...</div>}
                {userState.status === "error" && <div>error...</div>}
                {userState.status !== "loading" && userState.status !== "error" && 
                    <Select 
                        ref={memberRef}
                        options={data}
                        isMulti={true}
                    />
                }
            </div>
            <div className="form-control mt-6">
                <button className="btn btn-primary" onClick={handleCreateWorkspace}>Create</button>
            </div>
        </div>
    )
}

export default CreateWorkspaceForm