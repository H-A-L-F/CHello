import { onSnapshot } from "firebase/firestore";
import { useEffect, useReducer } from "react";
import { useUserAuth } from "../../AuthContext";
import { firestoreFetchError, firestoreFetchLoading, firestoreFetchSuccess, FIRESTORE_FETCH_IDLE, FIRESTORE_FETCH_LOADING } from "../actions/useSnapCollection";
import reducer from "../reducers/useSnapCollection";

export function useSnapCollection(ref, filterAuth, user) {
    const initialState = {
        status: ref ? FIRESTORE_FETCH_LOADING : FIRESTORE_FETCH_IDLE,
        data: undefined,
        error: undefined,
    }

    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
    dispatch(firestoreFetchLoading);
    return onSnapshot(ref,
        (response) => {
            const data = filterAuth !== undefined ?
                response.docs
                    ? getFilterCollectionData(response, filterAuth, user)
                    : getFilterDocData(response, filterAuth, user)
                :
                response.docs
                    ? getCollectionData(response)
                    : getDocData(response)
            dispatch(firestoreFetchSuccess(data))
        },
        (error) => {
            dispatch(firestoreFetchError(error))    
        }
    );
    }, []);
    
    return state;
}

function getDocData(doc) {
    return doc ? { id: doc.id, ...doc.data() } : null
}

function getCollectionData(collection) {
    return collection.docs.map(getDocData);
}

function getFilterDocData(doc, filterAuth, user) {
    if(doc && user?.length > 0) {
        return filterAuth(user, doc.id) === true ? { id: doc.id, ...doc.data() } : null
    }
    return null
}

function getFilterCollectionData(collection, filterAuth, user) {
    const temp = collection.docs.map((doc) => {return getFilterDocData(doc, filterAuth, user)})
    let res = []
    temp.forEach(element => {
        if(element !== null) res.push(element)
    })
    return res
}

function filterData(hay, pin) {
    return hay.includes(pin)
}