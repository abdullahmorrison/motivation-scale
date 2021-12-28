import styles from './inDevelopmentBanner.module.css'

import Caution from './images/caution.png'

export default function InDevelopmentBanner() {
    return (
        <div className={styles.banner}>
            <img src={Caution} alt="Caution" />
            <p>Still in Development: This project is not complete and likely to have bugs</p>
        </div>
    )
}
