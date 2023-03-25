import styles from './Post.module.css'
import {Avatar} from '../components/Avatar'
import { Comment } from '../components/Comment';
import { dateFormated, relativeDateFormated } from '../utils/formattingData';
import { FormEvent, useState } from 'react';
import { callApi } from '../services/Axios';
import { Trash } from '@phosphor-icons/react';
import { IPost } from '../types/PostType/types';
import { useUserContext } from '../context/UserContext';

export function Post({mutate, id, content, publishedAt, author, comments} : IPost){

    const publishedDateFormatted = dateFormated(publishedAt)
    const publishedDateRelativeToNow = relativeDateFormated(publishedAt)
    const [comment, setComment] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const {state} = useUserContext()

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        try{
            setLoading(true)
            e.preventDefault()
            await callApi.post('comments', {
                content: comment,
                postId: id,
                authorId: state.user?.id
            })
            setComment('')
            mutate()
        }catch(error){
            console.log(error)
        }finally{
            setLoading(false)
        }
        
    }

    const handleDeletePost = async () => {
        await callApi.delete(`posts/${id}`)
        mutate()
    }

    const isNewCommentEmpty = comment.length === 0
    const defaultUserImage = 'https://i.pinimg.com/originals/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg'

    return (
        <article className={styles.post}>
            <header>
                <div className={styles.author}>
                    <Avatar src={author?.avatarUrl ? author.avatarUrl : defaultUserImage} />
                    <div className={styles.authorInfo}>
                        <strong className={styles.name}>{author?.name}</strong>
                        <span className={styles.role}>{author?.role}</span>
                    </div>
                </div>

                <div className={styles.rightContent}>
                    {state.user?.isAdmin ? (
                        <button title="Deletar Post" onClick={handleDeletePost}>
                        <Trash className={styles.trash} size={20} />
                    </button>
                    ) : null}
                    <time title={publishedDateFormatted} >{publishedDateRelativeToNow}</time>
                </div>
            </header>
            
            <div className={styles.content}>
                {content}
            </div>

            <form className={styles.commentForm} onSubmit={handleSubmit}>
                <strong>Deixe seu feedback</strong>
                <textarea 
                    onChange={(e) => {setComment(e.target.value)}} 
                    placeholder='Deixe um comentário' 
                    value={comment}
                    />
                <footer>
                    <button disabled={isNewCommentEmpty || loading} type='submit'>Publicar</button>
                </footer>
            </form>

            <div className={styles.commentList}>
                {comments?.map((comment) => {
                    return(
                    <Comment 
                        key={comment?.id}
                        id={comment?.id}
                        image={comment.author.avatarUrl}
                        name={comment.author.name}
                        time={comment?.createdAt}
                        comment={comment?.content}
                        mutate={mutate}
                    />
                    )
                })}
            </div>
        </article>
    )
}

