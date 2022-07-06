import { Link } from "react-router-dom"
import Empty from "../../views/components/Empty"
import WorkspaceCard from "../../views/components/WorkspaceCard"

const SectionWorkspace = ({ workspace, title }) => {

    function isObject(workspace) {
        return workspace.length == null
    }

    // console.log(workspace)

    return (
        <div>
            <Header title={title} />
            <div className="my-2"></div>
            <div className="flex flex-wrap">
                {workspace.length === 0 && <Empty />}
                {isObject(workspace) && <SingleSection ws={workspace}/>}
                {!isObject(workspace) && workspace.map((ws) => {
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

const SingleSection = ({ ws }) => {
    const workspacePath = window.btoa(ws.path)
    const link = "/main/workspace/" + workspacePath

    return (
        <Link to={link} key={ws.id}>
            <WorkspaceCard title={ws.name} key={ws.id}/>
        </Link>
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