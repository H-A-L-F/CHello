import { collection, query, where } from "firebase/firestore"
import { db } from "../../firebase"
import { FIRESTORE_FETCH_ERROR, FIRESTORE_FETCH_LOADING } from "../actions/useSnapCollection"
import { isUserAuth } from "../controllers/userController"
import { demoteUserWorkspace, promoteUserWorkspace } from "../controllers/userWorkspaceController"
import { useSnapCollection } from "../hooks/useSnapCollection"
import ErrorHolder from "../views/ErrorHolder"
import LoadingHolder from "../views/LoadingHolder"
import SectionPeople from "../views/SectionPeople"

const WorkspaceAdmin = ({ wsid, user }) => {
    const workspaceAdmin = useSnapCollection(query(collection(db, "user"), where("ws_admin", "array-contains", wsid)))

    if (workspaceAdmin.status === FIRESTORE_FETCH_LOADING) {
        return <LoadingHolder />
    }

    if (workspaceAdmin.status === FIRESTORE_FETCH_ERROR) {
        return <ErrorHolder error={workspaceAdmin.error.message} />
    }

    return (
        <div>
            <SectionPeople 
                title={"Admins"} 
                users={workspaceAdmin.data} 
                currUser={user} 
                admin={isUserAuth(user.ws_admin, wsid)} 
                promote={promoteUserWorkspace} 
                demote={demoteUserWorkspace}/>
        </div>
    )
}

export default WorkspaceAdmin