import styles from './nav.module.css'

const Nav = () =>{
    return(
        <nav className={styles.nav}>
            <ul>
                <li><a href="/" className={styles.logo}>PGP Scale</a></li>
                <li><a href="" className={styles.unstyled}>Login</a> | < a href="">Sign Up &rarr;</a></li>
            </ul>
        </nav>
    )
}
export default Nav