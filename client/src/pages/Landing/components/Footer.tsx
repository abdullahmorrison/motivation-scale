import styles from './footer.module.css'

import InternetIcon from './footerComponents/internetIcon.svg'
import EmailIcon from './footerComponents/emailIcon.svg'
import GitHubIcon from './footerComponents/gitHubIcon.svg'

const Footer = () =>{
    return (
       <footer className={styles.footer}>
           <div>
               <button>Get Started</button>
           </div>
           <div className={styles.links}>
               <a href="">
                   <img src={InternetIcon} alt="Internet Icon" />
                   <p>Read In-Depth PGP Scale Guide</p>
               </a>
               <a href="mailto:abdullahmorrison@gmail.com">
                   <img src={EmailIcon} alt="Email Icon" />
                   <p>Contact Me</p>
               </a>
               <a href="https://github.com/abdullahmorrison" target='__blank'>
                   <img src={GitHubIcon} alt="GitHub Icon" />
                   <p>View Git Repo</p>
               </a>
           </div>
       </footer> 
    )
}
export default Footer