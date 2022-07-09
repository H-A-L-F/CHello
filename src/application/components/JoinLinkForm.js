import React from 'react'
import { useState } from 'react'
import { useRef } from 'react'
import { useUserAuth } from '../../AuthContext'
import { getLink, isLink, isValidLink, validateLink } from '../controllers/inviteLinkController'
import { isUserAuth } from '../controllers/userController'
import { userJoinWorkspace } from '../controllers/userWorkspaceController'

export default function JoinLinkForm() {
    const [allowed, setAllowed] = useState(false)
    const linkRef = useRef()
    const {user} = useUserAuth()
    const [document, setDocument] = useState()

    function handleSubmit() {   
        userJoinWorkspace(user.id, document.target)
    }   

    function handleChange(e) {
        const input = linkRef.current.value
        console.log(input)
        console.log(isLink(input))
        if(!isLink(input)) {
            return ;
        }
        const linkId = input.split('/')[2]
        console.log(linkId)
        getLink(linkId).then((data) => {
            const res = { id: data.id, ...data.data() }
            setDocument(res)
            console.log(document)
            if(document.type === "workspace") {
                const isValid = isValidLink(document)
                const isAdmin = isUserAuth(user.ws_admin, document.target)
                console.log(isValid)
                console.log(isAdmin)
                setAllowed(isValid && !isAdmin)
            } else if (data.type === "board") {
                // board logic
            }
        })
    }

    return (
        <div>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Invite link</span>
                </label>
                <input ref={linkRef} type="text" placeholder="link" className="input input-bordered" onChange={handleChange}/>
            </div>
            <div className="form-control mt-6">
                {allowed ? <button className="btn btn-primary" onClick={handleSubmit}>Join</button> : <button className="btn btn-error">Invalid</button>}
            </div>
        </div>
    )
}
