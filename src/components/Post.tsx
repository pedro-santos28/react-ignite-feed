import styles from './Post.module.css'
import {Avatar} from '../components/Avatar'
import { Comment } from '../components/Comment';
import { dateFormated, relativeDateFormated } from '../utils/formattingData';
import { FormEvent, useState } from 'react';
import { callApi } from '../services/Axios';
import { Trash } from '@phosphor-icons/react';

export interface IPost {
    id: number,
    content: string,
    publishedAt: Date,
    author: {
        id: number,
        avatarUrl: string,
        name: string,
        role: string
    }
    comments?: Array<{
        id: number,
        content: string,
        createdAt: Date,
        authorId: number,
        postId: number,
    }>
    mutate: () => void
  }

export function Post({mutate, id, content, publishedAt, author, comments} : IPost){

    const publishedDateFormatted = dateFormated(publishedAt)
    const publishedDateRelativeToNow = relativeDateFormated(publishedAt)

    const [comment, setComment] = useState<string>('')

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await callApi.post('comments', {
            content: comment,
            postId: id
        })
        setComment('')
        mutate()
    }

    const handleDeletePost = async () => {
        await callApi.delete(`posts/${id}`)
        mutate()
    }

    const isNewCommentEmpty = comment.length === 0

    return (
        <article className={styles.post}>
            <header>
                <div className={styles.author}>
                    <Avatar src={author?.avatarUrl} />
                    <div className={styles.authorInfo}>
                        <strong className={styles.name}>{author?.name}</strong>
                        <span className={styles.role}>{author?.role}</span>
                    </div>
                </div>

                <div className={styles.rightContent}>
                    <button title="Deletar Post" onClick={handleDeletePost}>
                        <Trash className={styles.trash} size={20} />
                    </button>
                    
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
                    <button disabled={isNewCommentEmpty} type='submit'>Publicar</button>
                </footer>
            </form>

            <div className={styles.commentList}>
                {comments?.map((comment) => {
                    return(
                    <Comment 
                        key={comment?.id}
                        id={comment?.id}
                        image='https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1143&q=80'
                        name='Bink'
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

