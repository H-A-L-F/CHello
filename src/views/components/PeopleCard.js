const PeopleCard = ({isAdmin, content}) => {
    const type = isAdmin ? "badge-info" : "badge-success"
    const auth = isAdmin ? "Admin" : "Member"

    return (
        <div className="flex flex-col rounded-md w-52 h-24 bg-primary text-primary-content px-4 py-2 relative">
                <div className="my-1"></div>
                <h2 className="text-lg font-bold truncate">{content.username}</h2>
                <p className="text-md font-normal truncate">{content.email}</p>
                <div className={"badge gap-2 absolute right-2 " + type}>
                    {auth}
                </div>
        </div>
    )
}

export default PeopleCard