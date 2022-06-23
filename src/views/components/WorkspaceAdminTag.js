import { useEffect, useState } from "react";
import { HiOutlineUser } from "react-icons/hi";
import Modal from "./Modal"
import ModalContent from "./ModalContent";
import Tag from "./Tag"

const WorkspaceAdminTag = ({users, wsid}) => {
    const [isPending, setPending] = useState(true)
    const [admins, setAdmin] = useState()
    const target = "modal-bad-" + wsid

    function isAdmin(u) {
        return u.admin.includes(wsid)
    }

    useEffect(() => {
        if(users) {
            setAdmin(users.filter(isAdmin))
            setPending(false)
        }
    }, [users])

    return (
        <div>
            {isPending && <div>Loading...</div>}
            {!isPending && 
                <div>
                    <Modal body={<Tag icon={<HiOutlineUser size={24}/>} text={"Admins(" + admins.length + ")"}/>} target={target}/>
                    <ModalContent content={<div></div>} target={target}/>
                </div>
            }
        </div>
    )
}

export default WorkspaceAdminTag