import { useEffect, useState } from "react";
import { HiOutlineUserAdd } from "react-icons/hi";
import Modal from "./Modal"
import ModalContent from "./ModalContent";
import Tag from "./Tag"

const WorkspaceAddMemberTag = ({users, wsid}) => {
    const [isPendingReg, setPendingReg] = useState()
    const [registers, setRegister] = useState()

    function isRegister(u) {
        return (u.admin.includes(wsid) || u.member.includes(wsid))
    }

    useEffect(() => {
        if(users) {
            setRegister(users.filter(isRegister))
            setPendingReg(false)
        }
    }, [users])

    return (
        <div>
            {isPendingReg && <div>Loading...</div>}
            {!isPendingReg && 
                <div>
                    <Modal body={<Tag icon={<HiOutlineUserAdd size={24}/>} text={"Add Member"}/>} target={"modal-addM"}/>
                    <ModalContent content={<div></div>} target={"modal-addM"}/>
                </div>
            }
        </div>
    )
}

export default WorkspaceAddMemberTag