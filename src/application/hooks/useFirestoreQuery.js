import { useEffect, useReducer } from "react";
import reducer from "../reducers/useFirestoreQuery";
import useMemoCompare from "./useMemoCompare";
import { collection, onSnapshot } from "firebase/firestore"
import { firestoreFetchError, firestoreFetchIdle, firestoreFetchLoading, firestoreFetchSuccess, FIRESTORE_FETCH_IDLE, FIRESTORE_FETCH_LOADING } from "../actions/useFirestoreQuery";

function useFirestoreQuery(query) {
  const initialState = {
    status: query ? FIRESTORE_FETCH_LOADING : FIRESTORE_FETCH_IDLE,
    data: undefined,
    error: undefined,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const queryCached = useMemoCompare(query, (prevQuery) => {
    return prevQuery && query && query === prevQuery;
  });

  useEffect(() => {
    if (!queryCached) {
      dispatch(firestoreFetchIdle);
      return;
    }

    dispatch(firestoreFetchLoading);

    return onSnapshot(queryCached,
      (response) => {
        const data = response.docs
          ? getCollectionData(response)
          : getDocData(response);
        dispatch(firestoreFetchSuccess(data));
      },
      (error) => {
        dispatch(firestoreFetchError(error));
      }
    );
  }, [queryCached]);

  return state;
}

function getDocData(doc) {
  return doc.exists === true ? { id: doc.id, ...doc.data() } : null;
}

function getCollectionData(collection) {
  return collection.docs.map(getDocData);
}

export default useFirestoreQuery