import { addDoc, arrayUnion, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

export function createWorkspace(data) {
    const colRef = collection(db, "workspace")
    return addDoc(colRef, data)
}

export function addWorkspaceMember(uid, wsid) {
    const wsRef = doc(db, "workspace", wsid)
    const newField = {
        member: arrayUnion(uid)
    }
    updateDoc(wsRef, newField)
}

export function addWorkspaceAdmin(uid, wsid) {
    const wsRef = doc(db, "workspace", wsid)
    const newField = {
        admin: arrayUnion(uid)
    }
    updateDoc(wsRef, newField)
}

export function getWorkspaceUrl(id) {
    return "/main/workspace/" + id
}

export function deleteWorkspace(data) {
    // delete workspace
}