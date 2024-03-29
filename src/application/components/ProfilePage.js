import React from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useUserAuth } from '../../AuthContext'
import { updateBio, updateNotification, updatePrivacy, updateUname, uploadProfPic, useAuth } from '../controllers/userController'
import Modal from '../views/Modal'
import ModalContent from '../views/ModalContent'
import ChangePasswordForm from './ChangePasswordForm'

export default function ProfilePage() {
  const { user } = useUserAuth()
  const [photo, setPhoto] = useState()
  const [photoURL, setPhotoURL] = useState("https://placeimg.com/192/192/people")

  const unameRef = useRef()
  const bioRef = useRef()
  const privRef = useRef()
  const notifRef = useRef()

  useEffect(() => {
    if (user?.photoURL) {
      setPhotoURL(user.photoURL)
    }
  }, [user])

  function handleSubmit() {
    const uname = unameRef.current.value
    const bio = bioRef.current.value
    const priv = privRef.current.value === "on" ? "private" : "public"
    const notif = notifRef.current.value
    if (uname) updateUname(user.id, uname)
    if (bio) updateBio(user.id, bio)
    if (priv) updatePrivacy(user.id, priv)
    if (notif) updateNotification(user.id, notif)
    uploadProfPic(photo, user.id)
  }

  function handleChange(e) {
    if (e.target.files[0]) {
      setPhoto(e.target.files[0])
    }
  }

  return (
    <div className='w-[40%] ml-[10%] mr-auto my-auto flex flex-col bg-base-300 px-8 py-12 rounded-md'>
      <div className='flex flex-row align-middle items-center '>
        <div className="avatar flex flex-col items-center">
          <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img src={photoURL} alt={"profpic"} />
          </div>
          <label className="cursor-pointer mt-4 w-28">
            <span className="mt-2 leading-normal px-4 py-2 bg-primary text-primary-content text-sm rounded-full" >Select Avatar</span>
            <input type='file' className="hidden" multiple={false} accept="accept" onChange={handleChange} />
          </label>
          {/* <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 relative bg-base-300 bg-opacity-75 text-center">
            <h1 className='mt-8 text-primary font-medium opacity-100'>Change</h1>
          </div> */}
        </div>
        <input className='text-5xl font-semibold text-primary h-fit ml-8 bg-transparent border-none max-w-[60%]' ref={unameRef} defaultValue={user.username} />
      </div>
      <div className='my-4'></div>
      <label>Biodata</label>
      <textarea className="textarea textarea-primary max-w-[100%] h-28 text-primary" ref={bioRef} placeholder="Bio" defaultValue={user.bio}></textarea>
      <div className='my-2'></div>
      <Modal body={<div className="link link-primary">Change Password</div>} target={"cp-m"} />
      <div className='my-2'></div>
      <div className="form-control">
        <label className="label cursor-pointer">
          <span className="label-text">Privacy</span>
          <input ref={privRef} type="checkbox" className="toggle toggle-primary" defaultChecked={true} />
        </label>
      </div>
      <div className='my-2'></div>
      <label>Notification frequency</label>
      <select ref={notifRef} className="select select-primary w-full max-w-xs mt-2">
        <option defaultChecked>instant</option>
        <option>periodic</option>
        <option>never</option>
      </select>
      <ModalContent content={<ChangePasswordForm />} target={"cp-m"} />
      <div className='my-8'></div>
      <button className="btn btn-primary" onClick={handleSubmit}>Submit</button>
    </div>
  )
}
