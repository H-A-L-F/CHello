import { collection, doc, getDoc, onSnapshot, query, where } from "firebase/firestore"
import { useEffect } from "react"
import { useState } from "react"
import { db } from "../../firebase"
import Select from 'react-select';

const MemberForm = ({ ws }) => {
    const [users, setUsers] = useState([])
    const [selecteds, setSelecteds] = useState([])
    const [members, setMembers] = useState([])

    const optUsers = [

    ]
    const defValue = [

    ]

    const userCollectionRef = collection(db, "user")
    const qUser = (userCollectionRef, where(""))
    const workspaceCollectionRef = doc(db, "workspace", ws.id)

    useEffect(() => {
        const unsub = onSnapshot(userCollectionRef, (data) => {
            setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
        })

        return unsub
    }, [])

    const getAdminByUid = async (uid) => {
        const adminDocRef = doc(db, "user", uid)
        const temp = await getDoc(adminDocRef)
        return temp
    }

    function addMember(newMember) {
        console.log('add: ', newMember)
        setMembers((prevMember) => prevMember.push(newMember))
        console.log('member: ', members)
    }

    // useEffect(() => {
    //     const unsub = onSnapshot(workspaceCollectionRef, (data) => {
    //         const admins = data.data().admin
    //         // console.log('admin: ', admins)
    //         setMembers({})
    //         admins.map((uid) => {
    //             // console.log('uid: ', uid)
    //             getAdminByUid(uid)
    //                 .then((data) => {
    //                     const email = data.data().email
    //                     const newMember = {
    //                         value: email,
    //                         label: email
    //                     }
    //                     // console.log(newMember)
    //                     // setMembers({value: data.data().email, label: data.data().email})
    //                     // setMembers([members, newMember])
    //                     addMember(newMember)
    //                     // console.log(members)
    //                 })
    //         })
    //     })

    //     return unsub
    // }, [])

    const handleChange = (selectedOption) => {
        setSelecteds(selectedOption)
    }

    const insertUsers = () => {
        for(let i = 0; i < users.length; i++)  {
            optUsers.push({value: users[i].email, label: users[i].email})
        }
        console.log(users)
    }

    const insertDefValue = () => {
        // for(let i = 0; i < members.length; i++)  {
        //     defValue.push({value: members[i].value, label: members[i].label})
        // }
        defValue.push({value: members.value, label: members.label})
        console.log(defValue)
    }
    
    insertUsers()
    // insertDefValue()

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