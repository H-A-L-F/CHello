import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { useRef } from "react";
import { useUserAuth } from "../../AuthContext";
import { db } from "../../firebase";
import { makeid } from "../../GenerateId";

const CreateWorkspace = () => {
    const titleRef = useRef()
    const publicRef = useRef()

    const { user } = useUserAuth()
    const id = user.uid

    // const workspaceCollectionRef = collection(db, "workspace")
    let workspaceCollectionRef = 'workspace/'  + makeid(20)

    const handleCreateWorkspace = () => {
        const bool = publicRef.current.value === "on" ? true : false

        setDoc(doc(db, workspaceCollectionRef), {
            name: titleRef.current.value,
            admin: [id],
            member: [],
            public: bool,
            path: workspaceCollectionRef
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