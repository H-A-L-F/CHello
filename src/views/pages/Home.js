import { useEffect, useState } from 'react';
import Section from '../layout/Section';
import {db} from '../../firebase';
import { collection, onSnapshot } from 'firebase/firestore';

const Home = () => {
    const [workspace, setWorkspace] = useState([])
    const workspaceCollectionRef = collection(db, "workspace")

    useEffect(() => {
        const unsub = onSnapshot(workspaceCollectionRef, (data) => {
            setWorkspace(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
        })

        return unsub
    }, [])

    return (
        <div className="flex flex-col w-[90%] mx-auto space-y-8">
            {workspace.map((ws) => {
                return <Section ws={ws} key = {ws.id}/>
            })}
        </div>
    );
}

export default Home;