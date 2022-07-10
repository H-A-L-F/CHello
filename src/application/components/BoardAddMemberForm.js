import { collection } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { db } from '../../firebase'
import { FIRESTORE_FETCH_SUCCESS } from '../actions/useSnapCollection'
import { isUserAuth } from '../controllers/userController'
import { useSnapCollection } from '../hooks/useSnapCollection'
import InviteLinkButton from '../views/InviteLinkButton'
import Select from 'react-select';
import { generateOptions } from '../modules/convertForSelect'

export default function BoardAddMemberForm({ bid }) {
    const userState = useSnapCollection(collection(db, "user"))
    const [selecteds, setSelected] = useState()
    const notRegist = []

    const link = "/invite/board/copylink/" + bid

    useEffect(() => {
        if (userState.status === FIRESTORE_FETCH_SUCCESS) {
            populateNotRegist(userState.data)
        }
    }, [userState])

    function populateNotRegist(datas) {
        datas.forEach(e => {
            if (!isUserAuth(e.b_admin, bid) && !isUserAuth(e.b_member, bid)) notRegist.push(e)
        });
    }

    function handleChange(options) {
        setSelected(options)
    }

    return (
        <div>
            <Link to={link}>
                <InviteLinkButton />
            </Link>
            <div className="divider">OR</div>
            <div className="h-28">
                <Select
                    value={selecteds}
                    onChange={handleChange}
                    options={generateOptions(notRegist)}
                    isMulti={true}
                />
            </div>
            <SubmitButton />
        </div>
    )
}

const SubmitButton = () => {
    return (
        <div className='flex flex-row bg-primary rounded-md min-w-[18rem] min-h-[2.5rem] text-primary-content items-center justify-center'>
            <h2 className="text-lg font-bold">Send Invite</h2>
        </div>
    )
}
