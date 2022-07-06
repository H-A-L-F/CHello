import { doc, getDoc } from "firebase/firestore"
import { useEffect, useState } from "react"
import { useUserAuth } from "../../AuthContext"
import { db } from "../../firebase"
import Empty from "./Empty"
import Loading from "./Loading"
import SectionWorkspace from "./SectionWorkspace"

const AdminWorkspace = ({ workspaces }) => {
    const [isPending, setIsPending] = useState(true)
    const [adminWorkspaces, setAdminWorkspaces] = useState([])

    const { user } = useUserAuth()
    const userDocRef = doc(db, "user", user.id)
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
            if(admin.includes(e.id)) setAdminWorkspaces((prevstate) => [...prevstate, e])
        });
        setIsPending(false)
    }

    useEffect(() => {
        getUserAndWorkspace(workspaces)
    }, [])

    return (
        <div>
            {isPending && <Loading /> }
            {adminWorkspaces.length > 0 ? <SectionWorkspace title={"Admin Workspaces"} workspace={adminWorkspaces}/> : <EmptySection title={"Admin Workspaces"}/>} 
        </div>
    )
}

const EmptySection = ({title}) => {
    return (
        <div className="flex flex-col">
            <Header title={title} />
            <div className="my-2"></div>
            <Empty/>
        </div>
    )
}

const Header = ({ title }) => {
    return (
        <div className="flex flex-row justify-between w-[50%]">
            <h1 className="text-3xl font-bold text-primary">{ title }</h1>
        </div>
    );
}

export default AdminWorkspace