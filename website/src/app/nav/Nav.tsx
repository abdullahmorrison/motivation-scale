import Settings from '../settings/Settings'
import styles from './nav.module.scss'
import Logo from '../assets/icons/logo.svg'
import Image from 'next/image'

const Nav = () => {
  return (
    <nav className={styles.nav}>
      <a href="/"><Image src={Logo} width={75} alt="logo"/></a>
      <Settings/>
    </nav>
  )
}
export default Nav
