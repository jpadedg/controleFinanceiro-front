'use client'
import { useEffect, useState  } from 'react'
import  axios  from 'axios'
import * as S from './style.jsx'

export const CategoriasCreate = () => {
    const [ name, setName ] = useState();
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
            console.log(error.response.data.error)
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

    return (
        <>
            <S.Form onSubmit={ onSubmit }>
                <S.H1>Criar categoria</S.H1>
                <S.TextField type='text' onChange={onChangeValue} placeholder='Nome' name="name" label="Nome" variant="outlined" fullWidth/>
                <S.Button type='submit' variant="contained" color="success">Entrar</S.Button>
            </S.Form>
            <S.Snackbar open={ notification.open } autoHideDuration={3000} onClose={handleClose}>
                <S.Alert onClose={ handleClose } variant="filled" severity={ notification.severity } sx={{ width: '100%'}}>
                    { notification.message }
                </S.Alert>
            </S.Snackbar>
        </>
    )
}

export default CategoriasCreate;