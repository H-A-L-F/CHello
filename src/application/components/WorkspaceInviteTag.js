import { collection, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { HiOutlineUserAdd } from "react-icons/hi";
import { db } from "../../firebase";
import { useSnapCollection } from "../hooks/useSnapCollection";
import Modal from "../views/Modal";
import ModalContent from "../views/ModalContent";
import Tag from "../views/Tag";
import WorkspaceAddMemberForm from "./WorkspaceAddMemberForm";

const WorkspaceInviteTag = ({ wsid }) => {
    const defState = useSnapCollection(collection(db, "user"), where("ws_member", "not-in"))

    return (
        <div>
            <div>
                <Modal body={<Tag icon={<HiOutlineUserAdd size={24} />} text={"Add Member"} />} target={"modal-addM"} />
                <ModalContent content={<WorkspaceAddMemberForm wsid={wsid}/>} target={"modal-addM"}/>
            </div>
        </div>
    )
}

export default WorkspaceInviteTag