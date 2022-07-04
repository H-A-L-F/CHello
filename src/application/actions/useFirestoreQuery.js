export const FIRESTORE_FETCH_IDLE = '[firestore] idle'
export const FIRESTORE_FETCH_LOADING = '[firestore] loading'
export const FIRESTORE_FETCH_SUCCESS = '[firestore] success'
export const FIRESTORE_FETCH_ERROR = '[firestore] error'

export const firestoreFetchIdle = {
    type: FIRESTORE_FETCH_IDLE
}

export const firestoreFetchLoading = {
    type: FIRESTORE_FETCH_LOADING
}

export const firestoreFetchSuccess = data => ({
    type: FIRESTORE_FETCH_SUCCESS,
    payLoad: data
})

export const firestoreFetchError = error => ({
    type: FIRESTORE_FETCH_ERROR,
    payLoad: error
})