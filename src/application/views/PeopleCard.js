import { HiChevronDoubleUp, HiChevronDoubleDown } from "react-icons/hi";
import { useParams } from "react-router-dom";

const PeopleCard = ({ isAdmin, content, currUser, admin, promote, demote }) => {
    const type = isAdmin ? "badge-info" : "badge-success"
    const auth = isAdmin ? "Admin" : "Member"

    const {id} = useParams()

    function isCurrUser() {
        return currUser.id === content.id
    }

    function handlePromote() {
        promote(content.id, id)
    }

    function handleDemote() {
        demote(content.id, id)
    }

    return (
        <div className="flex flex-col rounded-md w-52 h-24 bg-primary text-primary-content px-4 py-2 relative mr-4">
            <div className="my-1"></div>
            <h2 className="text-lg font-bold truncate">{content.username}</h2>
            <p className="text-md font-normal truncate">{content.email}</p>
            <div className={"badge gap-2 absolute right-2 " + type}>
                {auth}
            </div>
            {admin && !isCurrUser() && <GrantRevoke promote={handlePromote} demote={handleDemote}/>}
        </div>
    )
}

const GrantRevoke = ({ promote, demote }) => {
    return (
        <div className="flex flex-row absolute bottom-2 right-2">
            <div className="bg-success mr-2 px-1 py-1 rounded-full text-base-300 cursor-pointer" onClick={promote}> 
                <HiChevronDoubleUp size={20}/>
            </div>
            <div className="bg-error px-1 py-1 rounded-full text-base-300 cursor-pointer" onClick={demote}>
                <HiChevronDoubleDown size={20}/>
            </div>
        </div>
    )
}

export default PeopleCard