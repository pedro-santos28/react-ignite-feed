import styles from './Comment.module.css'
import {Trash, ThumbsUp} from '@phosphor-icons/react'
import {Avatar} from '../components/Avatar'

interface CommentProps {
    image: string;
    name: string;
    time: string;
    comment: string;
}

export function Comment({image, name, time, comment}: CommentProps){
    return (
        <div className={styles.comment}>
            <Avatar hasBorder={false} />
            <div className={styles.commentBox}>
                <div className={styles.commentContent}>
                    <header>
                        <div className={styles.authorAndTime}>
                            <strong>{name}</strong>
                            <time>Publicado à {time}</time>
                        </div>

                        <button title="Deletar comentário">
                        <Trash size={20} />
                        </button>

                    </header>
                    <p>{comment}</p>
                </div>
                <footer>
                    <button>
                        <ThumbsUp  />
                        Like <span>20</span>
                        </button>
                </footer>
            </div>
        </div>
    );
}