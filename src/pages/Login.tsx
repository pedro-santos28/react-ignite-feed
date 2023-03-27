import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { callApi } from '../services/Axios'
import styles from './Login.module.css'
import {useUserContext} from "../context/UserContext"
import { toast } from 'react-toastify'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { watch } from 'fs'

export const Login = () => {

  const formData = z.object({
    email: z.string({
      required_error: "O email é obrigatório",
    }).email({
      message: "O email deve ser válido",
    }),

    password: z.string().min(6, {
      message: "A senha deve ter no mínimo 6 caracteres",
    }),
  });

  type formDataType = z.infer<typeof formData>;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<formDataType>();

  const {state} = useUserContext()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const watchingEmail = watch('email')
  const watchingPassword = watch('password')
  const areFieldsEmpty = !!watchingEmail && !!watchingPassword

  const onSubmit = async (data: formDataType ) => {
    
    const { email, password} = data

    setLoading(true)
    try {
      formData.parse({email, password});

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
       if (error instanceof z.ZodError) {
        const errorMessage = error.errors[0].message;
        toast.error(errorMessage, {
          autoClose: 2400,
        })
      }
      if(error.response.data.message){
        toast.error('Credenciais inválidas', {
          autoClose: 2400,
        })
      }
    }
    finally{
      setLoading(false)
    }
  }

  return (
    <div className={styles.container}>
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
    <h1>Faça login</h1>

      <div className={styles.field}>
        <label 
          className={styles.label} 
          htmlFor="">Email</label>
        <input 
          className={styles.input} 
          type="email" 
          placeholder='Digite seu email' 
          {...register('email')}/>
      </div>

      <div className={styles.field}>
        <label 
          className={styles.label} 
          htmlFor="password">Senha</label>
        <input 
          className={styles.input} 
          id="password" 
          type="password" 
          placeholder='Digite sua senha' 
          {...register('password')}/>
      </div>

      <div className={styles.field}> 
        <button disabled={loading || !areFieldsEmpty} type='submit'>Entrar</button>
      </div>

      <div className={styles.field}> 
        <p>Ainda não tem conta? <Link className={styles.registerLink} to="/register"> Cadastre-se agora mesmo</Link> </p>
      </div>
    </form>
  </div>
  )
}
