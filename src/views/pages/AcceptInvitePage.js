import { getAuth, onAuthStateChanged } from "firebase/auth"
import { arrayUnion, doc, getDoc, Timestamp, updateDoc } from "firebase/firestore"
import { useEffect } from "react"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { useUserAuth } from "../../AuthContext"
import { db } from "../../firebase"

const AcceptInvitePage = () => {
    const [isPendingData, setPendingData] = useState(true)
    const [isValid, setValid] = useState(false)
    const [isPendingUser, setPendingUser] = useState(true)
    const [data, setData] = useState()
    const [userDb, setUserDb] = useState()
    const {path} = useParams()
    const {user} = useUserAuth()
    
    const docId = path

    async function getInviteDoc(id) {
        const invDocRef = doc(db, "invite", id)
        const res = await getDoc(invDocRef)
        return res
    }

    function setUserRef(data) {
        const userDocRef = doc(db, "user", user.id)
        const newData = data.for === "workspace" ? {member: arrayUnion(data.docID)} : {boardMember: arrayUnion(data.docID)}
        updateDoc(userDocRef, newData)
    }

    async function getUser(uid) {
        const userDocRef = doc(db, "user", uid)
        const res = await getDoc(userDocRef)
        return res
    }

    function validateUser(user, data) {
        console.log(Timestamp.now().seconds - data.created.seconds)
        const adminFlag = user.admin.includes(data.docID)
        const timeFlag = Timestamp.now().seconds - data.created.seconds > 86400
        return !adminFlag && !timeFlag
    }

    function handleAccept() {
        setUserRef(data)
    }

    useEffect(() => {
        const auth = getAuth()
        onAuthStateChanged(auth, (authUser) => {
            if(authUser) {
                getUser(authUser.uid)
                .then((res) => {
                    // const temp = {...res.data(), id: res.id}
                    console.log({...res.data(), id: res.id})
                    setUserDb({...res.data(), id: res.id})
                    setPendingUser(false)
                })
            }
        })
       

        getInviteDoc(docId)
            .then((res) => {
                // console.log({...res.data(), id: res.id})
                setData({...res.data(), id: res.id})
                setPendingData(false)
            })

    }, [])

    useEffect(() => {
        // if(data) {
        //     getUser(user)
        //         .then((res) => {
        //             const temp = {...res.data(), id: res.id}
        //             setUserDb(temp)
        //             console.log(userDb)
        //             setValid(validateUser(userDb, data))
        //         })
        // }
        if(!isPendingUser && !isPendingData) {
            console.log(userDb)
            setValid(validateUser(userDb, data))
        }

    }, [userDb, data])

    // console.log(docId)

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content text-center">
                <div className="max-w-md">
                    {/* <h1 className="text-5xl font-bold">Hello there</h1> */}
                    {/* <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p> */}
                    {/* <button className="btn btn-primary">Accept Invite</button> */}
                    {!isPendingData && isValid ? <button className="btn btn-primary" onClick={handleAccept}>Accept Invite</button> : <Invalid />}
                </div>
            </div>
        </div>
    )
}

const Invalid = () => {
    return (
        <button className="btn btn-error">Invite invalid</button>
    )
}

export default AcceptInvitePage