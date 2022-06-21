import { doc, setDoc } from "firebase/firestore";
import { useRef } from "react";
import { db } from "../../firebase";
import { useUserAuth } from "../../AuthContext";
import { makeid } from "../../GenerateId";

const CreateBoardForm = ({ ws }) => {
    const titleRef = useRef()
    let visibility = "public"

    const {user} = useUserAuth()

    const handleCreateBoard = () => {
        let path = ws.path + '/board/' + makeid(20)
        
        setDoc(doc(db, path), {
            name: titleRef.current.value,
            visibility: visibility,
            admin: [user.uid],
            member: [],
            path: path
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