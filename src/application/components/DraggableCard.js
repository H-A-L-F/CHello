import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import CardDetailAll from "./CardDetailAll";
import Card from "../views/Card";
import Modal from '../views/Modal';
import ModalContent from '../views/ModalContent';

export default function DraggableCard({c, index, user, board}) {
    return (
        <Draggable key={c.id} draggableId={c.id} index={index} >
            {(provided) => {
                return (
                    <CardModal provided={provided} c={c} key={c.id} user={user} board={board}/>
                )
            }}
        </Draggable>
    )
}

const CardModal = ({ c, provided, user, board }) => {
    const target = "modal-ce-" + c.id

    return (
        <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} >
            {provided.placeholder}
            <Modal body={<Card c={c}/>} target={target}/>
            <ModalContent content={<CardDetailAll cardId={c.id} user={user} board={board}/>} target={target}/>
        </div>
    );
}
