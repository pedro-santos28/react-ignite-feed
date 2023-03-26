import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { callApi } from '../services/Axios'
import styles from './Login.module.css'
import {useUserContext} from "../context/UserContext"
import { toast } from 'react-toastify'

export const Login = () => {

  const {state} = useUserContext()
  
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setLoading(true)
    try {
      event.preventDefault()
      const data = await callApi.post('/login', {
        email,
        password,
      })

      state.setIsAuthenticated(data.data.auth)
      state.setJWT(data.data.token)
      state.setUser(data.data.userResponseDTO)

      toast.success('Login realizado com sucesso')
      
      localStorage.setItem('token', data.data.token)
      localStorage.setItem('auth', data.data.auth)
      localStorage.setItem('user', JSON.stringify(data.data.userResponseDTO))

      navigate('/')
    }
    catch(error: any) {
      console.log(error)
      if(error.response.data.message === "Invalid credentials"){
        toast.error('Credenciais inválidas')
      }
      else if(error.response.data.message === "User not found"){
        toast.error('Usuário não encontrado')
      }
    }
    finally{
      setLoading(false)
    }
  }

  return (
    <div className={styles.container}>
    <form className={styles.form} onSubmit={handleSubmit}>
    <h1>Faça login</h1>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="">Email</label>
        <input className={styles.input} type="email" placeholder='Digite seu email' onChange={(e) => setEmail(e.target.value)}/>
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="password">Senha</label>
        <input className={styles.input} id="password" type="password" placeholder='Digite sua senha' onChange={(e) => setPassword(e.target.value)}/>
      </div>

      <div className={styles.field}> 
        <button disabled={loading} type='submit'>Entrar</button>
      </div>

      <div className={styles.field}> 
        <p>Ainda não tem conta? <Link className={styles.registerLink} to="/register"> Cadastre-se agora mesmo</Link> </p>
      </div>
    </form>
  </div>
  )
}
