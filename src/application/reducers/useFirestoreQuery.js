import { FIRESTORE_FETCH_ERROR, FIRESTORE_FETCH_IDLE, FIRESTORE_FETCH_LOADING, FIRESTORE_FETCH_SUCCESS } from "../actions/useFirestoreQuery";

const reducer = (state, action) => {
  switch (action.type) {
    case FIRESTORE_FETCH_IDLE:
      return { status: FIRESTORE_FETCH_IDLE, data: undefined, error: undefined };
    case FIRESTORE_FETCH_LOADING:
      return { status: FIRESTORE_FETCH_LOADING, data: undefined, error: undefined };
    case FIRESTORE_FETCH_SUCCESS:
      return { status: FIRESTORE_FETCH_SUCCESS, data: action.payload, error: undefined };
    case FIRESTORE_FETCH_ERROR:
      return { status: FIRESTORE_FETCH_ERROR, data: undefined, error: action.payload };
    default:
      throw new Error("invalid action");
  }
};

export default reducer