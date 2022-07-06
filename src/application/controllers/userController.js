import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

export function joinWSAdmin(uid, wsid) {
    const userDocRef = doc(db, "user", uid)
    const newField = {
        ws_admin: arrayUnion(wsid)
    }
    return updateDoc(userDocRef, newField)
}

export function joinWSMember(uid, wsid) {
    const userDocRef = doc(db, "user", uid)
    const newField = {
        ws_member: arrayUnion(wsid)
    }
    return updateDoc(userDocRef, newField)
}