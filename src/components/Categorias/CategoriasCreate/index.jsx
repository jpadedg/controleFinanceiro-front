'use client'
import { Fragment, useEffect, useState  } from 'react'
import  axios  from 'axios'
import * as S from './style.jsx'
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from '@mui/material';

export const CategoriasCreate = () => {
    const [ name, setName ] = useState();
    const [ open, setOpen ] = useState(false);
    const [ notification, setNotification ] = useState({
        open: false,
        mesasge: '',
        severity: ''
    });

    const onChangeValue = (e) => {
        const { name, value } = e.target
        if (name === 'name') setName(value)
    }

    const onSubmit = async (event) => {
        event.preventDefault()
        try{
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:8080/categorias/', {name}, {
                headers: {
                    Authorization: `Bearer ${ token }`
                }
            })
            setNotification({
                open: true,
                message: `Categoria ${ name } criada com sucesso!`,
                severity: 'success'
            });           
            localStorage.setItem('token', response.data.data.token)
        }catch(error) {
            setNotification({
                open: true,
                message: error.response.data.error,
                severity: 'error'
            });
        }
    }

    const handleClose = (_, reason) => {
        if (reason === 'clickaway'){
            return ;
        }
        setNotification({
            open: false,
            messsage: '',
            severity: ''
        });
    }

    const handleClickOpenModal = () => {
        setOpen(true);
      };
    
      const handleCloseModal = () => {
        setOpen(false);
      };


    return (
        <>
            <Fragment>
                <Button variant="contained" onClick={handleClickOpenModal}>
                    Criar Categoria
                </Button>
                <Dialog open={open} onClose={handleCloseModal}>
                    <DialogTitle>Criar Nova Categoria</DialogTitle>
                    <DialogContent>
                    <DialogContentText>
                        Para adicionar uma nova categoria, <br/>coloque o nome a seguir.
                    </DialogContentText>
                    <TextField
                        onChange={onChangeValue}
                        autoFocus
                        margin="dense"
                        id="name"
                        name='name'
                        label="Categoria"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleCloseModal}>Cancel</Button>
                    <Button onClick={onSubmit}>Salvar</Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
            <S.Snackbar open={ notification.open } autoHideDuration={3000} onClose={handleClose}>
                <S.Alert onClose={ handleClose } variant="filled" severity={ notification.severity } sx={{ width: '100%'}}>
                    { notification.message }
                </S.Alert>
            </S.Snackbar>
        </>
    )
}

export default CategoriasCreate;