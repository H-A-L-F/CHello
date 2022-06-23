import { useEffect } from "react"
import { useState } from "react"
import SectionWorkspace from "./SectionWorkspace"

const PublicWorkspace = ({ workspaces }) => {
    const [isPending, setIsPending] = useState(true)
    const [publicWorkspaces, setPublicWorkspace] = useState()

    function isPublic(o) {
        return o.public === true
    }

    function getPublicWorkspace(workspaces) {
        setPublicWorkspace(workspaces.filter(isPublic))
        setIsPending(false)
    }

    useEffect(() => {
        getPublicWorkspace(workspaces)
    }, [])

    return (
        <div>
            {isPending && <div>Loading...</div> }
            {publicWorkspaces && <SectionWorkspace title={"Public Workspaces"} workspace={publicWorkspaces} />}
        </div>
    )
}

export default PublicWorkspace