import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import FormControl from '@mui/material/FormControl';
import { callApi } from '../services/Axios';
import { ArrowLeft } from '@phosphor-icons/react';
import styles from './ModalCreatePost.module.css'
import {PlusSquare} from '@phosphor-icons/react'
import { useUserContext } from '../context/UserContext';

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

type ModalCreatePostProps = {
  mutate: () => void
  authorId?: number
}


export function ModalCreatePost({mutate, authorId} : ModalCreatePostProps) {

  const [open, setOpen] = React.useState(false);
  const [content, setContent] = React.useState("");
  const [loading, setLoading] = React.useState(false)
  const {state} = useUserContext()

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleCreatePost = async () => {
    setLoading(true)
    try{
      await callApi.post("/posts", {content: content, authorId},
      { headers: 
        {
          Authorization: `Bearer ${state.JWT}`
        }
      }
      )
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
      <button className={styles.buttonBase} onClick={handleOpen}>
      <PlusSquare size={20} />
        Criar postagem</button>
      <Modal
        style={{padding: "20px", margin: "10px"}}
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <ArrowLeft style={{cursor: "pointer"}} color='white' onClick={handleBackClick}/>
          <h1 style={{textAlign: "center", color: "#005f43"}}>Crie uma nova postagem</h1>
          <FormControl>
            <label htmlFor="content">Conteúdo</label>
            <textarea name="content" onChange={(e) => {setContent(e.target.value)}} id="content" title="Conteudo" 
            style={{height: "100px", border:"1px solid black", borderRadius: "5px"}} />
          </FormControl>

          <button 
            className={styles.buttonBase}
            disabled={content.length === 0 || loading}
            onClick={handleCreatePost} 
              >
                Salvar
          </button>
        </Box>  
      </Modal>
    </div>
  );
}