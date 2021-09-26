import GitHubLogo from './images/githubLogo.png'
import MailLogo from './images/mailLogo.png'
import Laptop from './images/laptop.png'

import styles from '../css/landing.module.css'

import { useHistory } from 'react-router-dom';

import DemoScale from './components/DemoScale'


const Landing = () => {
    const history = useHistory(); //for react router

    return (
    <>
        <header className={styles.hero}>
            <div>
                <h1>Prevent Your Emotions From Slowing Your Progress</h1>
                <button className={styles.btn} onClick={()=> history.push("/pgpscale")}><b>Get Started</b></button>
            </div>
            <img src={Laptop} alt="laptop"/>
        </header>
        <div className={styles.demo}>
            <DemoScale/>
        </div>
        <div className={styles.guideOnTool}>
            <a href="/"><h2>View an In-Depth Guide on This Tool &rarr;</h2></a>
        </div>  
        <footer>
            <div className={styles.actionLink}>
                <a href="mailto:abdullahmorrison@gmail.com" target="_blank" rel="noreferrer">
                    <img className={styles.logo} src={MailLogo} alt="Mail Logo" />
                    Email Me
                </a>
            </div>
            <div className={styles.actionLink}>
                <a href="https://github.com/abdullahmorrison/ThePerceivedGoalProgressScale" target="_blank" rel="noreferrer">
                    <img className={styles.logo} src={GitHubLogo} alt="GitHub Logo" />
                    View The GitHub
                </a>
            </div>
        </footer>
    </>
    )
}
export default Landing