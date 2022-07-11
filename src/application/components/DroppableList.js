import React from 'react'
import { Droppable } from 'react-beautiful-dnd'
import ListCard from './ListCard'

export default function DroppableList({ l, id, auth, board, user }) {
    return (
        <Droppable droppableId={l.id} key={id}>
            {(provided, snapshot) => {
                return <ListCard provided={provided} snapshot={snapshot} l={l} auth={auth} key={l.id} board={board} user={user}/>
            }}
        </Droppable>
    )
}