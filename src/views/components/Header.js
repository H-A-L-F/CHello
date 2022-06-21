import Tag from "./Tag";
import { HiOutlineUsers } from "react-icons/hi";

const Header = ({ ws }) => {
    return (
        <div className="flex flex-row">
            <h1 className="text-3xl font-bold text-primary">{ ws.name }</h1>
            <MemberTag ws={ws}/>
        </div>
    );
}

const MemberTag = ({ ws }) => {
    const memberCount = ws.admin.length
    const text = "Members(" + memberCount +")"

    return (
        <Tag icon={<HiOutlineUsers size={24}/>} text={text}/>
    );
}

export default Header;