import { useParams } from "react-router-dom"

const AcceptInvitePage = () => {
    const {path} = useParams()

    const currPath = window.atob(path)

    function getRefPath(path) {
        let refPath = ""
        let strs = path.split("/")
        for (let i = 0; i < strs.length - 1; i++) {
            refPath += strs[i] + "/"
        }
        let uid = strs[strs.length-1]
        return {ref: refPath, uid: uid}
    }

    console.log(getRefPath(currPath))

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content text-center">
                <div className="max-w-md">
                    <h1 className="text-5xl font-bold">Hello there</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    <button className="btn btn-primary">Accept Invite</button>
                </div>
            </div>
        </div>
    )
}

export default AcceptInvitePage