import { collection, onSnapshot } from "firebase/firestore"
import { useEffect } from "react"
import { useState } from "react"
import { db } from "../../firebase"
import SectionPeople from "./SectionPeople"

const WorkspaceMember = ({users, wsid}) => {
    const [isPending, setPending] = useState(true)
    const [members, setMembers] = useState()

    function isMember(u) {
        return u.member.includes(wsid)
    }

    useEffect(() => {
        if(users) {
            setMembers(users.filter(isMember))
            setPending(false)
        }
    }, [users])

    return (
        <div>
            {!isPending && <SectionPeople title={"Members"} users={members}/>}
        </div>
    )
}

export default WorkspaceMember