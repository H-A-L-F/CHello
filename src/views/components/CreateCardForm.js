import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { useRef } from "react";
import { db } from "../../firebase";
import { makeid } from "../../GenerateId";

const CreateCardForm = ({ l }) => {
    const titleRef = useRef()
    let status = "default"

    // const cardCollectionRef = collection(db, "card")
    const path = l.path + "/card/" + makeid(20)

    const handleChange = (v) => {
        status = v.target.value
    }

    const handleCreateCard = () => {
        setDoc(doc(db, path), {
            name: titleRef.current.value,
            status: status,
            path: path
        })
    }

    return (
        <div>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Title</span>
                </label>
                <input ref={titleRef} type="text" placeholder="title" className="input input-bord   ered" />
            </div>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Status</span>
                </label>
                <select onChange={handleChange} className="select select-primary w-full max-w-xs">
                    <option defaultChecked>default</option>
                    <option>done</option>
                    <option>ongoing</option>
                    <option>no-progress</option>
                </select>
            </div>
            <div className="form-control mt-6">
                <button className="btn btn-primary" onClick={handleCreateCard}>Create</button>
            </div>
        </div>
    );
}

export default CreateCardForm