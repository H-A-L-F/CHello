import { useEffect, useState } from "react";
import { HiOutlineUserAdd } from "react-icons/hi";
import Loading from "./Loading";
import Modal from "./Modal"
import ModalContent from "./ModalContent";
import Tag from "./Tag"
import WorkspaceAddMemberForm from "./WorkspaceAddMemberForm";

const WorkspaceAddMemberTag = ({users, wsid, wspath}) => {
    const [isPendingReg, setPendingReg] = useState(true)
    const [isPendingDef, setPendingDef] = useState(true)
    const [registers, setRegister] = useState()
    const [defs, setDef] = useState()

    function isRegister(u) {
        return u.admin.includes(wsid) || u.member.includes(wsid)
    }

    function notRegister(u) {
        return !u.admin.includes(wsid) && !u.member.includes(wsid)
    }

    useEffect(() => {
        if(users) {
            setRegister(users.filter(isRegister))
            setPendingReg(false)
        }
    }, [users])

    useEffect(() => {
        if(users) {
            setDef(users.filter(notRegister))
            setPendingDef(false)
        }
    }, [users])

    return (
        <div>
            {(isPendingReg && isPendingDef) && <Loading />}
            {(!isPendingReg && !isPendingDef) &&
                <div>
                    <Modal body={<Tag icon={<HiOutlineUserAdd size={24}/>} text={"Add Member"}/>} target={"modal-addM"}/>
                    <ModalContent content={<WorkspaceAddMemberForm users={registers} all={defs} wspath={wspath}/>} target={"modal-addM"}/>
                </div>
            }
        </div>
    )
}

export default WorkspaceAddMemberTag