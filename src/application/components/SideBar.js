import { HiOutlineViewBoards, HiHome, HiOutlinePlusSm, HiOutlineUser, HiOutlineLogin, HiOutlineLogout, HiOutlineClipboardCopy, HiOutlineUsers } from "react-icons/hi";
import { Link, useNavigate } from 'react-router-dom';
import { useUserAuth } from "../../AuthContext";
import Modal from "../views/Modal";
import ModalContent from "../views/ModalContent";
import CreateWorkspaceForm from "./CreateWorkspaceForm";
import JoinLinkForm from "./JoinLinkForm";

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

            {user ? 
            <SideBarIcon 
                icon={<Link to={"/main/profile"}><HiOutlineUser size={20}/></Link>} 
                text={user.username}/> : 
            <UserSideBarIcon />}

            <div onClick={handleLogout}>
                <SideBarIcon icon={<HiOutlineLogout size = "20"/>} text="Logout"/>
            </div>

            <Modal body={<SideBarIcon icon={<HiOutlinePlusSm size = "32"/>} text="Create Workspace Form" />} target="modal-cwsf"/>
            <ModalContent target="modal-cwsf" content={<CreateWorkspaceForm />}/>

            <Modal body={<SideBarIcon icon={<HiOutlineUsers size = "32"/>} text="Join via link" />} target="modal-jl"/>
            <ModalContent target="modal-jl" content={<JoinLinkForm />}/>

            <Modal body={<SideBarIcon icon={<HiOutlineViewBoards size = "32"/>} text="Boards" />} target="modal-bjl"/>
            <ModalContent target="modal-bjl" content={<JoinLinkForm />}/>
        </div>
    );
}

const SideBarIcon = ({ icon, text }) => (
    <div className="sidebar-icon group cursor-pointer">
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