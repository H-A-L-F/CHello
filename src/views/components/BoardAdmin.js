import { collection, onSnapshot } from "firebase/firestore"
import { useEffect } from "react"
import { useState } from "react"
import { db } from "../../firebase"
import SectionPeople from "./SectionPeople"

const BoardAdmin = ({users, wsid}) => {
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

export default BoardAdmin