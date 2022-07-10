import { addDoc, arrayUnion, collection, doc, updateDoc } from "firebase/firestore";
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