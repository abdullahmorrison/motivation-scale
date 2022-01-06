import styles from './callToAction.module.css'

import appleStoreButton from './callToActionComponents/appleStoreButton.svg'
import googlePlayButton from './callToActionComponents/googlePlayButton.svg'

const CallToAction = () =>{
    return(
        <div className={styles.callToAction}>
            <h1>The Perceived Goal Progress Scale</h1>
            <h2>Prevent Your Emotions From Slowing Your Progress</h2>
            <button>Get Started</button>
            <div className="download-app">
                <a href=''><img src={appleStoreButton} alt="Apple Store Button" /></a>
                <a href=''><img src={googlePlayButton} alt="Google Play Button" /></a>
            </div>
        </div>
    )
}
export default CallToAction