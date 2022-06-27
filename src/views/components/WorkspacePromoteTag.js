import { useEffect, useState } from "react";
import { HiOutlineUserAdd } from "react-icons/hi";
import Loading from "./Loading";
import Modal from "./Modal";
import ModalContent from "./ModalContent";
import Tag from "./Tag";
import WorkspacePromoteForm from "./WorkspacePromoteForm";

const WorkspacePromoteTag = ({users, wsid}) => {
    const [isPending, setPending] = useState(true)
    const [members, setMember] = useState([])
    const target = "modal-prm-" + wsid

    function isMember(u) {
        return u.member.includes(wsid)
    }

    useEffect(() => {
        if(users) {
            const temp = users.filter(isMember)
            temp.map((t) => {
                const data = {
                    value: t.email,
                    label: t.email
                }
                setMember((prev) => [...prev, data])
            })
        }
        setPending(false)

    }, [users])

    return(
        <div>
            {isPending ? <Loading /> :
                <div>
                    <Modal body={<Tag icon={<HiOutlineUserAdd size={24}/>} text={"Promote Member"}/>} target={target}/>
                    <ModalContent content={<WorkspacePromoteForm options={members}/>} target={target}/>
                </div>
            }
        </div>
    )
}

export default WorkspacePromoteTag