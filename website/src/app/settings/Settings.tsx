import { useContext, useState } from 'react'
import styles from './settings.module.scss'
import { AuthContext } from '@/context/authContext'

const Settings = () => {
  const { user }= useContext(AuthContext)
  const [toggleSettingsOpen, setToggleSettingsOpen] = useState(false)

  return (
    <div className={styles.account}>
      <div className={styles.icon} onClick={()=>setToggleSettingsOpen(prev=>!prev)}>{user.email.charAt(0).toUpperCase()}</div>
      {toggleSettingsOpen ?
        <div className={styles.settings}>
          <h3>Account</h3>
          <p className={styles.email}>{user.email}</p>
          <p className={styles.logout}>Logout</p>
        </div>
      : null}
    </div>
  )
}
export default Settings
