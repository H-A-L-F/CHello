import { collection, documentId, query, where } from 'firebase/firestore';
import React from 'react'
import { db } from '../../firebase';
import { FIRESTORE_FETCH_ERROR, FIRESTORE_FETCH_LOADING } from '../actions/useSnapCollection';
import { useSnapCollection } from '../hooks/useSnapCollection';
import ErrorHolder from '../views/ErrorHolder';
import LoadingHolder from '../views/LoadingHolder';

export default function CardLabelChips({ card }) {
    const cardLabelState = useSnapCollection(query(collection(db, "label"), where("card", "array-contains", card.id)))

    if (cardLabelState.status === FIRESTORE_FETCH_LOADING) return <LoadingHolder />
    if (cardLabelState.status === FIRESTORE_FETCH_ERROR) return <ErrorHolder error={cardLabelState.error} />
    return (
        <div className="flex">
            {cardLabelState.data.map((label) => {
                return (
                    <div
                        key={label.id}
                        className={`h-2 w-10 ${label.color} rounded-md mt-1 ml-3`}
                    ></div>
                );
            })}
        </div>
    )
}
