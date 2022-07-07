import { arrayUnion, collection, doc, setDoc, updateDoc } from "firebase/firestore";
import { useRef, useState } from "react";
import { db } from "../../firebase";
import { useUserAuth } from "../../AuthContext";
import { makeid } from "../../GenerateId";
import { useSnapCollection } from "../hooks/useSnapCollection";
import LoadingHolder from "../views/LoadingHolder";
import ErrorHolder from "../views/ErrorHolder";
import { FIRESTORE_FETCH_SUCCESS } from "../actions/useSnapCollection";
import { convertForSelect, generateOptions } from "../modules/convertForSelect";
import { constructBoard } from "../models/board";
import { bInvUserEmail, userCreateBoard } from "../controllers/userBoardController";
import Select from 'react-select';

const CreateBoardForm = ({ ws }) => {
    const userState = useSnapCollection(collection(db, "user"))
    const [selecteds, setSelected] = useState()

    const {user} = useUserAuth()
    const titleRef = useRef()
    let visibility = "public"

    function handleChangeSelect(options) {
        setSelected(options)
    }

    function handleCreateBoard() {
        // handle invite
        const board = constructBoard(titleRef.current.value, visibility, ws.id)
        console.log(board)
        userCreateBoard(user.id, board, selecteds)
    }

    const handleChange = (v) => {
        visibility = v.target.value
    }

    return (
        <div>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Title</span>
                </label>
                <input ref={titleRef} type="text" placeholder="title" className="input input-bordered" />
            </div>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Visibility</span>
                </label>
                <select onChange={handleChange} className="select select-primary w-full max-w-xs">
                    <option defaultChecked>public</option>
                    <option>workspace-visible</option>
                    <option>board-visible</option>
                </select>
            </div>
            <div className="form-control mt-2 h-64">
            <label className="label">
                    <span className="label-text">Add Member</span>
                </label>
                {userState.status === "loading" && <LoadingHolder />}
                {userState.status === "error" && <ErrorHolder />}
                {userState.status === FIRESTORE_FETCH_SUCCESS && 
                    <Select
                        defaultMenuIsOpen={true}
                        closeMenuOnSelect={false}
                        closeMenuOnScroll={false}
                        options={generateOptions(userState.data)}
                        isMulti={true}
                        onChange={handleChangeSelect}
                    />
                }
            </div>
            <div className="form-control mt-6">
                <button className="btn btn-primary" onClick={handleCreateBoard}>Create</button>
            </div>
        </div>
    );
}

export default CreateBoardForm