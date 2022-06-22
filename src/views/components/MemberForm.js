import { collection, doc, getDoc, onSnapshot, query, where } from "firebase/firestore"
import { useEffect } from "react"
import { useState } from "react"
import { db } from "../../firebase"
import Select from 'react-select';

const MemberForm = ({ ws }) => {


    return (
        <div className="min-h-[18rem]">
            <Select
                value={selecteds}
                defaultValue={defValue}
                onChange={handleChange}
                options={optUsers}
                isMulti={true}
            />
        </div>
    )
}

export default MemberForm