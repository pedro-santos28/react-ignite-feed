import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import FormControl from '@mui/material/FormControl';
import { callApi } from '../services/Axios';
import { ArrowLeft, PencilLine } from '@phosphor-icons/react';
import styles from './ModalEditUser.module.css'
import { useUserContext } from '../context/UserContext';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: '#161619',
  border: '2px solid #005f43',
  boxShadow: 24,
  p: 4,
  display: 'Flex',
  flexDirection: 'column',
  justifyContent: 'center',
  aligmItems: 'center',
  gap: "20px",
  borderRadius: "10px"
};

type ModalEditUserProps = {
  mutate: () => void
  authorId?: number
}

export function ModalEditUser({mutate, authorId} : ModalEditUserProps) {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [role, setRole] = React.useState("");
  const [avatarUrl, setAvatarUrl] = React.useState("");
  const [bannerUrl, setBannerUrl] = React.useState("");
  const [loading, setLoading] = React.useState(false)

  const {state} = useUserContext()
  

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleEditUserProfile = async () => {
    setLoading(true)
    try{
      const treatedName = name.length > 0 ? name : state.user?.name
      const treatedRole = role.length > 0 ? role : state.user?.role
      const treatedAvatarUrl = avatarUrl.length > 0 ? avatarUrl : state.user?.avatarUrl
      const treatedBannerUrl = bannerUrl.length > 0 ? bannerUrl : state.user?.bannerUrl
  
      const data = await callApi.put(`/users/${authorId}`, {treatedName, treatedRole, treatedAvatarUrl, treatedBannerUrl})
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
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <ArrowLeft style={{cursor: "pointer"}} color='white' onClick={handleBackClick}/>
          <h1 style={{textAlign: "center", color: "#005f43"}}>Edite seu perfil</h1>
          <FormControl>
            <div className={styles.block}>
              <label htmlFor="name">Nome</label>
              <input defaultValue={state.user?.name} name="nome" onChange={(e) => {setName(e.target.value)}} id="name" title="Nome" />
            </div>

            <div className={styles.block}>
              <label htmlFor="role">Cargo</label>
              <input defaultValue={state.user?.role} name="role" onChange={(e) => {setRole(e.target.value)}} id="role" title="Cargo" />
            </div>
            
            <div className={styles.block}>
              <label htmlFor="avatarUrl">Avatar Url</label>
              <input defaultValue={state.user?.avatarUrl} id="avatarUrl" onChange={(e) => {setAvatarUrl(e.target.value)}} type="input" title="Avatar Url" />
            </div>

            <div className={styles.block}>
              <label htmlFor="bannerUrl">Banner Url</label>
              <input defaultValue={state.user?.bannerUrl} id="bannerUrl" onChange={(e) => {setBannerUrl(e.target.value)}} type="input" title="Banner Url" />
            </div>
          </FormControl>

          <button 
            className={styles.buttonBase}
            onClick={handleEditUserProfile}
            disabled={loading}
            >
                Salvar
          </button>
        </Box>  
      </Modal>
    </div>
  );
}