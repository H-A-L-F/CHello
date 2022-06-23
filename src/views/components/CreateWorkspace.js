import { addDoc, arrayUnion, collection, doc, FieldValue, setDoc, updateDoc } from "firebase/firestore";
import { useRef } from "react";
import { useUserAuth } from "../../AuthContext";
import { db } from "../../firebase";
import { makeid } from "../../GenerateId";

const CreateWorkspace = () => {
    const titleRef = useRef()
    const publicRef = useRef()

    const { user } = useUserAuth()

    // const workspaceCollectionRef = collection(db, "workspace")
    let workspaceCollectionRef = 'workspace/'  + makeid(20)

    function addWorkspaceRefToMember(wsid) {
        const id = user.uid
        const userDocRef = doc(db, "user", id)
        const newField = {
            admin: arrayUnion(wsid)
        }
        updateDoc(userDocRef, newField)
    }

    const handleCreateWorkspace = () => {
        const bool = publicRef.current.value === "on" ? true : false
        setDoc(doc(db, workspaceCollectionRef), {
            name: titleRef.current.value,
            public: bool,
            path: workspaceCollectionRef
        })
            .then(() => {
                const wsid = workspaceCollectionRef.split('/')[1]
                console.log(wsid)
                addWorkspaceRefToMember(wsid)
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