import React from 'react'
import Tag from '../views/Tag'
import { HiOutlineHeart } from "react-icons/hi";
import { addFavoriteBoard } from '../controllers/userController';

export default function BoardFavoriteTag({ user, board }) {
    function handleFavorite() {
        addFavoriteBoard(user.id, board.id)
    }

    return (
        <div onClick={handleFavorite}>
            <Tag icon={<HiOutlineHeart size={24} />} text={"Favorite"} />
        </div>
    )
}
