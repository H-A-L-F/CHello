import PeopleCard from "./PeopleCard"

const SectionPeople = ({title, users}) => {

    function isMappable() {
        return users.length > 1
    }

    // console.log(users[0].username)

    return (
        <div>
            <div className="text-3xl font-bold text-primary">{title}</div>
            <div className="flex flex-row flex-wrap">
                {!isMappable() && <PeopleCard isAdmin={title === "Admins"} content={users[0]}/>}
                {isMappable() && <Content c={users} isAdmin={title === "Admins"}/>}
            </div>
        </div>
    )
}

const Content = ({c, isAdmin}) => {
    return (
        <div>
            {c.map((c) => {
                return <PeopleCard isAdmin={isAdmin} content={c}/>
            })}
        </div>
    )
}

export default SectionPeople