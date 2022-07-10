import React from 'react'
import Modal from './Modal'
import ModalContent from './ModalContent'
import Tag from './Tag'
import { HiAdjustments } from "react-icons/hi"
import ManageWorkspaceForm from '../components/ManageWorkspaceForm'
import LoadingHolder from './LoadingHolder'
import CreateWorkspaceForm from '../components/CreateWorkspaceForm'

export default function ManageTag({ form }) {

  // console.log(Form === "workspace")
  return (
    <div>
      <Modal body={<Tag icon={<HiAdjustments size={28} />} text={"Manage"} />} target="modal-mws" />
      <ModalContent target="modal-mws" content={form} />
    </div>
  )
}
