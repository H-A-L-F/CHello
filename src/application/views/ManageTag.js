import React from 'react'
import Modal from './Modal'
import ModalContent from './ModalContent'
import Tag from './Tag'
import { HiAdjustments } from "react-icons/hi"

export default function ManageTag({form}) {
  return (
    <div>
        <Modal body={<Tag icon={<HiAdjustments size={28}/>} text={"Manage"}/>} target={"modal-mws"}/>
        <ModalContent body={form} target={"modal-mws"}/>
    </div>
  )
}
