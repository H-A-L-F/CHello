import { HiCalendar, HiHome, HiOutlinePlusSm } from "react-icons/hi";
import CreateWorkspace from "./CreateWorkspace";

const SideBar = () => {
    return (
        <div className="fixed top-0 left-0 h-screen w-16 m-0 flex flex-col bg-neutral text-neutral-content shadow-lg">
            <SideBarIcon icon={<HiHome size = "28"/>} text="Home" />

            <Modal sidebar={<SideBarIcon icon={<HiOutlinePlusSm size = "32"/>} text="Create Workspace" />} target="modal-cws"/>
            <ModalContent target="modal-cws" content={<CreateWorkspace />}/>

            <SideBarIcon icon={<HiCalendar size = "20"/>} text="Workspace"/>

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

const Modal = ({ sidebar, target }) => {
    return (
        <label htmlFor={target} className="modal-button"> {sidebar} </label>
    );
}

const ModalContent = ({ target, content }) => {
    return (
        <div>
            <input type="checkbox" id={target} className="modal-toggle" />
            <label htmlFor={target} className="modal cursor-pointer">
            <label className="modal-box relative">
                {content}
            </label>
            </label>
        </div>
    );
}

export default SideBar;