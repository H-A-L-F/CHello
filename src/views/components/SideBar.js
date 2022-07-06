import { HiCalendar, HiHome, HiOutlinePlusSm, HiOutlineUser, HiOutlineLogin, HiOutlineLogout, HiOutlineClipboardCopy, HiCollection } from "react-icons/hi";
import { Link, useNavigate } from 'react-router-dom';
import CreateWorkspaceForm from "../../application/components/CreateWorkspaceForm";
import { useUserAuth } from "../../AuthContext";
import CreateWorkspace from "./CreateWorkspace";
import Modal from "./Modal";
import ModalContent from "./ModalContent";

const SideBar = () => {
    const { user, logout } = useUserAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
            .then(() => {
                navigate("/login")
            })
            .catch((e) => {
                console.log(e)
            })
    }

    return (
        <div className="fixed top-0 left-0 h-screen w-16 m-0 flex flex-col bg-neutral text-neutral-content shadow-lg">
            <Link to={"/main/home"}>
                <SideBarIcon icon={<HiHome size = "28"/>} text="Home" />
            </Link>

            {user ? <SideBarIcon icon={<HiOutlineUser size={20}/>} text={user.displayName}/> : <UserSideBarIcon />}
            <div onClick={handleLogout}>
                <SideBarIcon icon={<HiOutlineLogout size = "20"/>} text="Logout"/>
            </div>

            <Modal body={<SideBarIcon icon={<HiOutlinePlusSm size = "32"/>} text="Create Workspace" />} target="modal-cws"/>
            <ModalContent target="modal-cws" content={<CreateWorkspace />}/>

            <Link to={"/main/workspace"}>
                <SideBarIcon icon={<HiCalendar size = "20"/>} text="Workspace"/>
            </Link>

            <Link to={"/main/board"}>
                <SideBarIcon icon={<HiCollection size = "20"/>} text="Board"/>
            </Link>

            <Modal body={<SideBarIcon icon={<HiOutlinePlusSm size = "32"/>} text="Create Workspace Form" />} target="modal-cwsf"/>
            <ModalContent target="modal-cwsf" content={<CreateWorkspaceForm />}/>

            <Link to={"/main/testhome"}>
                <SideBarIcon icon={<HiHome size = "28"/>} text="Home" />
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
)

const UserSideBarIcon = () => {
    return (
        <div>
            <Link to={"/main/workspace"}>
                <SideBarIcon icon={<HiOutlineClipboardCopy size = "20"/>} text="Register"/>
            </Link>
            <Link to={"/main/workspace"}>
                <SideBarIcon icon={<HiOutlineLogin size = "20"/>} text="Login"/>
            </Link>
        </div>
    );
}

export default SideBar;