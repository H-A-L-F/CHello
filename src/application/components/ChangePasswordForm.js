import React from 'react'
import { useRef } from 'react'
import { useUserAuth } from '../../AuthContext'
import { updatePassword } from '../controllers/userController'

export default function ChangePasswordForm() {
    const oldPassRef = useRef()
    const newPassRef = useRef()

    const {user} = useUserAuth()

    function handleSubmit() {
        const oldPass = oldPassRef.current.value
        const newPass = newPassRef.current.value
        if(oldPass === user.password) updatePassword(user.id, newPass)
    }

    return (
        <div>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Old Password</span>
                </label>
                <input ref={oldPassRef} type="text" placeholder="old password" className="input input-bordered input-primary" />
            </div>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">New Password</span>
                </label>
                <input ref={newPassRef} type="text" placeholder="new password" className="input input-bordered input-primary" />
            </div>
            <div className="form-control mt-6">
                <button className="btn btn-primary" onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    )
}
