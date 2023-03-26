import {useState} from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { callApi } from '../services/Axios';
import { ArrowLeft, PencilLine } from '@phosphor-icons/react';
import styles from './ModalEditUser.module.css'
import { useUserContext } from '../context/UserContext';
import { ModalEditUserProps, UserFormInput } from '../types/EditUserTypes/EditUserTypes';
import { useForm } from 'react-hook-form';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: '#161619',
  border: '2px solid #005f43',
  boxShadow: 24,
  p: 4,
  display: 'Flex',
  flexDirection: 'column',
  justifyContent: 'center',
  aligmItems: 'center',
  gap: "20px",
  borderRadius: "10px",
  maxWidth: "500px",
  width: "100%"
};

export function ModalEditUser({mutate, authorId} : ModalEditUserProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false)

  
  const {state} = useUserContext()
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm<UserFormInput>();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onSubmit = async (data: UserFormInput) => {
    const { name, role, avatarFile, bannerFile } = data;
    setLoading(true)
    try{
      const formData = new FormData();
      formData.append("name", name ? name as string : state.user?.name as string);
      formData.append("role", role ? role as string : state.user?.role as string);
      formData.append("avatarFile", avatarFile[0]);
      formData.append("bannerFile", bannerFile[0]);

      const data = await callApi.put(`/users/${authorId}`, formData,
        {headers: { "Content-Type": "multipart/form-data" }
      })
      state.setUser(data.data)
      handleClose()
      mutate()
    }catch(error){
      console.log(error)
    }finally{
      setLoading(false)
    }
  }

  const handleBackClick = () => {
    handleClose()
  }
 
  return (
    <div>
      <button onClick={handleOpen}>
        <PencilLine size={20} />
            Editar seu perfil
      </button>
      
      <Modal
        open={open}
        style={{padding: "20px", margin: "10px"}}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <ArrowLeft style={{cursor: "pointer"}} color='white' onClick={handleBackClick}/>
          <h1 style={{textAlign: "center", color: "#005f43"}}>Edite seu perfil</h1>
          <form onSubmit={handleSubmit(onSubmit)} encType='multipart/form-data'>
            <div className={styles.block}>
              <label htmlFor="name">Nome</label>
              <input 
                defaultValue={state.user?.name} 
                {...register('name')} 
                id="name" 
                title="Nome" />
            </div>

            <div className={styles.block}>
              <label htmlFor="role">Cargo</label>
              <input 
                defaultValue={state.user?.role} 
                {...register('role')}
                id="role" 
                title="Cargo" />
            </div>
            
            <div className={styles.block}>
              <label htmlFor="avatarFile">Avatar Url</label>
              <input 
                defaultValue={state.user?.avatarFile} 
                id="avatarFile" 
                {...register('avatarFile')}
                type="file" 
                title="Avatar Url" />
            </div>

            <div className={styles.block}>
              <label htmlFor="bannerFile">Banner Url</label>
              <input 
                defaultValue={state.user?.bannerFile} 
                id="bannerFile" 
                {...register('bannerFile')}
                type="file" 
                title="Banner Url"/>
            </div>
            <button 
            className={styles.buttonBase}
            disabled={isLoading}
            type="submit"
            >
                Salvar
            </button>
          </form>

          
        </Box>  
      </Modal>
    </div>
  );
}