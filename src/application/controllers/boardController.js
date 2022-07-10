import { addDoc, arrayRemove, arrayUnion, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { constructBoard } from "../models/board";

export function createBoard(data) {
    const boardRef = collection(db, "board")
    return addDoc(boardRef, data)
}

export function addBoardAdmin(uid, bid) {
    const boardRef = doc(db, "board", bid)
    const newField = {
        admin: arrayUnion(uid)
    }
    updateDoc(boardRef, newField)
}

export function addBoardMember(uid, bid) {
    const boardRef = doc(db, "board", bid)
    const newField = {
        member: arrayUnion(uid)
    }
    updateDoc(boardRef, newField)
}

export function getBoardUrl(bid) {
    return "/main/board/" + bid
}

export function closeBoard(bid) {
    const boardRef = doc(db, "board", bid)
    const newField = {
        delete: "closed"
    }
    updateDoc(boardRef, newField)
}

export function boardPromoteUser(uid, bid) {
    const bRef = doc(db, "board", bid)
    const data = {
        member: arrayRemove(uid),
        admin: arrayUnion(uid)
    }
    return updateDoc(bRef, data)
}

export function boardDemoteAdmin(uid, bid) {
    const bRef = doc(db, "board", bid)
    const data = {
        member: arrayUnion(uid),
        admin: arrayRemove(uid)
    }
    return updateDoc(bRef, data)
}

export function boardRemoveMember(uid, bid) {
    const bRef = doc(db, "board", bid)
    const data = {
        member: arrayRemove(uid)
    }
    return updateDoc(bRef, data)
}

export function updateBoard(name, vis, bid) {
    const bRef = doc(db, "board", bid)
    const data = {
        name: name,
        visibility: vis
    }
    return updateDoc(bRef, data)
}