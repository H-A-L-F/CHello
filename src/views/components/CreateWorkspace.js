import { addDoc, collection } from "firebase/firestore";
import { useRef } from "react";
import { db } from "../../firebase";

const CreateWorkspace = () => {
    const titleRef = useRef()
    const publicRef = useRef()

    const workspaceCollectionRef = collection(db, "workspace")

    const handleCreateWorkspace = () => {
        const bool = publicRef.current.value === "on" ? true : false

        addDoc(workspaceCollectionRef, {
            name: titleRef.current.value,
            public: bool
        })
            .then({

            })
            .catch({

            });
    }

    return (
        <div>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Title</span>
                </label>
                <input ref={titleRef} type="text" placeholder="title" className="input input-bordered" />
            </div>
            <div className="my-2"></div>
            <div className="form-control">
                <label className="label cursor-pointer">
                    <span className="label-text">Public</span>
                    <input ref={publicRef} type="checkbox" className="toggle toggle-primary" defaultChecked />
                </label>
            </div>
            <div className="form-control mt-6">
                <button className="btn btn-primary" onClick={handleCreateWorkspace}>Create</button>
            </div>
        </div>
    );
}

export default CreateWorkspace;