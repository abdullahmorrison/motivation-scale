import styles from "./loading.module.scss"

export default function Loading(){
  return(
    <main className={styles["page"]}>
      <div className={styles["loading"]}>
        <div className={styles["lds-ring"]}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </main>
  )
}
