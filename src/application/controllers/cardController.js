import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

export function moveCard(cid, lid) {
    const cardRef = doc(db, "card", cid)
    const newField = {
        list: lid
    }
    return updateDoc(cardRef, newField)
}

export function createCard(data) {
    const ref = collection(db, "card")
    return addDoc(ref, data)
}

export function updateCard(cid, data) {
    const ref = doc(db, "card", cid)
    return updateDoc(ref, data)
}