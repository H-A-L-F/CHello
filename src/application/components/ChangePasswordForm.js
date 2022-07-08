import React from 'react'
import { useRef } from 'react'

export default function ChangePasswordForm() {
    const oldPassRef = useRef()
    const newPassRef = useRef()

    function handleSubmit() {
        
    }

    return (
        <div>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Old Password</span>
                </label>
                <input ref={oldPassRef} type="text" placeholder="old password" className="input input-bordered" />
            </div>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">New Password</span>
                </label>
                <input ref={newPassRef} type="text" placeholder="new password" className="input input-bordered" />
            </div>
            <div className="form-control mt-6">
                <button className="btn btn-primary" onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    )
}
