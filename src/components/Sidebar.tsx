import styles from './Sidebar.module.css'
import {Avatar} from '../components/Avatar'
import { ModalCreatePost } from './ModalCreatePost'
import { ModalEditUser } from './ModalEditUser'
import { useUserContext } from '../context/UserContext'

type SidecardProps = {
    mutate: () => void
}

export function Sidecard({mutate} : SidecardProps){

    const {state} = useUserContext()

    const defaultUserImage = 'https://i.pinimg.com/originals/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg'
    const defaultBannerImage = 'https://images.unsplash.com/photo-1494256997604-768d1f608cac?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=50'

    return (
        <aside className={styles.sidebar}>
            <img className={styles.cover} src={state.user?.bannerUrl ? state.user?.bannerUrl : defaultBannerImage}/>

            <div className={styles.profile}>
                <Avatar src={state.user?.avatarUrl ? state.user.avatarUrl : defaultUserImage}/>
                <div className={styles.authorInfo} >
                    <strong className={styles.name}>{state.user?.name}</strong>
                    <span className={styles.role}>{state.user?.role}</span>
                </div>
            </div>

            <footer className={styles.footer}>
                <ModalEditUser authorId={state.user?.id} mutate={mutate}/>
                <ModalCreatePost authorId={state.user?.id} mutate={mutate}/>
            </footer>
        </aside>
    )
}