import InviteLinkModal from "../components/InviteLinkModal"

const CopyLinkPage = () => {
    return (
        <div class="hero min-h-screen bg-base-300">
            <div class="hero-content flex-col">
                <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                <div class="card-body">
                    {/* <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label- text">Invite link</span>
                        </label>
                        <p className="input input-bordered w-full max-w-xs border-primary">{link}</p>
                    </div> */}
                    <InviteLinkModal />
                </div>
                </div>
            </div>
        </div>
    )
}

export default CopyLinkPage