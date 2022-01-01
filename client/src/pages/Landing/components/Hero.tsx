import CallToAction from './heroComponents/CallToAction'
import MotivationSource from './MotivationSource.svg'
import ScaleAnimation from './heroComponents/HeroScale'

import styles from './hero.module.css'

const Hero = () =>{
    return(
        <>
            <section className={styles.hero}>
                <main>
                    <CallToAction/>
                    <img src={MotivationSource} alt="Motivation Source" />
                </main>
            </section>
            <ScaleAnimation/>
        </>
    )
}
export default Hero