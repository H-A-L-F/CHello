import React from 'react'
import ErrorHolder from '../views/ErrorHolder';
import LoadingHolder from '../views/LoadingHolder';

export default function StatefulComponent({ state, loading, error, content }) {

    if (state.status === loading) {
        return <LoadingHolder />
    }

    if (state.status === error) {
        return <ErrorHolder error={state.error.message}/>
    }

    return (
        content
    )
}
