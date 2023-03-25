import { Layout } from './components/Layout'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import ProtectedRoute from './utils/ProtectedRoute'
import { useUserContext } from './context/UserContext'

type PropsType = {
  children: React.ReactNode
}

export const AppRoutes = ({children} : PropsType ) => {

  const {state} = useUserContext()

  return (
    <BrowserRouter>
        <Routes>
            <Route element={<Layout/>}> 

              <Route element={<ProtectedRoute authentication={state?.isAuthenticated}></ProtectedRoute>}> 
                <Route index path="/" element={<Home/>}/> 
              </Route>

              <Route path="/login" element={<Login/>}/> 
              <Route path="/register" element={<Register/>}/> 

            </Route>
        </Routes>
    </BrowserRouter>
  )
}
