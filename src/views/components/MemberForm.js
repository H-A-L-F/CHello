import { collection, onSnapshot } from "firebase/firestore"
import { useEffect } from "react"
import { useState } from "react"
import { db } from "../../firebase"
import Select from 'react-select';

const MemberForm = () => {
    const [users, setUsers] = useState([])
    const [selecteds, setSelecteds] = useState([])

    const optUsers = [

    ]

    const userCollectionRef = collection(db, "user")

    useEffect(() => {
        const unsub = onSnapshot(userCollectionRef, (data) => {
            setUsers(data.docs.map((doc) => doc.data().email))
        })

        return unsub
    }, [])

    const handleChange = (selectedOption) => {
        setSelecteds(selectedOption)
    }

    const insertUsers = () => {
        for(let i = 0; i < users.length; i++)  {
            optUsers.push({value: users[i], label: users[i]})
        }
    }
    
    insertUsers()

    return (
        <div className="min-h-[18rem]">
            <Select
                value={selecteds}
                onChange={handleChange}
                options={optUsers}
                isMulti={true}
            />
        </div>
    )
}

export default MemberForm