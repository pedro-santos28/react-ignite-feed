import {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { callApi } from '../services/Axios'
import styles from './Register.module.css'

export const Register = () => {

  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const passwordIsValid = password === passwordConfirmation

    try {
      if (!passwordIsValid) {
        throw new Error('Senhas não conferem')
      }

      await callApi.post('/signin', {
        name,
        email,
        password,
      })
      setName('')
      setEmail('')
      setPassword('')
      setPasswordConfirmation('')
      toast.success("Conta criada com sucesso", {
        autoClose: 2400,
      })
      
      setTimeout(() => {
        navigate('/login')
      }, 3000)
      

    }catch(error: any) {
      toast.error(error.message, {
        autoClose: 2400,
      })
    }
    finally{
      setLoading(true)
    }
  }

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
      <h1>Registre-se abaixo</h1>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="name">Nome</label>
          <input className={styles.input} id='name' type="text" placeholder='Digite seu nome' onChange={(e) => setName(e.target.value)}/>
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="">Email</label>
          <input className={styles.input} type="email" placeholder='Digite seu email' onChange={(e) => setEmail(e.target.value)}/>
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="password">Senha</label>
          <input className={styles.input} id="password" type="password" placeholder='Digite sua senha' onChange={(e) => setPassword(e.target.value)}/>
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="passwordConfirmation">Confirmação de senha</label>
          <input className={styles.input} id="passwordConfirmation" type="password" placeholder='Confirme sua senha' onChange={(e) => setPasswordConfirmation(e.target.value)}/>
        </div>
        <div className={styles.field}> 
          <button disabled={loading} type='submit'>Criar conta</button>
        </div>
      </form>
    </div>
  )
}