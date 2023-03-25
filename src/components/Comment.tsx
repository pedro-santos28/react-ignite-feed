import styles from './Comment.module.css'
import {Trash, ThumbsUp} from '@phosphor-icons/react'
import {Avatar} from '../components/Avatar'
import { dateFormated } from '../utils/formattingData';
import { callApi } from '../services/Axios';
import { useState } from 'react';
import { useUserContext } from '../context/UserContext';

interface CommentProps {
    id? : number;
    image: string;
    name: string;
    time: Date;
    comment?: string ;
    mutate: () => void
}

export function Comment({mutate, id, image, name, time, comment}: CommentProps){

    const {state} = useUserContext()
    const [likeCount, setLikeCount] = useState<number>(0)

    const handleDeleteComment = async () => {
        await callApi.delete(`comments/${id}`)
        mutate()
    }

    const handleLikeComment = () => {
        setLikeCount((likeCount) => likeCount + 1)
    }

    const commentDateFormatted = dateFormated(time)
    const defaultAvatar = 'https://i.pinimg.com/originals/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg'

    return (
        <div className={styles.comment}>
            <Avatar hasBorder={false} src={image ? image : defaultAvatar } />
            <div className={styles.commentBox}>
                <div className={styles.commentContent}>
                    <header>
                        <div className={styles.authorAndTime}>
                            <strong>{name}</strong>
                            <time>{commentDateFormatted}</time>
                        </div>

                        {state.user?.isAdmin ? (
                            <button className={styles.trash} title="Deletar comentário" onClick={handleDeleteComment}>
                            <Trash  size={20} />
                        </button>
                        ) : null}
                        
                    </header>
                    <p>{comment}</p>
                </div>
                <footer>
                    <button onClick={handleLikeComment}>
                        <ThumbsUp  />
                        Like <span>{likeCount}</span>
                        </button>
                </footer>
            </div>
        </div>
    );
}