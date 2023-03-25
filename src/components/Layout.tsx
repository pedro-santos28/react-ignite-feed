import { Outlet } from 'react-router-dom'
import { Header } from './Header'

type PropsType = {
  children?: React.ReactNode
}

export const Layout = (props: PropsType) => {
  return (
    <div>
      <Header/>
      <main>
        <Outlet/>
      </main>
    </div>
  )
}
