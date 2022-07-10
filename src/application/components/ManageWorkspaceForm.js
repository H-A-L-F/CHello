import React, { useRef, useState } from 'react'
import { useUserAuth } from '../../AuthContext'
import { updateWorkspace } from '../controllers/workspaceController'

export default function ManageWorkspaceForm({ws}) {
  const { user } = useUserAuth()

  const titleRef = useRef()
  const [visibility, setVisibility] = useState(ws.visibility)

  function handleCreateWorkspace() {
    const name = titleRef.current.value
    updateWorkspace(name, visibility, ws.id)
  }

  function handleChangeCheckbox(e) {
    setVisibility(!visibility)
  }

  return (
    <div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Title</span>
        </label>
        <input ref={titleRef} type="text" placeholder="title" className="input input-bordered" defaultValue={ws.name} />
      </div>
      <div className="my-2"></div>
      <div className="form-control">
        <label className="label cursor-pointer">
          <span className="label-text">Public</span>
          <input type="checkbox" className="toggle toggle-primary" defaultChecked={ws.visibility} onChange={handleChangeCheckbox} />
        </label>
      </div>
      <div className="form-control mt-6">
        <button className="btn btn-primary" onClick={handleCreateWorkspace}>Update</button>
      </div>
    </div>
  )
}
