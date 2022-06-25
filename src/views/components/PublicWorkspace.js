import { doc, getDoc } from "firebase/firestore"
import { useEffect } from "react"
import { useState } from "react"
import { useUserAuth } from "../../AuthContext"
import { db } from "../../firebase"
import Loading from "./Loading"
import SectionWorkspace from "./SectionWorkspace"

const PublicWorkspace = ({ workspaces }) => {
    const [isPending, setIsPending] = useState(true)
    const [publicWorkspaces, setPublicWorkspace] = useState([])
    
    const { user } = useUserAuth()
    const userDocRef = doc(db, "user", user.uid)
    const currUser = getUserDoc(userDocRef)
    
    async function getUserDoc(doc) {
        const temp = await getDoc(doc)
        return temp
    }

    function isPublic(ws, currUser) {
        // console.log(!currUser.member.includes(ws.id))
        return ws.public === true && !currUser.admin.includes(ws.id) && !currUser.member.includes(ws.id)
    }

    function getPublicWorkspace(workspaces, currUser) {
        workspaces.forEach(e => {
            if(isPublic(e, currUser)) setPublicWorkspace((prevstate) => [...prevstate, e])
        });
        setIsPending(false)
    }

    useEffect(() => {
        currUser.then((res) => {
            const currUser = {...res.data(), id: res.id}
            getPublicWorkspace(workspaces, currUser)
        })
    }, [])

    console.log(workspaces)

    return (
        <div>
            {isPending && <Loading /> }
            {publicWorkspaces && <SectionWorkspace title={"Public Workspaces"} workspace={publicWorkspaces} />}
        </div>
    )
}

export default PublicWorkspace