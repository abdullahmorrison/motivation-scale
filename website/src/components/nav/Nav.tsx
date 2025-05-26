import HomeLink from '@components/nav/home-link/HomeLink'
import NavControls from '@components/nav/nav-controls/NavControls'
import styles from './nav.module.scss'

export default function Nav(){
  return (
    <nav className={styles.nav}>
      <HomeLink/>
      <NavControls/>
    </nav>
  )
}
