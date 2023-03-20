import { Post } from "./components/Post"
import { Header } from "./components/Header"
import { Sidecard } from "./components/Sidebar"
import styles from './App.module.css'
import { fetcher } from "./services/Axios"
import { IPost } from "./components/Post"
import useSWR from "swr";

export function App() {

  const { data: posts, error, isLoading, mutate } = useSWR(
    "/posts", fetcher
  );

  if (error) return "An error has occurred.";
  if (isLoading) return "Loading...";

  return (
    <div >
      <Header/>
      <div className={styles.wrapper}>
        <Sidecard/>
        
        <main>
          {posts?.map((post: IPost) => {
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
          })
          }
        </main>
      </div>
     
    </div>
  )
}



