import {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { callApi } from '../services/Axios'
import styles from './Register.module.css'
import { z } from "zod";

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

  const navigate = useNavigate()

  const [name, setName] = useState<formDataType['name']>('')
  const [email, setEmail] = useState<formDataType['email']>('')
  const [password, setPassword] = useState<formDataType['password']>('')
  const [passwordConfirmation, setPasswordConfirmation] = useState<formDataType['passwordConfirmation']>('')
  const [formError, setFormError] = useState<string>('');
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formDataToValidate = {
      name,
      email,
      password,
      passwordConfirmation,
    };

    setLoading(true)
    try {
      formData.parse(formDataToValidate);
      setFormError('');

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
      }, 700)

    }catch(error: any) {
      if(error.response.data.message.meta.target[0]){
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