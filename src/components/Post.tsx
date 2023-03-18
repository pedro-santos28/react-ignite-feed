import styles from './Post.module.css'
import {Avatar} from '../components/Avatar'
import { Comment } from '../components/Comment';

export function Post(){
    return (
        <article className={styles.post}>
            <header>
                <div className={styles.author}>
                    <Avatar />
                    <div className={styles.authorInfo}>
                        <strong className={styles.name}>Bink</strong>
                        <span className={styles.role}>CEO do Sexo</span>
                    </div>
                </div>
                <time>Publicado à 1h</time>
            </header>

            <div className={styles.content}>
                <p>Fala galeraa 👋</p>
                <p>Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀</p>
                <p> <a href="#"> 👉 jane.design/doctorcare </a></p>
                <p> <a href="#"> #novoprojeto #nlw #rocketseat </a></p>
            </div>

            <form className={styles.commentForm}>
                <strong>Deixe seu feedback</strong>
                <textarea placeholder='Deixe um comentário' />
                <footer>
                    <button type='submit'>Publicar</button>
                </footer>
            </form>

            <div className={styles.commentList}>
                <Comment 
                    image='https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1143&q=80'
                    name='Bink'
                    time='1 hora'
                    comment='Muito bom, parabéns!'
                />
            </div>
        </article>
    )
}

