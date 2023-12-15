'use client'
import { useEffect, useState  } from 'react'
import  axios  from 'axios'
import * as S from './style.jsx'

export const MetasUpdate = ({ metaId }) => {
    const [ descricao, setDescricao ] = useState();
    const [ valor, setValor ] = useState();
    const [ dataMeta, setDataMeta ] = useState();
    const [ userId, setUserId ] = useState();
    const [ notification, setNotification ] = useState({
        open: false,
        message: '',
        severity: ''
    });

    const onChangeValue = (e) => {
        const { name, value } = e.target
        if (name === 'descricao') setDescricao(value)
        if (name === 'valor') setValor(value)
        if (name === 'data') setDataMeta(value)
    }

    useEffect (() => {
        const getMeta = async () => {
            try{
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:8080/metas/${ metaId }`, {
                    headers: {
                        Authorization: `Bearer ${ token }`
                    }
            })
            setDescricao(response.data.data.descricao);
            setValor(response.data.data.valor);
            setDataMeta(response.data.data.data);
            setUserId(response.data.data.user_id)
            } catch(error) {
                setNotification({
                    open: true,
                    message: error.response,
                    severity: 'error'
                }); 
            }
        }

        getMeta();
    }, [ metaId ])


    const onSubmit = async (event) => {
        event.preventDefault()
        try{
            const token = localStorage.getItem('token');
            const response = await axios.put(`http://localhost:8080/metas/${ metaId }`, { descricao, valor, data: dataMeta, user_id: userId}, {
                headers: {
                    Authorization: `Bearer ${ token }`
                }
            })
            setNotification({
                open: true,
                message: `Meta ${ descricao } atualizada com sucesso!`,
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

    return (
        <>
            <S.Form onSubmit={ onSubmit }>
                <S.H1>Atualizar meta</S.H1>
                <S.TextField type='text' onChange={onChangeValue} placeholder='Descricao' name="descricao" value={ descricao } label="Descricao" variant="outlined" fullWidth/>
                <S.TextField type='text' onChange={onChangeValue} placeholder='Valor' name="valor" value={ valor } label="Valor" variant="outlined" fullWidth/>
                <S.TextField type='text' onChange={onChangeValue} name="data" value={ dataMeta } label="Data" variant="outlined" fullWidth/>
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

export default MetasUpdate;