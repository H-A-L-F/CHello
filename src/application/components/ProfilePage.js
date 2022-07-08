import React from 'react'
import { useUserAuth } from '../../AuthContext'

export default function ProfilePage() {
  const {user} = useUserAuth()

  function handleSubmit() {

  }

  return (
    <div className='w-[40%] ml-[10%] mr-auto my-auto flex flex-col bg-base-300 px-8 py-12 rounded-md'>
      <div className='flex flex-row align-middle items-center '>
        <div class="avatar">
          <div class="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 absolute">
            <img src="https://placeimg.com/192/192/people" />
          </div>
          <div class="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 relative bg-base-300 bg-opacity-75 text-center">
            <p className='mt-8 text-primary font-medium opacity-100'>Change</p>
          </div>
        </div>
        <h1 className='text-5xl font-semibold text-primary h-fit ml-8'>{user.username}</h1>
      </div>
      <div className='my-4'></div>
      <label>Biodata</label>
      <textarea class="textarea textarea-primary max-w-[100%] h-28 text-primary" placeholder="Bio"></textarea>
      <div className='my-2'></div>
      <label>Email</label>
      <input type="text" placeholder="Type here" class="input input-bordered input-primary w-full max-w-xs" />
      <div className='my-2'></div>
      <p class="link link-primary">Change Password</p>
      <div className='my-8'></div>
      <button class="btn btn-primary" onClick={handleSubmit}>Submit</button>
    </div>
  )
}
