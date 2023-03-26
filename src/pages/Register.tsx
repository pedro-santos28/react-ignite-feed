import {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { callApi } from '../services/Axios'
import styles from './Register.module.css'
import { z } from "zod";
import { useForm } from 'react-hook-form'

export const Register = () => {

  const formData = z.object({
    name: z.string({
      required_error: "O nome é obrigatório",
    }).min(3, {
      message: "O nome deve ter no mínimo 3 caracteres",
    }).nonempty(),

    email: z.string({
      required_error: "O email é obrigatório",
    }).email({
      message: "O email deve ser válido",
    }),

    password: z.string().min(6, {
      message: "A senha deve ter no mínimo 6 caracteres",
    }),
    passwordConfirmation: z.string(),
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: 'Senhas não conferem',
    path: ['password'],
  });

  type formDataType = z.infer<typeof formData>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formDataType>();

  const navigate = useNavigate()
 
  const [loading, setLoading] = useState(false)

  const onSubmit = async (data: any) => {
    setLoading(true)
    const {name, email, password, passwordConfirmation} = data
    try {
      formData.parse({name, email, password, passwordConfirmation});

      await callApi.post('/signin', {
        name,
        email,
        password,
      })
      
      toast.success("Conta criada com sucesso", {
        autoClose: 2400,
      })
      
      setTimeout(() => {
        navigate('/login')
      }, 700)

    }catch(error: any) {
      if(error.response?.data?.message.meta.target[0]){
        toast.error("Este email já está sendo utilizado", {
          autoClose: 2400,
        })
      }
      if (error instanceof z.ZodError) {
        const errorMessage = error.errors[0].message;
        toast.error(errorMessage, {
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
      <h1>Registre-se abaixo</h1>
        <div className={styles.field}>
          <label 
            className={styles.label} 
            htmlFor="name"
          >Nome
          </label>

          <input 
            className={styles.input} 
            id='name' 
            type="text" 
            placeholder='Digite seu nome' 
            {...register('name')}/>
        </div>

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
          <label 
          className={styles.label} 
          htmlFor="passwordConfirmation">Confirmação de senha</label>

          <input 
            className={styles.input} 
            id="passwordConfirmation" 
            type="password" 
            placeholder='Confirme sua senha' 
            {...register('passwordConfirmation')}/>
        </div>
        <div className={styles.field}> 
          <button disabled={loading} type='submit'>Criar conta</button>
        </div>
      </form>
    </div>
  )
}