import { Link } from "react-router-dom"
import WorkspaceCard from "./WorkspaceCard"

const SectionWorkspace = ({ workspace, title }) => {

    return (
        <div>
            <Header title={title} />
            <div className="my-2"></div>
            <div className="flex flex-wrap space-x-4">
                {workspace.map((ws) => {
                    const workspacePath = window.btoa(ws.path)
                    const link = "/main/workspace/" + workspacePath

                    return (
                        <Link to={link} key={ws.id}>
                            <WorkspaceCard title={ws.name} key={ws.id}/>
                        </Link>
                    );
                })}
            </div>
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

export default SectionWorkspace