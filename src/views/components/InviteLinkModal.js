import { makeid } from "../../GenerateId"

const InviteLinkModal = () => {
    const autoId = makeid(20)
    const link = "/main/invite/" + autoId

    return (
        <div className="form-control w-full max-w-xs">
            <label className="label">
                <span className="label- text">Invite link</span>
            </label>
            <div className="flex flex-row align-middle items-center justify-center flex-none input input-bordered border-primary border-2">
                <p className="w-full max-w-xs text-center h-fit text-primary">{link}</p>
            </div>
        </div>
    )
}

export default InviteLinkModal