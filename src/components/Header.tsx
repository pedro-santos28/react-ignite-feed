import styles from './Header.module.css'
import igniteLogo from '../assets/igniteLlogo.svg'
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

    console.log(state?.isAuthenticated)

    return (
        <header className={styles.header}>
            <img src={igniteLogo} alt="Logotipo do ignite" />
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