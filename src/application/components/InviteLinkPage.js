import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { createInviteLink, generateLink } from '../controllers/inviteLinkController'
import { constructInviteLink } from '../models/inviteLink'
import InviteLinkModal from '../views/InviteLinkModal'

export default function InviteLinkPage({ type }) {
    const [isPendingLink, setPendingLink] = useState(true)
    const [link, setLink] = useState("")

    const { id } = useParams()

    useEffect(() => {
        const data = constructInviteLink(type, id)
        createInviteLink(data).then((ref) => {
            setLink(generateLink(ref.id))
            setPendingLink(false)
        })

    }, [])

    return (
        <div className="hero min-h-screen bg-base-300">
            <div className="hero-content flex-col">
                <div className="card flex-shrink-0 w-full shadow-2xl bg-base-100">
                    <div className="card-body">
                        <InviteLinkModal path={isPendingLink ? "Loading..." : link} />
                    </div>
                </div>
            </div>
        </div>
    )
}
