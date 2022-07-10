import React, { useRef } from 'react'
import { updateBoard } from '../controllers/boardController'

export default function ManageBoardForm({b}) {
    const titleRef = useRef()
    let visibility = "public"

    function handleCreateWorkspace() {
        const name = titleRef.current.value
        updateBoard(name, visibility, b.id)
    }

    const handleChange = (v) => {
        visibility = v.target.value
    }

    return (
        <div>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Title</span>
                </label>
                <input ref={titleRef} type="text" placeholder="title" className="input input-bordered" defaultValue={b.name} />
            </div>
            <div className="my-2"></div>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Visibility</span>
                </label>
                <select onChange={handleChange} className="select select-primary w-full max-w-xs">
                    <option defaultChecked>public</option>
                    <option>workspace-visible</option>
                    <option>board-visible</option>
                </select>
            </div>
            <div className="form-control mt-6">
                <button className="btn btn-primary" onClick={handleCreateWorkspace}>Update</button>
            </div>
        </div>
    )
}
