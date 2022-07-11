import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import CardDetail from "./CardDetail";
import Card from "../views/Card";
import Modal from '../views/Modal';
import ModalContent from '../views/ModalContent';

export default function DraggableCard({c, index}) {
    return (
        <Draggable key={c.id} draggableId={c.id} index={index} >
            {(provided) => {
                return (
                    <CardModal provided={provided} c={c} key={c.id} />
                )
            }}
        </Draggable>
    )
}

const CardModal = ({ c, provided }) => {
    const target = "modal-ce-" + c.id

    return (
        <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} >
            {provided.placeholder}
            <Modal body={<Card c={c}/>} target={target}/>
            <ModalContent content={<CardDetail c={c}/>} target={target}/>
        </div>
    );
}
