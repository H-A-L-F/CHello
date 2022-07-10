import { addDoc, arrayRemove, arrayUnion, collection, deleteDoc, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

export function createWorkspace(data) {
    const colRef = collection(db, "workspace")
    return addDoc(colRef, data)
}

export function getWorkspace(wsid) {
    const wsRef = doc(db, "workspace", wsid)
    return getDoc(wsRef)
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

export function deleteWorkspace(wsid) {
    const wsRef = doc(db, "workspace", wsid)
    return deleteDoc(wsRef)
}

export function workspacePromoteUser(uid, wsid) {
    const wsRef = doc(db, "workspace", wsid)
    const data = {
        member: arrayRemove(uid),
        admin: arrayUnion(uid)
    }
    return updateDoc(wsRef, data)
}

export function workspaceDemoteAdmin(uid, wsid) {
    const wsRef = doc(db, "workspace", wsid)
    const data = {
        member: arrayUnion(uid),
        admin: arrayRemove(uid)
    }
    return updateDoc(wsRef, data)
}

export function workspaceRemoveMember(uid, wsid) {
    const wsRef = doc(db, "workspace", wsid)
    const data = {
        member: arrayRemove(uid)
    }
    return updateDoc(wsRef, data)
}

export function updateWorkspace(name, vis, wsid) {
    const wsRef = doc(db, "workspace", wsid)
    const data = {
        name: name,
        visibility: vis
    }
    return updateDoc(wsRef, data)
}