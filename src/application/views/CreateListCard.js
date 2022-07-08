import { HiPlusSm } from "react-icons/hi";

const CreateListCard = () => {
    return (
        <div className="w-56 h-12 bg-base-content group truncate text-primary rounded-md flex flex-col align-middle justify-center px-4">
            <div className="flex flex-row justify-between">
                <h3 className="text-lg font-bold h-min text-base-300">Add list</h3>
                <div className="w-6 h-6 rounded-md bg-primary-content text-primary bottom-4 right-4 transition-all duration-100 ease-linear scale-0 group-hover:scale-100">
                        {<HiPlusSm size = "24"/>} 
                </div>
            </div>
        </div>
    );
}

export default CreateListCard