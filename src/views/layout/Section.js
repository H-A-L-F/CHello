import Board from "../components/Board";
import CreateBoard from "../components/CreateBoard";
import Header from "../components/Header";

const Section = ({ title }) => {
    return (
        <div className="flex flex-col">
            <Header title = {title} />
            <div className="my-2"></div>
            <div className="flex flex-wrap space-x-4">
                <Board />
                <CreateBoard />
            </div>
        </div>
    );
}

export default Section;