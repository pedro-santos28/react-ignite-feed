import styles from './Comment.module.css'
import {Trash, ThumbsUp, ThumbsDown} from '@phosphor-icons/react'
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
    like: number;
    dislike: number;
    mutate: () => void
}

export function Comment({mutate, id, image, name, time, comment, like, dislike}: CommentProps){

    const {state} = useUserContext()
    const [isLikePressed, setIsLikePressed] = useState<boolean>(false)
    const [isDislikePressed, setIsDislikePressed] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)

    const handleDeleteComment = async () => {
        setLoading(true)
        try{
            await callApi.delete(`comments/${id}`, {
                headers: {
                    Authorization: `Bearer ${state.JWT}`
                }
            })
            mutate()
        }catch(error){
            console.log(error)
        }finally{
            setLoading(false)
        }
    }

    const handlePressLike = async () => {
        setIsLikePressed(!isLikePressed)
        setLoading(true)
        try{
            await callApi.put(`comments/${id}`, {
                hasLiked: isLikePressed
            }, 
            {
                headers: {
                    Authorization: `Bearer ${state.JWT}`
                }
            })
            mutate()
        }catch(error){
            console.log(error)
        }finally{
            setLoading(false)
        }
    }
    const handlePressDislike = async () => {
        setIsDislikePressed(!isDislikePressed)
        setLoading(true)
        try{
            await callApi.put(`comments/${id}`, {
                hasDisliked: !isDislikePressed
            }, 
            {
                headers: {
                    Authorization: `Bearer ${state.JWT}`
                }
            })
            mutate()
        }catch(error){
            console.log(error)
        }finally{
            setLoading(false)
        }
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
                            <button disabled={loading} className={styles.trash} title="Deletar comentário" onClick={handleDeleteComment}>  
                            <Trash size={20} />
                        </button>
                        ) : null}
                        
                    </header>
                    <p>{comment}</p>
                </div>
                <footer>
                    <button disabled={loading} className={styles.like} onClick={handlePressLike}>
                        <ThumbsUp  />
                        Like <span>{like}</span>
                    </button>
                    <button disabled={loading} className={styles.dislike} onClick={handlePressDislike}>
                        <ThumbsDown   />
                        Dislike <span>{dislike}</span>
                    </button>
                </footer>
            </div>
        </div>
    );
}