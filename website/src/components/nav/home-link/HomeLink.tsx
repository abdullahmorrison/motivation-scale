"use client"
import styles from './homelink.module.scss'
import Image from 'next/image'
import Link from 'next/link'
import routes from '@lib/routes'
import { usePathname } from 'next/navigation'

export default function HomeLink(){
  const pathname = usePathname()

  return (
    <div>
      <Link href={routes.home}>
      {pathname === routes.home ?
        <Link href={routes.home}>
          <h3 className={styles.logo}><Image src="/icons/logo.svg" alt='logo' width={40} height={40}/>
            Motivation Scale
          </h3>
        </Link>
      :
        <Image src="/icons/logo.svg" width={75} height={75} alt="logo"/>
      }
      </Link>
    </div>
  )
}
