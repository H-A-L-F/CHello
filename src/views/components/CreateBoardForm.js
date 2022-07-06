import { arrayUnion, doc, setDoc, updateDoc } from "firebase/firestore";
import { useRef } from "react";
import { db } from "../../firebase";
import { useUserAuth } from "../../AuthContext";
import { makeid } from "../../GenerateId";

const CreateBoardForm = ({ ws }) => {
    const titleRef = useRef()
    let visibility = "public"

    const {user} = useUserAuth()
    const pathId = makeid(20)
    const path = ws.path + '/board/' + pathId

    const handleCreateBoard = () => {
        setDoc(doc(db, path), {
            name: titleRef.current.value,
            visibility: visibility,
            path: path
        })
            .then(() => {
                addBoardToMember(pathId)
            })
    }

    function addBoardToMember(bid) {
        const id = user.id
        const userDocRef = doc(db, "user", id)
        const newField = {
            adminBoard: arrayUnion(bid)
        }
        updateDoc(userDocRef, newField)
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