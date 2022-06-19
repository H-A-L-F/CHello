import { HiHeart } from "react-icons/hi";

const Board = ({ title }) => {
  return (
    <div className="w-64 h-28 bg-primary text-primary-content rounded-md relative group p-4 mr-4 mb-4">
      <h2 className="text-2xl font-bold truncate"> {title} </h2>
      <div className="absolute bottom-4 right-4 transition-all duration-100 ease-linear scale-0 group-hover:scale-100"> {<HiHeart size = "24"/>} </div>
    </div>
  );
};

export default Board;