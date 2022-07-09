import React from 'react'
import { useRef } from 'react'

export default function JoinLinkForm() {
    const linkRef = useRef()

    function handleSubmit() {   
        const link = linkRef.current.value
    }   

    return (
        <div>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Invite link</span>
                </label>
                <input ref={linkRef} type="text" placeholder="link" className="input input-bordered" />
            </div>
            <div className="form-control mt-6">
                <button className="btn btn-primary" onClick={handleSubmit}>Join</button>
            </div>
        </div>
    )
}
