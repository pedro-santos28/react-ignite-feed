import { Post } from "./components/Post"
import { Header } from "./components/Header"
import { Sidecard } from "./components/Sidebar"
import styles from './App.module.css'

export function App() {

  return (
    <div >
      <Header/>

      <div className={styles.wrapper}>
        
        <Sidecard/>
        
        <main>
          <Post />
        </main>
      </div>
     
    </div>
  )
}



