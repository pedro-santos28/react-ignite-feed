import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import FormControl from '@mui/material/FormControl';
import { callApi } from '../services/Axios';
import { ArrowLeft, PencilLine } from '@phosphor-icons/react';
import styles from './ModalEditUser.module.css'

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
}

export function ModalEditUser({mutate} : ModalEditUserProps) {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [role, setRole] = React.useState("");
  const [avatar, setAvatar] = React.useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleEditUserProfile = async () => {
    await callApi.put(`/users/${4}`, {name, role, avatarUrl: avatar})
    handleClose()
    mutate()
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
              <input name="nome" onChange={(e) => {setName(e.target.value)}} id="name" title="Nome" />
            </div>
            <div className={styles.block}>
              <label htmlFor="role">Cargo</label>
              <input name="role" onChange={(e) => {setRole(e.target.value)}} id="role" title="Cargo" />
            </div>
            <div className={styles.block}>
              <label htmlFor="name">Avatar</label>
              <input name="avatar" onChange={(e) => {setAvatar(e.target.value)}} type="input" title="Avatar" />
            </div>
          </FormControl>

          <button 
            className={styles.buttonBase}
            onClick={handleEditUserProfile}>
                Salvar
          </button>
        </Box>  
      </Modal>
    </div>
  );
}