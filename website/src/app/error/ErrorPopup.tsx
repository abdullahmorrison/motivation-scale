import styles from "./errorpopup.module.scss"

export default function ErrorPopup(){
  return(
    <div className={styles["popup"]}>
      <h3>Oops! Something went wrong</h3>
    </div>
  )
}

