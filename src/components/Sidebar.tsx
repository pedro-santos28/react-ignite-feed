import styles from './Sidebar.module.css'
import {Avatar} from '../components/Avatar'
import { ModalCreatePost } from './ModalCreatePost'
import { ModalEditUser } from './ModalEditUser'

type SidecardProps = {
    author?: {
        id: number,
        avatarUrl: string;
        name: string;
        role: string;
    },
    mutate: () => void
}

export function Sidecard({mutate} : SidecardProps){


    const handleEditProfile = () => {

    }

    return (
        <aside className={styles.sidebar}>
            <img className={styles.cover} src="https://images.unsplash.com/photo-1494256997604-768d1f608cac?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=50"  />

            <div className={styles.profile}>
                <Avatar src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGL3SkcBqxjf_6TZEcG1iz6Anh4BfY2nwvzh2vBwrVAxkW4MupE5kK42E81Qw7vss0Mws&usqp=CAU'/>

                <div className={styles.authorInfo} >
                    <strong className={styles.name}>Bink</strong>
                    <span className={styles.role}>CEO do Sexo</span>
                </div>
            </div>

            <footer className={styles.footer}>
                <ModalEditUser mutate={mutate}/>
                <ModalCreatePost mutate={mutate}/>
            </footer>
        </aside>
    )
}