import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

export function createList(data) {
    const listRef = collection(db, "list")
    return addDoc(listRef, data)
}

export function updateListTitle(lid, name) {
    const listRef = doc(db, "list", lid)
    const newField = {
        name: name
    }
    return updateDoc(listRef, newField)
}