import { doc } from "firebase/firestore"
import { db } from "../../firebase"
import { addBoardAdmin, addBoardMember, boardDemoteAdmin, boardPromoteUser, boardRemoveMember, closeBoard, createBoard } from "./boardController"
import { isUserAuth, joinBAdmin, joinBMember, userDemoteBoard, userKickedBoard, userPromoteBoard } from "./userController"

export function userCreateBoard(uid, board, invites) {
    createBoard(board).then((bref) => {
        joinBAdmin(uid, bref.id)
        addBoardAdmin(uid, bref.id)
        if (invites) handleInvite(invites, bref.id)
    })
}

function handleInvite(selecteds, bid) {
    selecteds.forEach(element => {
        bInvUserEmail(bid, element.value)
    });
}

export function bInvUserEmail(bid, email) {
    console.log("inv email: " + bid + " + " + email)
    // email logic
}

export function bInvUserLink(bid, uid) {
    const userDocRef = doc(db, "user", uid)
    // link logic
}

export function userAllowedBoard(user, bid) {
    return user.b_admin.includes(bid) || user.b_member.includes(bid)
}

export function userJoinBoard(uid, wsid) {
    joinBMember(uid, wsid)
    addBoardMember(uid, wsid)
}


export function promoteUserBoard(uid, bid) {
    userPromoteBoard(uid, bid)
    boardPromoteUser(uid, bid)
}

export function demoteUserBoard(uid, bid) {
    userDemoteBoard(uid, bid)
    boardDemoteAdmin(uid, bid)
}

export function removeUserBoard(uid, bid) {
    userKickedBoard(uid, bid)
    boardRemoveMember(uid, bid)
}

export function closeBoardFromAllUser(bid) {
    // harusnya ada sesuatu
    return closeBoard(bid)
}

export function getUserBoardRole(user, board) {
    const isAdmin = isUserAuth(user.b_admin, board.id)
    const isMember = isUserAuth(user.b_member, board.id)
    if(isAdmin) return "Admin"
    if(isMember) return "Member"
    return ""
}