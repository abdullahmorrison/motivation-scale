import styles from './page.module.scss'
import Image from 'next/image'
import ScaleSVG from './ScaleSVG'
import Link from 'next/link'

export default function Home() {
  return (
    <div className={styles.landing}>
      <nav>
        <a href="/"><h3 className={styles.logo}><Image src="/icons/logo.svg" alt='logo' width={40} height={40}/>Motivation Scale</h3></a>

        <ul className={styles.links}>
          <li><a href="/auth/login">Login</a></li>
          <li><a className={styles.signup} href="/auth/signup">Sign up</a></li>
        </ul>
      </nav>

      <header>
        <h1>Gain Control of Your Motivation</h1>
        <p>This tool helps you know where your motivation resides and plan accordingly.</p>
        <Link href="/auth/signup" className={styles.button}>Try it - Free</Link>
      </header>

      <section className={styles.motivationSource}>
        <h2>Motivation can either come from a... 👇</h2>
        <h3><span className={styles.positiveSource}>Positive Source 😃 </span> OR <span className={styles.negativeSource}>Negative Source 😰</span></h3>
        <ScaleSVG />
      </section>

      <section className={styles.awareness}>
        <h3>This tool helps you be aware of these sources... 🤔</h3>
        <p>by giving you a platform to track how your goals can effect your mood.</p>
        <Image className={styles.morpheus} src="/morpheus.png" alt="Morpheus" width={450} height={400}/>
        <h3>
          So that you can tip the scale in your favor and 
          <span className={styles.highlightText}> achieve your goals on 
            <span className={styles.emoji}>🫵 </span> YOUR terms! <span className={styles.emoji}>🎉</span>
          </span>
        </h3>
        <Link href="/auth/signup" className={styles.button}>Try it - Free</Link>
      </section>

      <p className={styles.note}>Psst.. if you see this and like what I do... I’m looking for software development jobs... pls refer me to your company. &lt;3</p>

      <footer>
        <ul>
          <li><a href="mailto:abdullahmorrison@gmail.com"><Image src="/Email.svg" alt='Email' width={20} height={20}/>Contact Me</a></li>
          <li><a href="https://github.com/abdullahmorrison/motivation-scale"><Image width={22} height={22} src="/GitHub.svg" alt='GitHub Logo'/>Contribute to the Project</a></li>
        </ul>
      </footer>
    </div>
  )
}
