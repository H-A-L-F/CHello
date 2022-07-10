import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { useRef } from "react";
import { db } from "../../firebase";
import { makeid } from "../../GenerateId";
import { createCard } from "../controllers/cardController";
import { constructCard } from "../models/card";

const CreateCardForm = ({ l }) => {
    const titleRef = useRef()
    let status = "default"

    const handleChange = (v) => {
        status = v.target.value
    }

    const handleCreateCard = () => {
        const name = titleRef.current.value
        const card = constructCard(name, status, l.id)
        createCard(card)
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