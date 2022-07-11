import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import CardDetailAll from "./CardDetailAll";
import Card from "../views/Card";
import Modal from '../views/Modal';
import ModalContent from '../views/ModalContent';
import { useState } from 'react';

export default function DraggableCard({ c, index, user, board }) {
    const target = "modal-ce-" + c.id
    const [isOpen, setOpen] = useState(false)

    function handleClick() {
        setOpen(true)
    }

    return (
        <div>
            <Draggable key={c.id} draggableId={c.id} index={index} >
                {(provided) => {
                    // return (
                    //     <div>
                    //         <CardModal provided={provided} c={c} key={c.id} user={user} board={board} />
                    //         <ModalContent content={<CardDetailAll cardId={c.id} user={user} board={board} />} target={target} />
                    //     </div>
                    // )
                    return (
                        <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} onClick={handleClick}>
                            {provided.placeholder}
                            {/* <Modal body={<Card c={c} />} target={target} /> */}
                            <Card c={c} />
                        </div>
                    )
                }}
            </Draggable>
            {isOpen && <CardDetailAll card={c} user={user} board={board} setOpen={setOpen}/>}
        </div>

    )
}

// const CardModal = ({ c, provided, user, board }) => {


//     return (
//         <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} onClick={handleClick}>
//             {provided.placeholder}
//             <Modal body={<Card c={c} />} target={target} />
//             { }
//         </div>
//     );
// }
