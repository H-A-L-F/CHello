import { doc } from "firebase/firestore"
import { db } from "../../firebase"
import { isUserAdmin, joinWSAdmin } from "./userController"
import { addWorkspaceAdmin, createWorkspace } from "./workspaceController"

export function userCreateWorkspace(uid, workspace) {
    createWorkspace(workspace).then((wsref) => {
        joinWSAdmin(uid, wsref.id)
        addWorkspaceAdmin(uid, wsref.id)
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

export function userFilterAuthWS(user, workspaces) {
    let res = []
    workspaces.forEach(element => {
        console.log()
        if(isUserAdmin(user, element.id)) res.push(element)
    })
    return res
}