import { doc, getDoc } from "firebase/firestore"
import { useEffect, useState } from "react"
import { useUserAuth } from "../../AuthContext"
import { db } from "../../firebase"
import Empty from "./Empty"
import Loading from "./Loading"
import SectionWorkspace from "./SectionWorkspace"

const MemberWorkspace = ({workspaces}) => {
    const [isPending, setIsPending] = useState(true)
    const [memberWorkspaces, setMemberWorkspaces] = useState([])

    const { user } = useUserAuth()
    const userDocRef = doc(db, "user", user.uid)
    const currUser = getUserDoc(userDocRef)

    async function getUserDoc(doc) {
        const temp = await getDoc(doc)
        return temp
    }

    function getUserAndWorkspace(workspaces) {
        currUser.then((data) => {
            const currUser = {...data.data(), id: data.id}
            getMemberWorkspaces(currUser, workspaces)
        })
    }

    function getMemberWorkspaces(currUser, workspaces) {
        workspaces.forEach(e => {
            console.log(currUser.member.includes(e.id))
            if(currUser.member.includes(e.id)) setMemberWorkspaces((prevstate) => [...prevstate, e])
        });
        setIsPending(false)
    }

    useEffect(() => {
        getUserAndWorkspace(workspaces)
    }, [])

    return (
        <div>
            {isPending ? <Loading /> :
                memberWorkspaces.length > 0 ? <SectionWorkspace title={"Member Workspaces"} workspace={memberWorkspaces} /> : <EmptySection title={"Member Workspaces"}/>
            }
        </div>
    )
}

const EmptySection = ({title}) => {
    return (
        <div className="flex flex-col">
            <Header title={title} />
            <div className="my-2"></div>
            <Empty/>
        </div>
    )
}

const Header = ({ title }) => {
    return (
        <div className="flex flex-row justify-between w-[50%]">
            <h1 className="text-3xl font-bold text-primary">{ title }</h1>
        </div>
    );
}


export default MemberWorkspace