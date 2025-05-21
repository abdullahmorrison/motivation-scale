import Settings from '@components/settings/Settings'
import styles from './nav.module.scss'
import Image from 'next/image'
import Link from 'next/link'

const Nav = () => {
  return (
    <nav className={styles.nav}>
      <Link href="/">
        <Image src="/icons/logo.svg" width={75} height={75} alt="logo"/>
      </Link>
      <Settings/>
    </nav>
  )
}
export default Nav
