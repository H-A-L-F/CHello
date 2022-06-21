import { collection, onSnapshot } from "firebase/firestore";
import { useEffect } from "react";
import { useState } from "react";
import { db } from "../../firebase";
import WorkspaceCard from "../components/WorkspaceCard";
import { Link } from 'react-router-dom';

const WorkspacePage = () => {
    const [workspace, setWorkspace] = useState([])

    const workspaceCollectionRef = collection(db, "workspace")

    useEffect(() => {
        const unsub = onSnapshot(workspaceCollectionRef, (data) => {
            setWorkspace(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
        })

        return unsub
    }, [])

    return (
        <div className="w-[90%] mx-auto">
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

const Header = ({ title }) => {
    return (
        <div className="flex flex-row justify-between w-[50%]">
            <h1 className="text-3xl font-bold text-primary">{ title }</h1>
        </div>
    );
}

export default WorkspacePage