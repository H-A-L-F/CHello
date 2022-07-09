import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";

let LINK = "invite/join/"

export function createInviteLink(data) {
    const ref = collection(db, "link")
    return addDoc(ref, data)
}

export function generateLink(id) {
    return LINK + id
}