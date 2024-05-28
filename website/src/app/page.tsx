"use client"
import styles from './page.module.scss'
import Image from 'next/image'
import Logo from './assets/icons/logo.svg'
import Scale from './assets/Scale.svg'
import Morpheus from './assets/morpheus.png'
import Email from './assets/Email.svg'
import GitHub from './assets/GitHub.svg'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  return (
    <div className={styles.landing}>
      <nav>
        <h3 className={styles.logo}><Image src={Logo} alt='logo' width={40}/>Motivation Scale</h3> 

        <ul className={styles.links}>
          <li><a href="/auth/login">Login</a></li>
          <li><a className={styles.signup} href="/auth/signup">Sign up</a></li>
        </ul>
      </nav>

      <header>
        <h1>Gain Control of Your Motivation</h1>
        <p>This tool helps you know where your motivation resides and plan accordingly.</p>
        <button onClick={()=>router.push("/auth/signup")}>Try it - Free</button>
      </header>

      <section className={styles.motivationSource}>
        <h2>Motivation can either come from a... 👇</h2>
        <h3>Positive Source 😃 OR Negative Source 😰</h3>
        <Image className={styles.scale} src={Scale} alt="Scale"/>
      </section>

      <section className={styles.awareness}>
        <h3>This tool helps you be aware of these sources... 🤔</h3>
        <Image className={styles.morpheus} src={Morpheus} alt="Morpheus"/>
        <h3>
          So that you can tip the scale in your favor and 
          <span className={styles.highlightText}> achieve your goals on 
            <span className={styles.emoji}>🫵 </span> YOUR terms! <span className={styles.emoji}>🎉</span>
          </span>
        </h3>
        <button onClick={()=>router.push("/auth/signup")}>Try it - Free</button>
      </section>

      <p className={styles.note}>Psst.. if you see this and like what I do... I’m looking for software development jobs... pls refer me to your company. &lt;3</p>

      <footer>
        <ul>
          <li><a href="mailto:abdullahmorrison@gmail.com"><Image src={Email} alt='Email'/>Contact Me</a></li>
          <li><a href="https://github.com/abdullahmorrison/motivation-scale"><Image width={22} src={GitHub} alt='GitHub Logo'/>Contribute to the Project</a></li>
        </ul>
      </footer>
    </div>
  )
}
