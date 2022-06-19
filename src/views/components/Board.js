import { HiHeart } from "react-icons/hi";

const Board = () => {
  return (
    <div className="w-64 h-28 bg-primary text-primary-content rounded-md relative group p-4">
      <h2 class="text-2xl font-bold truncate">Card title!</h2>
      {/* <div className="absolute w-28 h-12 bg-base-300 bottom-0"></div> */}
      <div className="absolute bottom-4 right-4 transition-all duration-100 ease-linear scale-0 group-hover:scale-100"> {<HiHeart size = "24"/>} </div>
    </div>
  );
};

export default Board;