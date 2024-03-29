import { collection, doc, onSnapshot, query, where } from "firebase/firestore";
import { Fragment, useEffect, useState } from "react";
import { db } from '../../firebase'
import Checklist from "./Checklist";

const ChecklistRender = ({ card, role }) => {
    const [checklists, setChecklists] = useState([]);

    useEffect(() => {
        // const colRef = doc(db, "card", cardId);
        const checkRef = collection(db, "checklist")
        const q = query(checkRef, where("cardId", "==", card.id))
        const unsub = onSnapshot(q, (snapshot) => {
            setChecklists(snapshot.docs.map((doc) => doc));
        });

        return unsub;
    }, []);

    return (
        <>
            <div className="flex flex-col">
                {checklists.map((checklist, index) => {
                    return (
                        <Checklist
                            key={checklist.id}
                            card={card}
                            name={checklist.data().name}
                            checkId = {checklist.id}
                            index={index}
                            role = {role}
                        />
                    );
                })}
            </div>
        </>
    );
};

export default ChecklistRender;