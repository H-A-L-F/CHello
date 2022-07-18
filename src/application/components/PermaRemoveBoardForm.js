import React from 'react'
import { useNavigate } from 'react-router-dom'
import { removeBoard } from '../controllers/boardController'

export default function PermaRemoveBoardForm({bid}) {
    const navigate = useNavigate()

    function handleDelete() {
        removeBoard(bid)
        navigate("/main/home")
    }

    return (
        <div>
            <p>This board will be removed forever, it could not be reopened by the board's admin. Do you still want to proceed?</p>
            <div className="form-control mt-4">
                <button className="btn btn-error" onClick={handleDelete}>Remove</button>
            </div>
        </div>
    )
}
