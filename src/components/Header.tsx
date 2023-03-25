import styles from './Header.module.css'
import {SignOut} from '@phosphor-icons/react'
import { useUserContext } from '../context/UserContext'

export function Header(){

    const {state} = useUserContext()

    const handleSignOut = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('auth')
        localStorage.removeItem('user')
        state.setIsAuthenticated(false)
        state.setJWT('')
        state.setUser({} as any)
        window.location.reload()
    }

    return (
        <header className={styles.header}>
            <img src='/public/igniteLogo.svg' alt="Logotipo do ignite" />
            <strong>Ignite Feed</strong>
            {state?.isAuthenticated ?
            ( 
                <div className={styles.signout}>
                    <SignOut onClick={handleSignOut} fontSize={30}/>
                </div> 
            ) : null }
        </header>
    )
}