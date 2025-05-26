"use client"
import Settings from '@components/settings/Settings'
import styles from './nav-controls.module.scss'
import Link from 'next/link'
import { useContext } from 'react'
import { AuthContext } from '@context/authContext'
import { usePathname } from 'next/navigation'
import routes from '@lib/routes'

export default function NavControls(){
  const context = useContext(AuthContext)
  const pathname = usePathname()

  return (
    <div>
      {context.user!=null?
        <Settings/>
      :!pathname.includes("/auth")?
        <ul className={styles.links}>
          <li><Link href={routes.login}>Login</Link></li>
          <li><Link className={styles.signup} href={routes.signup}>Sign up</Link></li>
        </ul>
      :undefined}
    </div>
  )
}
