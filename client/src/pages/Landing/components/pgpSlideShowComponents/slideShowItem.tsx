import styles from './slideShowItem.module.css'

interface slideShowItemProps {
    imgSrc: string,
    imgAltText: string,
    mainText: string,
    example?: string
}
const slideShowItem = (props:slideShowItemProps) =>{
    return (
        <div className={styles.slideShowContainer}>
            <div className={styles.slideShow}>
                <img src={props.imgSrc} alt={props.imgAltText} />
                <div>
                    <p className={styles.mainText}>{props.mainText}</p>
                    {props.example ? 
                        <p className={styles.example}>{props.example}</p>
                        : null
                    }
                </div>
            </div>
        </div>
    )
}
export default slideShowItem