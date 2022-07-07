import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

export async function updateLocalUser(uid) {
    await getDoc(doc(db, "user", uid)).then((u) => {
        const data = { ...u.data(), id: u.id }
        console.log(data)
        window.localStorage.setItem('user', JSON.stringify(data));
    })
}

export async function getUserDB(uid) {
    const userDocRef = doc(db, "user", uid)
    const res = await getDoc(userDocRef)
    return res
}

export function getUserLocal() {
    return JSON.parse(localStorage.getItem('user'))
}

export function setUserLocal(user) {
    window.localStorage.setItem('user', JSON.stringify(user))
}

export function joinWSAdmin(uid, wsid) {
    const userDocRef = doc(db, "user", uid)
    const newField = {
        ws_admin: arrayUnion(wsid)
    }
    localAddAdminWS(wsid)
    return updateDoc(userDocRef, newField)
}

export function joinWSMember(uid, wsid) {
    const userDocRef = doc(db, "user", uid)
    const newField = {
        ws_member: arrayUnion(wsid)
    }
    return updateDoc(userDocRef, newField)
}

export function isUserAuth(user, id) {
    return user.includes(id)
}

function localAddAdminWS(id) {
    const temp = getUserLocal()
    temp.ws_admin.push(id)
    setUserLocal(temp)
}

export function joinBAdmin(uid, bid) {
    const userRef = doc(db, "user", uid)
    const newField = {
        b_admin: arrayUnion(bid)
    }
    localAddAdminB(bid)
    return updateDoc(userRef, newField)
}

function localAddAdminB(id) {
    const temp = getUserLocal()
    temp.b_admin.push(id)
    setUserLocal(temp)
}