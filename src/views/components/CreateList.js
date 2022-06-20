import { useRef } from "react";

const CreateList = () => {
    const titleRef = useRef()

    const handleCreateList = () => {

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