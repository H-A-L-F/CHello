import { HiPencilAlt } from "react-icons/hi";

const Card = ({ c }) => {
    let color = () => {
        switch (c.status) {
            case "default":
                return "bg-info text-info-content"
            case "done":
                return "bg-success text-success-content"
            case "ongoing":
                return "bg-warning text-warning-content"
            case "no-progress":
                return "bg-error text-error-content"
            default:
                break;
        }
    }

    // console.log(color())

    return (
        <div className={"flex-auto h-12 rounded-md flex items-center px-4 flex-row justify-between group " + color()}>
            <h2 className="text-xl font-bold"> {c.name} </h2>
            <div className="transition-all duration-100 ease-linear scale-0 group-hover:scale-100">
                {<HiPencilAlt size = "24"/>} 
            </div>
        </div>
    );
}

export default Card