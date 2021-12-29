import CallToAction from './CallToAction'
import MotivationSource from './MotivationSource.svg'
import ScaleAnimation from './ScaleAnimation'

import styles from './hero.module.css'

const Hero = () =>{
    return(
        <section className={styles.hero}>
            <main>
                <CallToAction/>
                <img src={MotivationSource} alt="Motivation Source" />
            </main>
            <ScaleAnimation/>
        </section>
    )
}
export default Hero