import { collection } from "firebase/firestore"
import { useRef } from "react"
import { db } from "../../firebase"
import { useSnapCollection } from "../hooks/useSnapCollection"
import Select from 'react-select';

const CreateWorkspaceForm = () => {
    const userState = useSnapCollection(collection(db, "user"))

    const titleRef = useRef()
    const publicRef = useRef()
    const memberRef = useRef()

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
                {/* <Select 
                    ref={memberRef}
                    options={alls}
                    isMulti={true}
                /> */}
            </div>
            <div className="form-control mt-6">
                <button className="btn btn-primary" onClick={handleCreateWorkspace}>Create</button>
            </div>
        </div>
    )
}

export default CreateWorkspaceForm