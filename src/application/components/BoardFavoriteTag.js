import React, { useState } from 'react'
import Tag from '../views/Tag'
import { HiOutlineHeart } from "react-icons/hi";
import { addFavoriteBoard, removeFavoriteBoard } from '../controllers/userController';

export default function BoardFavoriteTag({ user, board }) {
    const [favorite, setFavorite] = useState(user.fav_board.includes(board.id))

    function handleFavorite() {
        if (!favorite) {
            addFavoriteBoard(user.id, board.id)
            setFavorite(true)
        }
        else {
            removeFavoriteBoard(user.id, board.id)
            setFavorite(false)
        }
    }

    return (
        <div onClick={handleFavorite}>
            <Tag icon={<HiOutlineHeart size={24} />} text={!favorite ? "Favorite" : "Unfavorite"} />
        </div>
    )
}
