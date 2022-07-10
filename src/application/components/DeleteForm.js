import React from 'react'
import { useNavigate } from 'react-router-dom'
import { deleteWorkspace } from '../controllers/workspaceController'

export default function DeleteForm({data}) {
    const navigate = useNavigate()

    function handleDelete() {
        deleteWorkspace(data.id).then(() => {
            navigate("/main/home")
        })
    }

    return (
        <div>
            <p>Are you sure? This workspace will be removed forever. The boards contained in this workspace are still recoverable by the board admin</p>
            <div className="form-control mt-4">
                <button className="btn btn-error" onClick={handleDelete}>Delete</button>
            </div>
        </div>
    )
}
