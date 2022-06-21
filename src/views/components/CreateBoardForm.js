import { addDoc, collection } from "firebase/firestore";
import { useRef } from "react";
import { db } from "../../firebase";
import { useParams } from 'react-router-dom';
import { useUserAuth } from "../../AuthContext";

const CreateBoardForm = ({ ws }) => {
    const titleRef = useRef()
    let visibility = "public"

    const boardCollectionRef = collection(db, "board")
    const {id} = useParams()
    const {user} = useUserAuth()

    let currId = id ? id : ws.id

    // console.log(currId)

    const handleCreateBoard = () => {
        // console.log(user.uid)

        addDoc(boardCollectionRef, {
            name: titleRef.current.value,
            visibility: visibility,
            admin: [user.uid],
            member: [],
            workspaceID: currId
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