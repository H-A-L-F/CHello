import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";

export function createList(data) {
    const listRef = collection(db, "list")
    return addDoc(listRef, data)
}