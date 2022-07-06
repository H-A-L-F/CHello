import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";

export function createWorkspace(data) {
    const colRef = collection(db, "workspace")
    return addDoc(colRef, data)
}

export function addWorkspaceMember(uid) {
    
}

export function deleteWorkspace(data) {
    
}