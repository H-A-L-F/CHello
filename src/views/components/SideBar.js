import { HiCalendar, HiHome, HiOutlinePlusSm } from "react-icons/hi";
import { Link } from 'react-router-dom';
import CreateWorkspace from "./CreateWorkspace";
import Modal from "./Modal";
import ModalContent from "./ModalContent";

const SideBar = () => {
    return (
        <div className="fixed top-0 left-0 h-screen w-16 m-0 flex flex-col bg-neutral text-neutral-content shadow-lg">
            <Link to={"/main/home"}>
                <SideBarIcon icon={<HiHome size = "28"/>} text="Home" />
            </Link>

            <Modal body={<SideBarIcon icon={<HiOutlinePlusSm size = "32"/>} text="Create Workspace" />} target="modal-cws"/>
            <ModalContent target="modal-cws" content={<CreateWorkspace />}/>

            <Link to={"/main/workspace"}>
                <SideBarIcon icon={<HiCalendar size = "20"/>} text="Workspace"/>
            </Link>
        </div>
    );
}

const SideBarIcon = ({ icon, text }) => (
    <div className="sidebar-icon group">
        {icon}

        <span className="sidebar-tooltip group-hover:scale-100">
            {text}
        </span>

    </div>
);

export default SideBar;