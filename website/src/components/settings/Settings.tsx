"use client"
import { useContext, useState } from 'react'
import styles from './settings.module.scss'
import { useRouter } from "next/navigation"
import useDidUpdateEffect from '@hooks/useDidUpdateEffect'
import { AuthContext } from '@context/authContext'
import routes from '@lib/routes'

const Settings = () => {
  const { user, logout}= useContext(AuthContext)
  const router = useRouter()
  const [toggleSettingsOpen, setToggleSettingsOpen] = useState(false)

  useDidUpdateEffect(()=>{
    if(!user) router.push(routes.login)
  }, [user])

  const userEmail = () =>{
    if(!user) return ""
    return user["email"]
  }
  const emailFirstLetter = () =>{
    const email = userEmail()
    if(email.length==0) return ""

    return email.charAt(0).toUpperCase()
  }

  if(!user) return null
  return (
    <div className={styles.account}>
      <div className={styles.icon} onClick={()=>setToggleSettingsOpen(prev=>!prev)}>{emailFirstLetter()}</div>
      {toggleSettingsOpen ?
        <div className={styles.settings}>
          <h3>Account</h3>
          <p className={styles.email}>{userEmail()}</p>
          <p onClick={logout} className={styles.logout}>Logout</p>
        </div>
      : null}
    </div>
  )
}
export default Settings
