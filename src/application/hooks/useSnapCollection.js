import { onSnapshot } from "firebase/firestore";
import { useEffect, useReducer } from "react";
import { firestoreFetchError, firestoreFetchLoading, firestoreFetchSuccess, FIRESTORE_FETCH_IDLE, FIRESTORE_FETCH_LOADING } from "../actions/useSnapCollection";
import reducer from "../reducers/useSnapCollection";

export function useSnapCollection(ref, filterAuth) {
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
            const data = response.docs
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
    return doc ? { id: doc.id, ...doc.data() } : null;
}

function getCollectionData(collection) {
    return collection.docs.map(getDocData);
}