import {useState} from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { callApi } from '../services/Axios';
import { ArrowLeft, Check, Pencil, PencilLine, Trash } from '@phosphor-icons/react';
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
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormInput>();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const avatarFile = watch('avatarFile');
  const bannerFile = watch('bannerFile');

  const onSubmit = async (data: UserFormInput) => {
    const { name, role, avatarFile, bannerFile } = data;
    setLoading(true)
    try{
      const formData = new FormData();
      formData.append("name", name ? name as string : state.user?.name as string);
      formData.append("role", role ? role as string : state.user?.role as string);

      if(avatarFile){
        formData.append("avatarFile", avatarFile[0]);
      }
      if(bannerFile){
        formData.append("bannerFile", bannerFile[0]);
      }

      const data = await callApi.put(`/users/${authorId}`, formData,
        {headers: { "Content-Type": "multipart/form-data" }
      })
      
      state.setUser(data.data)
      handleClose()
      mutate()
      setValue('avatarFile', null as any)
      setValue('bannerFile', null as any)
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
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form} encType='multipart/form-data'>
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
            
            <div className={`${styles.block}`}>
              <label htmlFor="avatarFile">
                <span>Avatar Url</span>
                {avatarFile?.length > 0 ? 
                (
                  <div className={styles.editFile}> 
                    <Check size={22} />
                  </div>
                ) : (
                  <div className={styles.editFile}> 
                  <Pencil size={22} />
                  </div>
                )}
                
              </label>
              {avatarFile?.length > 0 ? (<p className={styles.deleteFile} onClick={() => setValue('avatarFile', null as any) }>Deletar arquivo</p>) : null}
              <input 
                defaultValue={state.user?.avatarFile} 
                id="avatarFile" 
                {...register('avatarFile')}
                type="file" 
                title="Avatar Url" 
                className={styles.inputFile}
                />
            </div>

            <div className={`${styles.block}`}>
              <label htmlFor="bannerFile">
                <span>Banner Url</span>
                {bannerFile?.length > 0 ? 
                <div className={styles.editFile}> 
                    <Check size={22} />
                </div> : 
                (
                <div className={styles.editFile}> 
                  <Pencil size={22} />
                </div>)}
                
              </label>
              {bannerFile?.length > 0 ? (<p className={styles.deleteFile} onClick={() => setValue('bannerFile', null as any) }>Deletar arquivo</p>) : null}
              <input
                defaultValue={state.user?.bannerFile} 
                id="bannerFile" 
                {...register('bannerFile')}
                type="file" 
                title="Banner Url"
                className={styles.inputFile}
                />
                
            </div>
            <button 
              className={styles.buttonBase}
              disabled={loading}
              type="submit">
                Salvar
            </button>
          </form>

          
        </Box>  
      </Modal>
    </div>
  );
}