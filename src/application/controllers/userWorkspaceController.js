import { doc } from "firebase/firestore"
import { db } from "../../firebase"
import { joinWSAdmin } from "./userController"

export function createWorkspace(uid, workspace) {
    createWorkspace(workspace).then((wsref) => {
        joinWSAdmin(uid, wsref.id)
    })
}

export function wsInvUserEmail(wsid, uid) {
    const userDocRef = doc(db, "user", uid)
    // email logic
}

export function wsInvUserLink(bid, uid) {
    const userDocRef = doc(db, "user", uid)
    // link logic
}