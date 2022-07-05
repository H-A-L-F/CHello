import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";
import { ACTIONS_WS } from "../actions/useWorkspace";


export const reducer = (state, action) => {
    switch (action.type) {
        case ACTIONS_WS.CREATE: 
            createWorkspace(action.payload)
            break
        default:
            return state
    }
}

function createWorkspace(data) {
    const colRef = collection(db, "workspace")
    addDoc(colRef, data)
}