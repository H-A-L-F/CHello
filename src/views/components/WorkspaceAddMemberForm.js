import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import InviteLinkButton from './InviteLinkButton';
import InviteLinkModal from './InviteLinkModal';
import Modal from './Modal';
import ModalContent from './ModalContent';

const WorkspaceAddMemberForm = ({users, all, wspath}) => {
    const [isPendingOpt, setPendingOpt] = useState(true)
    const [isPendingDefs, setPendingDef] = useState(true)
    const [selecteds, setSelected] = useState()
    const [opts, setOpt] = useState([])
    const [defs, setDef] = useState([])
    const alls = []

    const link = "/invite/page/workspace/" + window.btoa(wspath)

    function handleChange(s) {
        console.log(s)
    }

    // useEffect(() => {
    //     all.forEach(e => {
    //         const data = {
    //             value: e.email,
    //             label: e.email
    //         }
    //         // opts.push({value: e.email, label: e.email})
    //         setOpt((oldArray) => [...oldArray, data])
    //     });
    //     setPendingOpt(false)

    //     users.forEach(e => {
    //         const data = {
    //             value: e.email,
    //             label: e.email
    //         }
    //         // def.push({value: e.email, label: e.email})
    //         setDef((oldArray) => [...oldArray, data])
    //     });
    //     console.log(defs)
    //     setPendingDef(false)
    // }, [])

    useEffect(() => {
        all.forEach(e => {
            alls.push({value: e.email, label: e.email})
        });
    }, [])

    return (
        <div>
            <Link to={link}>
                <InviteLinkButton />
            </Link>
            {/* {(!isPendingDefs && !isPendingOpt) && 
                <Select
                    value={selecteds}
                    // defaultValue={defs}
                    onChange={handleChange}
                    options={all}
                    isMulti={true}
                />
            } */}
            <div class="divider">OR</div>
            <div className="h-28">
                <Select
                    value={selecteds}
                    // defaultValue={defs}
                    onChange={handleChange}
                    options={alls}
                    isMulti={true}
                />
            </div>
            <SubmitButton />
        </div>
    )
}

const SubmitButton = () => {
    return (
        <div className='flex flex-row bg-primary rounded-md min-w-[18rem] min-h-[2.5rem] text-primary-content items-center justify-center'>
            <h2 className="text-lg font-bold">Send Invite</h2>
        </div>
    )
}

export default WorkspaceAddMemberForm