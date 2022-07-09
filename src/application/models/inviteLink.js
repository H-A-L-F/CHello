import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "../../firebase";

export function constructInviteLink(type, id) {
    const ref = collection(db, "link")
    const data = {
        type: type,
        target: id,
        created: Timestamp.now().toDate()
    }
    return data
}