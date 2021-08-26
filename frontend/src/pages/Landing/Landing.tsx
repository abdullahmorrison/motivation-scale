import GitHubLogo from './images/githubLogo.png'
import MailLogo from './images/mailLogo.png'
import Laptop from './images/laptop.png'

const Landing = () => {
    return (
    <>
        <header>
            <h1>Prevent Your Emotions From Slowing Your Progress</h1>
            <button><h2>Get Started</h2></button>
            <img src={Laptop} alt="laptop"/>
        </header>
        <div>
            Demo
        </div>
        <div>
            <a href="/"><h2>View an In-Depth Guide on This Tool &rarr;</h2></a>
        </div>  
        <footer>
            <div>
                <a href="mailto:abdullahmorrison@gmail.com" target="_blank" rel="noreferrer">
                    Contact Me
                    <img src={MailLogo} alt="Mail Logo" />
                </a>
            </div>
            <div>
                <a href="https://github.com/abdullahmorrison/ThePerceivedGoalProgressScale" target="_blank" rel="noreferrer">
                    View My GitHub
                    <img src={GitHubLogo} alt="GitHub Logo" />
                </a>
            </div>
        </footer>
    </>
    )
}
export default Landing