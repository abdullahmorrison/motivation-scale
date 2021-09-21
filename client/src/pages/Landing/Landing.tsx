import GitHubLogo from './images/githubLogo.png'
import MailLogo from './images/mailLogo.png'
import Laptop from './images/laptop.png'

import styles from '../css/landing.module.css'

import { useHistory } from 'react-router-dom';

import DemoScale from './components/DemoScale'

import {GoogleLogin} from 'react-google-login';

const Landing = () => {
    const history = useHistory(); //for react router

    const responseGoogleSuccess = async (response: any) =>{
        alert("worked")
    }

    return (
    <>
        <div id="myModal" className="modal">
            <div className="modal-content">
                <div className="modal-header"><h3>Confirm Action</h3></div>
                <div className="modal-body">
                    <GoogleLogin
                        clientId="212338543657-jov7gtn2u61p4bst88inr3v4sneda77t.apps.googleusercontent.com"
                        buttonText="Continue with Google"
                        onSuccess={(res)=>responseGoogleSuccess(res)}
                        isSignedIn={true}
                        cookiePolicy={'single_host_origin'}
                    />
                </div>
                    <div className="modal-footer">
                    <button id="modal-footer-delete">Delete</button>
                    <button id="modal-footer-cancel">Cancel</button>
                </div>
            </div>
        </div>
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