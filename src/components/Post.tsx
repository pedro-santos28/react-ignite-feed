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
    const {state} = useUserContext()

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await callApi.post('comments', {
            content: comment,
            postId: id,
            authorId: state.user?.id
        })
        setComment('')
        mutate()
    }

    const handleDeletePost = async () => {
        await callApi.delete(`posts/${id}`)
        mutate()
    }

    const isNewCommentEmpty = comment.length === 0
    const defaultAvatar = 'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8Z2F0b3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'

    return (
        <article className={styles.post}>
            <header>
                <div className={styles.author}>
                    <Avatar src={author?.avatarUrl ? author.avatarUrl : defaultAvatar} />
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
                    <button disabled={isNewCommentEmpty} type='submit'>Publicar</button>
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

