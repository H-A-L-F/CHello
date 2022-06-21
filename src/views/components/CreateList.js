import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { useRef } from "react";
import { db } from "../../firebase";
import { useParams } from 'react-router-dom';
import { makeid } from "../../GenerateId";

const CreateList = () => {
    const titleRef = useRef()
    const {path} = useParams()

    // const listCollectionRef = collection(db, "list")
    const currPath = path + "/list/" + makeid(20)

    const handleCreateList = () => {
        setDoc(doc(db, currPath), {
            name: titleRef.current.value,
            boardID: currPath
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