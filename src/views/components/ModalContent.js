const ModalContent = ({ target, content }) => {
    return (
        <div className="">
            <input type="checkbox" id={target} className="modal-toggle" />
            <label htmlFor={target} className="modal cursor-pointer ">
            <label className="modal-box relative">
                {content}
            </label>
            </label>
        </div>
    );
}

export default ModalContent