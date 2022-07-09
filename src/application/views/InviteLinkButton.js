import { HiOutlineLink } from "react-icons/hi";

const InviteLinkButton = () => {
    return (
        <div className="flex flex-row bg-primary rounded-md min-w-[18rem] min-h-[2.5rem] text-primary-content items-center pl-20">
            <div className="text-lg font-bold"><HiOutlineLink size={24} fontWeight={700}/></div>
            <div className="mx-6"></div>
            <h2 className="text-lg font-bold">Invite user via link</h2>
        </div>
    )
}

export default InviteLinkButton