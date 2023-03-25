import { AppRoutes } from "./AppRoutes"
import { Layout } from "./components/Layout"
import { Home } from "./pages/Home"
import {UserContextProvider} from "./context/UserContext"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function App() {

  return (
    <UserContextProvider>
      <ToastContainer />
      <AppRoutes> 
          <Layout>
              <Home />
          </Layout>
      </AppRoutes>
    </UserContextProvider>
  )
}



