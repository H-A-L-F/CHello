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
                            isAdmin={title === "Admins"}
                            currUser={currUser}
                            admin={admin} 
                            promote={promote} 
                            demote={demote}/>
                    : <Empty />
                }
            </div>
        </div>
    )
}

const Content = ({c, isAdmin, currUser, admin, promote, demote}) => {
    return (
        <div className="flex flex-wrap">
            {c.map((c) => {
                return <PeopleCard 
                    currUser={currUser} 
                    isAdmin={isAdmin} 
                    content={c} 
                    key={c.id}
                    admin={admin} 
                    promote={promote} 
                    demote={demote}/>
            })}
        </div>
    )
}

export default SectionPeople