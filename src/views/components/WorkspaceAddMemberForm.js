import { useEffect } from 'react';
import { useState } from 'react';
import Select from 'react-select';

const WorkspaceAddMemberForm = ({users}) => {
    

    

    useEffect(() => {

    }, [])

    return (
        <div>
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

export default WorkspaceAddMemberForm