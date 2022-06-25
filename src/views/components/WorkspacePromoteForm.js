import Select from 'react-select';

const WorkspacePromoteForm = ({options}) => {
    return (
        <div>
            <div className="h-28">
                <Select
                    options={options}
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

export default WorkspacePromoteForm