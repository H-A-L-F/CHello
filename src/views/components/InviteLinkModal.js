import { makeid } from "../../GenerateId"

const InviteLinkModal = ({path}) => {
    const autoId = makeid(20)
    const link = "localhost:3000/invite/join/" + path

    return (
        <div className="form-control w-full">
            <label className="label">
                <span className="label-text">Invite link</span>
            </label>
            <div className="flex flex-row align-middle items-center justify-center flex-none input input-bordered border-primary border-2 w-fit">
                <p className="w-fit text-center h-fit text-primary">{link}</p>
            </div>
        </div>
    )
}

export default InviteLinkModal