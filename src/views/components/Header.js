import Tag from "./Tag";
import { HiOutlineUsers } from "react-icons/hi";
import Modal from "./Modal";
import ModalContent from "./ModalContent";
import AdminForm from "./AdminForm";

const Header = ({ ws }) => {
    return (
        <div className="flex flex-row justify-between w-[50%]">
            <h1 className="text-3xl font-bold text-primary">{ ws.name }</h1>
            <AdminTag ws={ws}/>
        </div>
    );
}

const AdminTag = ({ ws }) => {
    const target = "modal-adm-" + ws.id

    return (
        <div>
            <Modal body={<Tag icon={<HiOutlineUsers size={24}/>} text={"temp"}/>} target={target}/>
            <ModalContent content={<AdminForm ws={ws}/>} target={target}/>
        </div>
    );
}

export default Header;