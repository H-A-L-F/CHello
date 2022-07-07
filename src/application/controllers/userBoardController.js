import { doc } from "firebase/firestore"
import { db } from "../../firebase"
import { addBoardAdmin, createBoard } from "./boardController"
import { joinBAdmin } from "./userController"

export function userCreateBoard(uid, board, invites) {
    createBoard(board).then((bref) => {
        joinBAdmin(uid, bref.id)
        addBoardAdmin(uid, bref.id)
        if(invites)handleInvite(invites, bref.id)
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
