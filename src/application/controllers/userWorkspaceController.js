import { collection, doc, query, where } from "firebase/firestore"
import { db } from "../../firebase"
import { useSnapCollection } from "../hooks/useSnapCollection"
import { isUserAuth, joinWSAdmin, joinWSMember, userDemoteWorkspace, userKickedWorkspace, userPromoteWorkspace } from "./userController"
import { addWorkspaceAdmin, addWorkspaceMember, createWorkspace, deleteWorkspace, workspaceDemoteAdmin, workspacePromoteUser, workspaceRemoveMember } from "./workspaceController"

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
        if(isUserAuth(user, element.id)) res.push(element)
    })
    return res
}

export function userAllowedWorkspace(user, wsid) {
    return user.ws_admin.includes(wsid) || user.ws_member.includes(wsid)
}

export function userJoinWorkspace(uid, wsid) {
    joinWSMember(uid, wsid)
    addWorkspaceMember(uid, wsid)
}

export function promoteUserWorkspace(uid, wsid) {
    userPromoteWorkspace(uid, wsid)
    workspacePromoteUser(uid, wsid)
}

export function demoteUserWorkspace(uid, wsid) {
    userDemoteWorkspace(uid, wsid)
    workspaceDemoteAdmin(uid, wsid)
}

export function removeUserWorkspace(uid, wsid) {
    userKickedWorkspace(uid, wsid)
    workspaceRemoveMember(uid, wsid)
}