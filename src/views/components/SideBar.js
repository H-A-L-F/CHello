import { HiCalendar, HiHome, HiOutlinePlusSm } from "react-icons/hi";

const SideBar = () => {
    return (
        <div className="fixed top-0 left-0 h-screen w-16 m-0 flex flex-col bg-neutral text-neutral-content shadow-lg">
            <SideBarIcon icon={<HiHome size = "28"/>} text="Home" />
            <SideBarIcon icon={<HiOutlinePlusSm size = "32"/>} text="Create Workspace" />
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

export default SideBar;