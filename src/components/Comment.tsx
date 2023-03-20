import styles from './Comment.module.css'
import {Trash, ThumbsUp} from '@phosphor-icons/react'
import {Avatar} from '../components/Avatar'
import { dateFormated } from '../utils/formattingData';
import { callApi } from '../services/Axios';
import { useState } from 'react';

interface CommentProps {
    id? : number;
    image: string;
    name: string;
    time: Date;
    comment?: string ;
    mutate: () => void
}

export function Comment({mutate, id, image, name, time, comment}: CommentProps){

    const [likeCount, setLikeCount] = useState<number>(0)

    const handleDeleteComment = async () => {
        await callApi.delete(`comments/${id}`)
        mutate()
    }

    const handleLikeComment = () => {
        setLikeCount((likeCount) => likeCount + 1)
    }

    const commentDateFormatted = dateFormated(time)

    return (
        <div className={styles.comment}>
            <Avatar hasBorder={false} src={image} />
            <div className={styles.commentBox}>
                <div className={styles.commentContent}>
                    <header>
                        <div className={styles.authorAndTime}>
                            <strong>{name}</strong>
                            <time>{commentDateFormatted}</time>
                        </div>

                        <button className={styles.trash} title="Deletar comentário" onClick={handleDeleteComment}>
                            <Trash  size={20} />
                        </button>

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