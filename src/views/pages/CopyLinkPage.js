import InviteLinkModal from "../components/InviteLinkModal"
import { useParams } from "react-router-dom";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "../../firebase";
import { useState } from "react";
import { useEffect } from "react";

const CopyLinkPage = ({type}) => {
    const [isPendingLink, setPendingLink] = useState(true)
    const [link, setLink] = useState()
    const {path} = useParams()

    const currPath = window.atob(path)
    const {ref: refPath, uid, len} = getRefPath(currPath)
    const docId = getDocId(refPath, len)

    function getRefPath(path) {
        let refPath = ""
        let strs = path.split("/")
        for (let i = 0; i < strs.length - 1; i++) {
            refPath += strs[i] + "/"
        }
        let uid = strs[strs.length-1]
        return {ref: refPath, uid: uid, len: strs.length - 1}
    }

    function getDocId(path, len) {
        return len === 2 ? path.split("/")[1] : path.split("/")[1]
    }

    function createInviteDb(uid, id) {
        const inviteColRef = collection(db, "invite")
        const invite = {
            docID: id,
            for: type,
            created: Timestamp.now().toDate()
        }
        addDoc(inviteColRef, invite)
            .then(function(docRef) {
                setLink(docRef.id)
                setPendingLink(false)
            })
    }

    useEffect(() => {
        createInviteDb(uid, docId)
    }, [])

    // console.log(currPath)
    // console.log(Timestamp.now().toDate() - Timestamp.now().toDate())

    return (
        <div className="hero min-h-screen bg-base-300">
            <div className="hero-content flex-col">
                <div className="card flex-shrink-0 w-full shadow-2xl bg-base-100">
                <div className="card-body">
                    {/* {isPendingLink ? <div>Loading...</div> : <InviteLinkModal path={link}/>} */}
                    <InviteLinkModal path={isPendingLink ? "Loading..." : link}/>
                </div>
                </div>
            </div>
        </div>
    )
}

export default CopyLinkPage