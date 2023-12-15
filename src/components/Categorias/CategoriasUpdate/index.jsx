'use client'
import { useEffect, useState  } from 'react'
import  axios  from 'axios'
import * as S from './style.jsx'

export const CategoriasUpdate = ({ categoriaId }) => {
    const [ name, setName ] = useState();
    const [ userId, setUserId ] = useState();
    const [ notification, setNotification ] = useState({
        open: false,
        message: '',
        severity: ''
    });

    const onChangeValue = (e) => {
        const { name, value } = e.target
        if (name === 'name') setName(value)
    }

    useEffect (() => {
        const getCategoria = async () => {
            try{
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:8080/categorias/${ categoriaId }`, {
                    headers: {
                        Authorization: `Bearer ${ token }`
                    }
            })
            setName(response.data.data.name);
            setUserId(response.data.data.user_id)
            } catch(error) {
                setNotification({
                    open: true,
                    message: error.response,
                    severity: 'error'
                }); 
            }
        }

        getCategoria();
    }, [ categoriaId ])


    const onSubmit = async (event) => {
        event.preventDefault()
        try{
            const token = localStorage.getItem('token');
            const response = await axios.put(`http://localhost:8080/categorias/${ categoriaId }`, { name , user_id: userId}, {
                headers: {
                    Authorization: `Bearer ${ token }`
                }
            })
            setNotification({
                open: true,
                message: `Categoria ${ name } atualizada com sucesso!`,
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
                <S.H1>Atualizar categoria</S.H1>
                <S.TextField type='text' onChange={onChangeValue} placeholder='Nome' name="name" value={name} label="Nome" variant="outlined" fullWidth/>
                <S.Button type='submit' variant="contained" color="success">Atualizar</S.Button>
            </S.Form>
            {(notification.severity != '') && <S.Snackbar open={ notification.open } autoHideDuration={3000} onClose={handleClose}>
                <S.Alert onClose={ handleClose } variant="filled" severity={ notification.severity } sx={{ width: '100%'}}>
                    { notification.message }
                </S.Alert>
            </S.Snackbar>}
        </>
    )
}

export default CategoriasUpdate;