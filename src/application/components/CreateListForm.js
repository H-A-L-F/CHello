import { useRef } from "react";
import { useParams } from 'react-router-dom';
import { constructList } from "../models/list";
import { createList } from "../controllers/listController";

const CreateListForm = () => {
    const {id} = useParams()
    const titleRef = useRef()

    const handleCreateList = () => {
        const list = constructList(titleRef.current.value, id)
        createList(list)
    }

    return (
        <div>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Title</span>
                </label>
                <input ref={titleRef} type="text" placeholder="title" className="input input-bordered" />
            </div>
            <div className="form-control mt-6">
                <button className="btn btn-primary" onClick={handleCreateList}>Create</button>
            </div>
        </div>
    );
}

export default CreateListForm