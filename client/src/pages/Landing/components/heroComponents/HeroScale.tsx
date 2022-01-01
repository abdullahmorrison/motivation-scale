import styles from './heroScale.module.css'

const ScaleAnimation = () =>{
    return(
        <div className={styles.heroScale}>
            <input type="range" name="scale"/>
        </div>
    )
}
export default ScaleAnimation