import { HiCalendar, HiHome, HiOutlinePlusSm } from "react-icons/hi";

const SideBar = () => {
    return (
        <div className="fixed top-0 left-0 h-screen w-16 m-0 flex flex-col bg-neutral text-neutral-content shadow-lg">
            <SideBarIcon icon={<HiHome size = "28"/>} text="Home" />

            <SideBarIcon icon={<HiOutlinePlusSm size = "32"/>} text="Create Workspace" />

            <Modal sidebar={<SideBarIcon icon={<HiOutlinePlusSm size = "32"/>} text="Create Workspace" />} target="modal-cws"/>
            <ModalContent target="modal-cws"/>

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
        <label for={target} class="modal-button"> {sidebar} </label>
    );
}

const ModalContent = ({ target }) => {
    return (
        <div>
            <input type="checkbox" id={target} class="modal-toggle" />
            <label for={target} class="modal cursor-pointer">
            <label class="modal-box relative" for="">
                <h3 class="text-lg font-bold">Congratulations random Interner user!</h3>
                <p class="py-4">You've been selected for a chance to get one year of subscription to use Wikipedia for free!</p>
            </label>
            </label>
        </div>
    );
}

export default SideBar;