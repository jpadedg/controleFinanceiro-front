'use client'
import { useEffect, useState  } from 'react'
import  axios  from 'axios'
import * as S from './style.jsx'

export const TransacoesCreate = () => {
    const [ descricao, setDescricao ] = useState('');
    const [ valor, setValor ] = useState('');
    const [ tipo, setTipo ] = useState("Receita");
    const [ categoria, setCategoria ] = useState('');
    const [ categorias, setCategorias ] = useState([]);
    const [ dataTransacao, setDataTransacao ] = useState('');

    const [ notification, setNotification ] = useState({
        open: false,
        mesasge: '',
        severity: ''
    });

    useEffect (() => {
        const getCategorias = async () => {
            try{
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:8080/categorias/`, {
                    headers: {
                        Authorization: `Bearer ${ token }`
                    }
            })
            setCategorias(response.data.data);
            console.log(response.data.data)

            } catch(error) {
                setNotification({
                    open: true,
                    message: error.response,
                    severity: 'error'
                }); 
            }
        }

        getCategorias();
    }, [])

    const onChangeValue = (e) => {
        const { name, value } = e.target
        if (name === 'descricao') setDescricao(value)
        if (name === 'valor') setValor(value)
        if (name === 'data') setDataTransacao(value)
        if (name === 'tipo') setTipo(value)
        if (name === 'categoria') setCategoria(value)
    }

    const onSubmit = async (event) => {
        event.preventDefault()
        try{
            const token = localStorage.getItem('token');
            console.log(descricao, valor, dataTransacao)
            const response = await axios.post('http://localhost:8080/transacoes/', { descricao, valor, data: dataTransacao, tipo, categoria_id: categoria }, {
                headers: {
                    Authorization: `Bearer ${ token }`
                }
            })
            setNotification({
                open: true,
                message: `Transação ${ descricao } criada com sucesso!`,
                severity: 'success'
            });           
            localStorage.setItem('token', response.data.data.token)
        }catch(error) {
            console.log(error.response)
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
                <S.H1>Criar transação</S.H1>
                <S.TextField type='text' onChange={onChangeValue} placeholder='Nome' name="descricao" label="Descricao" variant="outlined" fullWidth/>
                <S.TextField type='text' onChange={onChangeValue} placeholder='Valor' name="valor" label="Valor" variant="outlined" fullWidth/>
                <S.TextField type='text' onChange={onChangeValue} name="data" label="Data" variant="outlined" fullWidth/>

                <S.FormControl fullWidth>
                <S.InputLabel id="tipo">Tipo</S.InputLabel>
                <S.Select
                    labelId="tipo"
                    name="tipo"
                    id="tipo_select"
                    value={ tipo }
                    label="Tipo"
                    onChange={ onChangeValue }
                >
                    <S.MenuItem value="Despesa">Despesa</S.MenuItem>
                    <S.MenuItem value="Receita">Receita</S.MenuItem>
                </S.Select>
                </S.FormControl>

                <S.FormControl fullWidth>
                <S.InputLabel id="categoria">Categoria</S.InputLabel>
                <S.Select
                    labelId="categoria"
                    name='categoria'
                    id="categoria_select"
                    value={ categoria }
                    label="Categoria"
                    onChange={ onChangeValue }
                >
                    { categorias?.map(categoria => 
                        <S.MenuItem key={categoria.id} value={categoria.id}> {categoria.name} </S.MenuItem>
                    )}
                </S.Select>
                </S.FormControl>

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

export default TransacoesCreate;