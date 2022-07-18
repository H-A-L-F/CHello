import { Link } from "react-router-dom";
import Board from "../views/Board";
import Empty from "../views/Empty";

const SectionClosedBoard = ({title, board}) => {
    return <div>
        <Header title={title} />
        <div className="my-2"></div>
        <div className="flex flex-wrap">
            {board.length === 0 && <Empty />}
            {/* {board !== undefined && board.length === 1 && <SingleSection ws={board[0]}/>} */}
            {board !== undefined && board.length >= 1 && board.map((b) => {
                const link = "/main/closed/board/" + b.id

                return (
                    <Link to={link} key={b.id}>
                        <Board title={b.name} key={b.id} />
                    </Link>
                );
            })}
        </div>
    </div>
}

const Header = ({ title }) => {
    return (
        <div className="flex flex-row justify-between w-[50%]">
            <h1 className="text-3xl font-bold text-primary">{ title }</h1>
        </div>
    );
}

export default SectionClosedBoard