import { useEffect, useState } from "react";
import { HiOutlineUser } from "react-icons/hi";
import Modal from "./Modal"
import ModalContent from "./ModalContent";
import Tag from "./Tag"

const WorkspaceMemberTag = ({users, wsid}) => {
    const [isPending, setPending] = useState(true)
    const [members, setMembers] = useState()
    const target = "modal-bad-" + wsid

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
            {isPending && <div>Loading...</div>}
            {!isPending && 
                <div>
                    <Modal body={<Tag icon={<HiOutlineUser size={24}/>} text={"Members(" + members.length + ")"}/>} target={target}/>
                    <ModalContent content={<div></div>} target={target}/>
                </div>
            }
        </div>
    )
}

export default WorkspaceMemberTag