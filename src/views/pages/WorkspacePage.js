import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect } from "react";
import { useState } from "react";
import { db } from "../../firebase";
import WorkspaceCard from "../components/WorkspaceCard";
import { Link } from 'react-router-dom';
import { useUserAuth } from "../../AuthContext";
import SectionWorkspace from "../components/SectionWorkspace";
import PublicWorkspace from "../components/PublicWorkspace";
import AdminWorkspace from "../components/AdminWorkspace";
import MemberWorkspace from "../components/MemberWorkspace";

const WorkspacePage = () => {
    const [isPending, setIsPending] = useState(true)
    const [workspaces, setWorkspace] = useState()

    const workspaceCollectionRef = collection(db, "workspace")

    useEffect(() => {
        const unsub = onSnapshot(workspaceCollectionRef, (data) => {
            setWorkspace(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
            setIsPending(false)
        })

        return unsub
    }, [])

    return (
        <div className="w-[90%] mx-auto flex flex-col space-y-8">
            {isPending && <div>Loading...</div> }
            {workspaces && <SectionWorkspace title={"Workspaces"} workspace={workspaces} />}
            {workspaces && <AdminWorkspace workspaces={workspaces}/>}
            {workspaces && <MemberWorkspace workspaces={workspaces}/>}
            {workspaces && <PublicWorkspace workspaces={workspaces}/>}
        </div>
    );
}

const Header = ({ title }) => {
    return (
        <div className="flex flex-row justify-between w-[50%]">
            <h1 className="text-3xl font-bold text-primary">{ title }</h1>
        </div>
    );
}

const Workspaces = () => {
    const [workspace, setWorkspace] = useState([])

    const workspaceCollectionRef = collection(db, "workspace")

    useEffect(() => {
        const unsub = onSnapshot(workspaceCollectionRef, (data) => {
            setWorkspace(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
        })

        return unsub
    }, [])

    return (
        <div>
            <Header title={"Workspaces"} />
            <div className="my-2"></div>
            <div className="flex flex-wrap space-x-4">
                {workspace.map((ws) => {
                    const workspacePath = window.btoa(ws.path)
                    const link = "/main/workspace/" + workspacePath

                    return (
                        <Link to={link}>
                            <WorkspaceCard title={ws.name} key={ws.id}/>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}

const OwnedWorkspace = () => {
    const [workspaces, setWorkspaces] = useState([])

    const {user} = useUserAuth()
    const workspaceCollectionRef = collection(db, "workspace")
    const q = query(workspaceCollectionRef, where("admin", "array-contains", user.uid))

    useEffect(() => {
        const unsub = onSnapshot(q, (data) => {
            setWorkspaces(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
        })

        return unsub
    }, [])

    return (
        <div>
            <Header title={"Admin Workspaces"} />
            <div className="my-2"></div>
            <div className="flex flex-wrap space-x-4">
                {workspaces.map((ws) => {
                    const workspacePath = window.btoa(ws.path)
                    const link = "/main/workspace/" + workspacePath

                    return (
                        <Link to={link}>
                            <WorkspaceCard title={ws.name} key={ws.id}/>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}

export default WorkspacePage