import { useEffect, useState } from 'react';
import Section from '../layout/Section';
import {db} from '../../firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import { useUserAuth } from '../../AuthContext';

const Home = () => {
    const [workspace, setWorkspace] = useState([])
    const workspaceCollectionRef = collection(db, "workspace")

    useEffect(() => {
        const unsub = onSnapshot(workspaceCollectionRef, (data) => {
            setWorkspace(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
        })

        return unsub
    }, [])

    const {user} = useUserAuth();
    console.log(user.displayName);

    return (
        <div className="flex flex-col w-[90%] mx-auto space-y-8">
            {workspace.map((ws) => {
                return <Section title = {ws.name} key = {ws.id} wsid={ws.id}/>
            })}
        </div>
    );
}

export default Home;