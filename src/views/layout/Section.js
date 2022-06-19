import Board from "../components/Board";
import CreateBoardCard from "../components/CreateBoard";
import CreateBoardForm from "../components/CreateBoardForm";
import Header from "../components/Header";
import Modal from "../components/Modal";
import ModalContent from "../components/ModalContent";

const Section = ({ title, wsid }) => {
    return (
        <div className="flex flex-col">
            <Header title = {title} />
            <div className="my-2"></div>
            <div className="flex flex-wrap space-x-4">
                <Board />
                <Modal body={<CreateBoardCard />} target="modal-cb" />
                <ModalContent target="modal-cb" content={<CreateBoardForm wsid={wsid}/>}/>
            </div>
        </div>
    );
}

export default Section;