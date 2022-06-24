import InviteLinkModal from "../components/InviteLinkModal"
import { useParams } from "react-router-dom";

const CopyLinkPage = () => {
    const {path} = useParams()

    const currPath = window.atob(path)

    return (
        <div class="hero min-h-screen bg-base-300">
            <div class="hero-content flex-col">
                <div class="card flex-shrink-0 w-full shadow-2xl bg-base-100">
                <div class="card-body">
                    <InviteLinkModal path={path}/>
                </div>
                </div>
            </div>
        </div>
    )
}

export default CopyLinkPage