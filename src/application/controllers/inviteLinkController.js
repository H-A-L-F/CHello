import { data } from "autoprefixer";
import { addDoc, collection, doc, getDoc, Timestamp } from "firebase/firestore";
import { db } from "../../firebase";

let LINK = "invite/join/"

export function createInviteLink(data) {
    const ref = collection(db, "link")
    return addDoc(ref, data)
}

export function generateLink(id) {
    return LINK + id
}

export function getLink(id) {
    const linkRef = doc(db, "link", id)
    return getDoc(linkRef)
}

export async function isValidLink(link) {
    return Timestamp.now().seconds - link.created.seconds < 86400
}

export function isLink(link) {
    const arr = link.split('/')
    if(arr.length !== 3) return false
    arr.pop()
    const compare = LINK.split('/')
    compare.pop()
    return JSON.stringify(arr) === JSON.stringify(compare)
}