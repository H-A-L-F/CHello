import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";
import { arrayRemove, arrayUnion, collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useEffect } from "react";
import { useState } from "react";
import { auth, db, storage } from "../../firebase";

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
    console.log("addAdmin?")
    updateLocalUser(uid)
    return updateDoc(userDocRef, newField)
}

export function joinWSMember(uid, wsid) {
    const userDocRef = doc(db, "user", uid)
    const newField = {
        ws_member: arrayUnion(wsid)
    }
    return updateDoc(userDocRef, newField)
}

export function isUserAuth(arr, id) {
    return arr.includes(id)
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

export async function uploadProfPic(file, uid, setLoading) {
    const fileRef = ref(storage, uid + ".jpg")

    // setLoading(true)
    const snapshot = await uploadBytes(fileRef, file)
    const photoURL = await getDownloadURL(fileRef)

    const userRef = doc(db, "user", uid)
    const data = {
        photoURL: photoURL
    }
    updateDoc(userRef, data)

    // setLoading(false)
}

export function updateBio(uid, bio) {
    const userRef = doc(db, "user", uid)
    const data = {
        bio: bio
    }
    return updateDoc(userRef, data)
}

export function updateUname(uid, uname) {
    const userRef = doc(db, "user", uid)
    const data = {
        username: uname
    }
    return updateDoc(userRef, data)
}

export function useAuth() {
    const [currUser, setCurrUser] = useState()

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, user => setCurrUser(user))
        return unsub
    }, [])

    return currUser
}

export function updatePassword(uid, pass) {
    const auth = getAuth()
    const user = auth.currentUser
    updatePassword(user, pass)

    const userRef = doc(db, "user", uid)
    const data = {
        password: pass
    }
    return updateDoc(userRef, data)
}

export function updatePrivacy(uid, privacy) {
    const userRef = doc(db, "user", uid)
    const data = {
        privacy: privacy
    }
    return updateDoc(userRef, data)
}

export function updateNotification(uid, notif) {
    const userRef = doc(db, "user", uid)
    const data = {
        notification_frequency: notif
    }
    return updateDoc(userRef, data)
}

export function userPromoteWorkspace(uid, wsid) {
    const userRef = doc(db, "user", uid)
    const data = {
        ws_member: arrayRemove(wsid),
        ws_admin: arrayUnion(wsid)
    }
    return updateDoc(userRef, data)
}

export function userDemoteWorkspace(uid, wsid) {
    const userRef = doc(db, "user", uid)
    const data = {
        ws_member: arrayUnion(wsid),
        ws_admin: arrayRemove(wsid)
    }
    return updateDoc(userRef, data)
}

export function userKickedWorkspace(uid, wsid) {
    const userRef = doc(db, "user", uid)
    const data = {
        ws_member: arrayRemove(wsid)
    }
    return updateDoc(userRef, data)
}

export function userPromoteBoard(uid, bid) {
    const userRef = doc(db, "user", uid)
    const data = {
        b_member: arrayRemove(bid),
        b_admin: arrayUnion(bid)
    }
    return updateDoc(userRef, data)
}

export function userDemoteBoard(uid, bid) {
    const userRef = doc(db, "user", uid)
    const data = {
        b_member: arrayUnion(bid),
        b_admin: arrayRemove(bid)
    }
    return updateDoc(userRef, data)
}

export function userKickedBoard(uid, bid) {
    const userRef = doc(db, "user", uid)
    const data = {
        b_member: arrayRemove(bid)
    }
    return updateDoc(userRef, data)
}

export function joinBMember(uid, bid) {
    const userDocRef = doc(db, "user", uid)
    const newField = {
        b_member: arrayUnion(bid)
    }
    return updateDoc(userDocRef, newField)
}

export function addFavoriteBoard(uid, bid) {
    const userRef = doc(db, "user", uid)
    const newField = {
        fav_board: arrayUnion(bid)
    }
    return updateDoc(userRef, newField)
}

export function removeFavoriteBoard(uid, bid) {
    const userRef = doc(db, "user", uid)
    const newField = {
        fav_board: arrayRemove(bid)
    }
    return updateDoc(userRef, newField)
}