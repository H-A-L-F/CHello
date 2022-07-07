import { collection, query, where } from "firebase/firestore"
import { db } from "../../firebase"
import { FIRESTORE_FETCH_ERROR, FIRESTORE_FETCH_LOADING } from "../actions/useSnapCollection"
import { useSnapCollection } from "../hooks/useSnapCollection"
import ErrorHolder from "../views/ErrorHolder"
import LoadingHolder from "../views/LoadingHolder"
import SectionPeople from "../views/SectionPeople"

const WorkspaceMember = ({ wsid }) => {
    const workspaceMember = useSnapCollection(query(collection(db, "user"), where("ws_member", "array-contains", wsid)))

    if (workspaceMember.status === FIRESTORE_FETCH_LOADING) {
        return <LoadingHolder />
    }

    if (workspaceMember.status === FIRESTORE_FETCH_ERROR) {
        return <ErrorHolder error={workspaceMember.error.message} />
    }

    return (
        <div>
            <SectionPeople title={"Members"} users={workspaceMember.data} />
        </div>
    )
}

export default WorkspaceMember