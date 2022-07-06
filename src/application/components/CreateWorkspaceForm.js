import { collection } from "firebase/firestore"
import { useRef } from "react"
import { useState, useEffect } from 'react';
import { db } from "../../firebase"
import { convertForSelect } from "../modules/convertForSelect"
import { useSnapCollection } from "../hooks/useSnapCollection"
import Select from 'react-select';
import { FIRESTORE_FETCH_SUCCESS } from "../actions/useSnapCollection";

const CreateWorkspaceForm = () => {
    const userState = useSnapCollection(collection(db, "user"))
    const [isPendingOpt, setPendingOpt] = useState(true)
    const [opts, setOpt] = useState([])
    const [selecteds, setSelected] = useState()

    const titleRef = useRef()
    const publicRef = useRef()

    useEffect(() => {
        if(userState.status === FIRESTORE_FETCH_SUCCESS) {
            setOpt([])
            userState.data.forEach(element => {
                setOpt((prev) => [...prev, convertForSelect(element.email)])
            });
            setPendingOpt(false)
        }
    }, [userState])

    function handleCreateWorkspace() {
        console.log(selecteds)
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
                {userState.status === "loading" && <div>loading...</div>}
                {userState.status === "error" && <div>error...</div>}
                {!isPendingOpt && 
                    <Select
                        defaultMenuIsOpen={true}
                        closeMenuOnSelect={false}
                        closeMenuOnScroll={false}
                        isLoading={isPendingOpt}
                        options={opts}
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