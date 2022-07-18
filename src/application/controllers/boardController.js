import { addDoc, arrayRemove, arrayUnion, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { constructBoard } from "../models/board";
import { isUserAuth } from "./userController";

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
    return updateDoc(boardRef, newField)
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

export function authorizeUserForBoard(user, board, ws) {
    switch (board.visibility) {
        case "public": {
            return true
        }
        case "workspace-visible": {
            const isAdmin = isUserAuth(user.ws_admin, ws.id)
            const isMember = isUserAuth(user.ws_member, ws.id)
            return isAdmin || isMember
        }
        case "board-visible": {
            const isAdmin = isUserAuth(board.admin, user.id)
            const isMember = isUserAuth(board.member, user.id)
            return isAdmin || isMember
        }
        default: {
            return false
        }
    }
}

export function isClosedBoard(board) {
    return board.delete === "closed"
}

export function removeBoard(bid) {
    const bRef = doc(db, "board", bid)
    const data = {
        delete: "removed"
    }
    return updateDoc(bRef, data)
}