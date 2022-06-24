import PeopleCard from "./PeopleCard"

const SectionPeople = ({title, users}) => {

    function isMappable() {
        return users.length > 1
    }

    return (
        <div>
            <div className="text-3xl font-bold text-primary">{title}</div>
            <div>
                {users.length > 0 ?
                    !isMappable() ? <PeopleCard isAdmin={title === "Admins"} content={users[0]}/> : <Content c={users} isAdmin={title === "Admins"}/>
                    : <Empty />
                }
            </div>
        </div>
    )
}

const Content = ({c, isAdmin}) => {
    return (
        <div className="flex flex-wrap">
            {c.map((c) => {
                return <PeopleCard isAdmin={isAdmin} content={c}/>
            })}
        </div>
    )
}

const Empty = () => {
    return (
        <div className="flex flex-col items-center justify-center align-middle content-center rounded-md bg-primary text-primary-content px-6 py-2">
            <h2 className="text-xl font-bold">Empty</h2>
        </div>
    )
}

export default SectionPeople