import { collection } from "firebase/firestore";
import React from "react";
import { FIRESTORE_FETCH_ERROR, FIRESTORE_FETCH_LOADING } from "../../application/actions/useFirestoreQuery";
import useFirestoreQuery from "../../application/hooks/useFirestoreQuery";
import { db } from "../../firebase";
import WorkspaceCard from "../components/WorkspaceCard";

export default function Boards() {
  const { data, status, error } = useFirestoreQuery(
    collection(db, "workspace")
  );

  if (status === FIRESTORE_FETCH_LOADING) {
    return "Loading...";
  }

  if (status === FIRESTORE_FETCH_ERROR) {
    return `Error: ${error.message}`;
  }

  return (
    <div>
        {data.map((ws) => {
            return <WorkspaceCard title={ws.name} key={ws.id}/>
        })}
    </div>
  );
}
