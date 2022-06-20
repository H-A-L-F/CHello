import { useRef } from "react";

const CardDetail = () => {
    const titleRef = useRef()
    let status = "default"

    const handleChange = (v) => {
        status = v.target.value
    }

    const handleEditCard = () => {

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
                <button className="btn btn-primary" onClick={handleEditCard}>Create</button>
            </div>
        </div>
    );
}

export default CardDetail