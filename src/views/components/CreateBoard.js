import { HiPlusSm } from "react-icons/hi";

const CreateBoard = () => {
    return (
        <div className="w-64 h-28 bg-primary text-primary-content rounded-md relative p-4 group">
            <h2 class="text-xl font-bold truncate">
                Create a new board
            </h2>
            <div className="w-6 h-6 rounded-md bg-primary-content text-primary absolute bottom-4 right-4 transition-all duration-100 ease-linear scale-0 group-hover:scale-100">
                {<HiPlusSm size = "24"/>} 
            </div>
        </div>
    );
}

export default CreateBoard;