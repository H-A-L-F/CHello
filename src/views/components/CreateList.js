import { addDoc, collection } from "firebase/firestore";
import { useRef } from "react";
import { db } from "../../firebase";
import { useParams } from 'react-router-dom';

const CreateList = () => {
    const titleRef = useRef()
    const {id} = useParams()

    const listCollectionRef = collection(db, "list")

    const handleCreateList = () => {
        addDoc(listCollectionRef, {
            name: titleRef.current.value,
            boardID: id
        })
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

export default CreateList