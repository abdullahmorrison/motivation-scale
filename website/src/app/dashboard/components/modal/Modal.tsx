import styles from './modal.module.scss'

interface ModalProps{
    title: string
    body: JSX.Element
    isVisible: boolean,
    buttons: {
        text: string,
        backgroundColor?: string,
        onClick?: () => void
    }[]
}
const ConfirmModal = (props: ModalProps) =>{
    return (
        <div className={styles.modal} style={props.isVisible? undefined : {visibility: "hidden"}}>
            <div className={styles.modalContent}>
                <div className={styles.header}><h3>{props.title}</h3></div>
                {props.body}
                <footer>
                    {props.buttons.map((button, index) => (
                        <button 
                            key={index} 
                            style={{backgroundColor: button.backgroundColor}} 
                            onClick={button.onClick}
                        >
                            {button.text}
                        </button>
                    ))}
                </footer>
            </div>
        </div>
    )
}
export default ConfirmModal
