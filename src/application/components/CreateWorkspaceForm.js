import { collection } from "firebase/firestore"
import { useRef } from "react"
import { useState } from 'react';
import { db } from "../../firebase"
import { convertForSelect, generateOptions } from "../modules/convertForSelect"
import { useSnapCollection } from "../hooks/useSnapCollection"
import Select from 'react-select';
import { FIRESTORE_FETCH_SUCCESS } from "../actions/useSnapCollection";
import ErrorHolder from "../views/ErrorHolder";
import LoadingHolder from "../views/LoadingHolder";
import { useUserAuth } from "../../AuthContext";
import { constructWorkspace } from "../models/workspace";
import { userCreateWorkspace } from "../controllers/userWorkspaceController";

const CreateWorkspaceForm = () => {
    const userState = useSnapCollection(collection(db, "user"))
    const [selecteds, setSelected] = useState()

    const {user} = useUserAuth()

    const titleRef = useRef()
    const publicRef = useRef()

    function handleCreateWorkspace() {
        // handle invite
        console.log(selecteds)
        const bool = publicRef.current.value === "on" ? true : false
        const workspace = constructWorkspace(titleRef.current.value, bool)
        userCreateWorkspace(user.id, workspace)
    }

    function handleChange(options) {
        setSelected(options)
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
            <div className="form-control mt-2 h-64">
                {userState.status === "loading" && <LoadingHolder />}
                {userState.status === "error" && <ErrorHolder />}
                {userState.status === FIRESTORE_FETCH_SUCCESS && 
                    <Select
                        defaultMenuIsOpen={true}
                        closeMenuOnSelect={false}
                        closeMenuOnScroll={false}
                        options={generateOptions(userState.data)}
                        isMulti={true}
                        onChange={handleChange}
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