const Modal = ({ body, target }) => {
    return (
        <label htmlFor={target} className="modal-button"> {body} </label>
    );
}

export default Modal