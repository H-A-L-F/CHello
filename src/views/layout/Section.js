import Board from "../components/Board";
import Header from "../components/Header";

const Section = () => {
    return (
        <div className="flex flex-col">
            <Header title = "Header" />
            <div className="my-2"></div>
            <div className="flex flex-wrap">
                <Board />
            </div>
        </div>
    );
}

export default Section;