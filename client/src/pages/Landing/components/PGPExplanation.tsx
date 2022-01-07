import styles from './pgpExplanation.module.css'

import ManWithMotivation from './manWithMotivation.svg'

const PGPExplanation = () => {
    return (
        <div className={styles.explanation}>
            <section>
                <h2>
                    This tool helps create motivation and keep it positive
                </h2>
                <p>
                    It does this by improving your self-awareness and helping you plan your goals
                </p>
            </section>
            <img src={ManWithMotivation} alt="Motivation Source on a Man" />
        </div>
    )
}
export default PGPExplanation