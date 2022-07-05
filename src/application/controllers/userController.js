import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";


export function addWSRef(uid, wsid) {
    const userDocRef = doc(db, "user", uid)
    const newField = {
        ws_admin: arrayUnion(wsid)
    }
    updateDoc(userDocRef, newField)
}