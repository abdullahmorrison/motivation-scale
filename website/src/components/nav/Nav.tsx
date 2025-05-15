import Settings from '@components/settings/Settings'
import styles from './nav.module.scss'
import Image from 'next/image'

const Nav = () => {
  return (
    <nav className={styles.nav}>
      <a href="/"><Image src="/icons/logo.svg" width={75} height={75} alt="logo"/></a>
      <Settings/>
    </nav>
  )
}
export default Nav
