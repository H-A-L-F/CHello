import { doc, getDoc } from "firebase/firestore"
import { useEffect, useState } from "react"
import { useUserAuth } from "../../AuthContext"
import { db } from "../../firebase"
import SectionWorkspace from "./SectionWorkspace"

const AdminWorkspace = ({ workspaces }) => {
    const [isPending, setIsPending] = useState(true)
    const [adminWorkspaces, setAdminWorkspaces] = useState()

    const { user } = useUserAuth()
    const userDocRef = doc(db, "user", user.uid)
    const currUser = getUserDoc(userDocRef)

    async function getUserDoc(doc) {
        const temp = await getDoc(doc)
        return temp
    }

    function getUserAndWorkspace(workspaces) {
        currUser.then((data) => {
            const admin = data.data().admin
            getAdminWorkspaces({ad: admin, ws: workspaces})
        })
    }

    function getAdminWorkspaces(wsad) {
        const admin = wsad.ad
        wsad.ws.forEach(e => {
            if(admin.includes(e.id)) setAdminWorkspaces(e)
        });
        setIsPending(false)
    }

    useEffect(() => {
        getUserAndWorkspace(workspaces)
    }, [])

    return (
        <div>
            {isPending && <div>Loading...</div> }
            {adminWorkspaces && <SectionWorkspace title={"Admin Workspaces"} workspace={adminWorkspaces} />}
        </div>
    )
}

export default AdminWorkspace