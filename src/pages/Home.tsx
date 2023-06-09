import { Post } from '../components/Post'
import { Sidecard } from '../components/Sidebar'
import { fetcher } from '../services/Axios' 
import { IPost } from '../types/PostType/types'; 
import useSWR from "swr";
import styles from './Home.module.css'
import { useUserContext } from '../context/UserContext';

export function Home() {

    const { state } = useUserContext();

    const { data: posts, error, isLoading, mutate } = useSWR(
        "/posts", url => fetcher(url, { headers: { Authorization: `Bearer ${state.JWT}`} })
      );

    console.log(posts)

    if (error) return <div>An error has occurred.</div>;
    if (isLoading) return <div>Loading...</div>;

  return (
    <div className={styles.wrapper}>
    <Sidecard mutate={mutate}/>
        <main>
          {posts.length > 0 ? posts?.map((post: IPost) => {
            return (
              <Post 
                key={post.id}
                id={post.id}
                content={post.content}
                publishedAt={post.publishedAt}
                author={post.author}
                comments={post.comments}
                mutate={mutate}
              />
            )
          }) : (
            <div>
              <h2>Sem postagens ainda... {':('} </h2>
              <h2>Crie agora mesmo uma postagem para compartilhar suas ideias</h2>
            </div>
          )}
        </main>
    </div>
  )
}
