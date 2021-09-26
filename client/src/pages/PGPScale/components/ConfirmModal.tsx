interface Props{
    message: String,
    confirmText: String, //what text is put on the button that confirms the action ("yes", "confirrm", "delete")
}
const ConfirmModal: React.FC<Props> = ({message, confirmText}) =>{
    return (
        <div id="myModal" className="modal">
            <div className="modal-content">
                <div className="modal-header"><h3>Confirm Action</h3></div>
                <div id="modal-question" className="modal-body">
                    {confirmText}
                </div>
                    <div className="modal-footer">
                    <button id="modal-footer-delete">{message}</button>
                    <button id="modal-footer-cancel">Cancel</button>
                </div>
            </div>
        </div>
    )
}
export default ConfirmModal
