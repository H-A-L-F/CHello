import { addDoc, collection } from "firebase/firestore";
import { useRef } from "react";
import { db } from "../../firebase";

const CreateBoardForm = ({ wsid }) => {
    const titleRef = useRef()
    let visibility = "public"

    const boardCollectionRef = collection(db, "board")

    const handleCreateBoard = () => {
        addDoc(boardCollectionRef, {
            name: titleRef.current.value,
            visibility: visibility,
            workspaceID: wsid
        })
    }

    const handleChange = (v) => {
        visibility = v.target.value
    }

    return (
        <div>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Title</span>
                </label>
                <input ref={titleRef} type="text" placeholder="title" className="input input-bordered" />
            </div>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Visibility</span>
                </label>
                <select onChange={handleChange} className="select select-primary w-full max-w-xs">
                <option defaultChecked>public</option>
                <option>workspace-visible</option>
                <option>board-visible</option>
            </select>
            </div>
            <div className="form-control mt-6">
                <button className="btn btn-primary" onClick={handleCreateBoard}>Create</button>
            </div>
        </div>
    );
}

export default CreateBoardForm