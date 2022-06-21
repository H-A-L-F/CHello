import Tag from "./Tag";
import { HiOutlineUsers } from "react-icons/hi";
import Modal from "./Modal";
import ModalContent from "./ModalContent";

const Header = ({ ws }) => {
    return (
        <div className="flex flex-row justify-between w-[50%]">
            <h1 className="text-3xl font-bold text-primary">{ ws.name }</h1>
            <MemberTag ws={ws}/>
        </div>
    );
}

const MemberTag = ({ ws }) => {
    const memberCount = ws.admin.length
    const text = "Members(" + memberCount +")"

    return (
        <div>
            <Modal body={<Tag icon={<HiOutlineUsers size={24}/>} text={text}/>} target="modal-mem"/>
            <ModalContent />
        </div>
    );
}

export default Header;