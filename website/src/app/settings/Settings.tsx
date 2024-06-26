import { useContext, useState } from 'react'
import styles from './settings.module.scss'
import { AuthContext } from '@/context/authContext'
import { useRouter } from "next/navigation"
import useDidUpdateEffect from '@/hooks/useDidUpdateEffect'

const Settings = () => {
  const { user, logout}= useContext(AuthContext)
  const router = useRouter()
  const [toggleSettingsOpen, setToggleSettingsOpen] = useState(false)

  useDidUpdateEffect(()=>{
    if(user==null) router.push("/auth/login")
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
