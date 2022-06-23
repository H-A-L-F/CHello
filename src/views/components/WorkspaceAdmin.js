import { useEffect } from "react"
import { useState } from "react"
import SectionPeople from "./SectionPeople"

const WorkspaceAdmin = ({users, wsid}) => {
    const [isPending, setPending] = useState(true)
    const [admins, setAdmin] = useState()

    function isAdmin(u) {
        // console.log('u: ', u.admin)
        // console.log(wsid)
        return u.admin.includes(wsid)
    }

    useEffect(() => {
        if(users) {
            // console.log(users)
            setAdmin(users.filter(isAdmin))
            setPending(false)
        }
    }, [users])

    return (
        <div>
            {!isPending && <SectionPeople title={"Admins"} users={admins}/>}
        </div>
    )
}

export default WorkspaceAdmin