import { doc, updateDoc } from "firebase/firestore";
import { useRef } from "react";
import { db } from "../../firebase";

const CardDetail = ({ c }) => {
    const titleRef = useRef()
    let status = "default"

    const handleChange = (v) => {
        status = v.target.value
    }

    const updateCard = async() => {
        const cardDocRef = doc(db, "card", c.id)
        const newField = { name: titleRef.current.value, status: status }
        await updateDoc(cardDocRef, newField)
    }
 
    const handleEditCard = () => {
        updateCard()
    }

    return (
        <div>
            <div className="form-control">
                <label className="label">
                    <span className="label-text" defaultValue={c.name}>Title</span>
                </label>
                <input ref={titleRef} type="text" placeholder="title" className="input input-bordered" />
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
                <button className="btn btn-primary" onClick={handleEditCard}>Create</button>
            </div>
        </div>
    );
}

export default CardDetail