import Empty from "./Empty"
import PeopleCard from "./PeopleCard"

const SectionPeople = ({title, users, currUser, admin, promote, demote}) => {

    function isMappable() {
        return users.length > 1
    }

    return (
        <div>
            <div className="text-3xl font-bold text-primary">{title}</div>
            <div>
                {users.length > 0 ?
                    !isMappable() ? 
                        <PeopleCard 
                            isAdmin={title === "Admins"} 
                            content={users[0]}
                            currUser={currUser}
                            admin={admin} 
                            promote={promote} 
                            demote={demote}/> : 
                        <Content 
                            c={users} 
                            isAdmin={title === "Admins"}/>
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
                return <PeopleCard isAdmin={isAdmin} content={c} key={c.id}/>
            })}
        </div>
    )
}

export default SectionPeople