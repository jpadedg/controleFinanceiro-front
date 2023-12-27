'use client'
import { Fragment, forwardRef, useEffect, useState  } from 'react'
import  axios  from 'axios'
import * as S from './style.jsx'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { Button } from '@mui/material';
import { format, parseISO  } from 'date-fns';
import { ptBR } from 'date-fns/locale'
import { NumericFormat } from 'react-number-format';


const NumericFormatCustom = forwardRef(function NumericFormatCustom(
    props,
    ref,
  ) {
    const { onChange, ...other } = props;
  
    return (
      <NumericFormat
        {...other}
        getInputRef={ref}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        thousandSeparator = "."
        decimalSeparator = ","
        valueIsNumericString
        prefix="R$ "
      />
    );
  });

export const TransacoesCreate = () => {
    const [ open, setOpen ] = useState(false);
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
        if (name === 'data') setDataTransacao(value)
        if (name === 'tipo') setTipo(value)
        if (name === 'categoria') setCategoria(value)
        if (name === 'valor') {
            setValor(value * 100 )
        }    
    }

    const onSubmit = async (event) => {
        event.preventDefault()
        try{
            const token = localStorage.getItem('token');
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
                <S.Button variant="contained" onClick={handleClickOpenModal}>
                    Criar Transação
                </S.Button>
                <Dialog open={open} onClose={handleCloseModal}>
                    <DialogTitle>Criar Nova Transação</DialogTitle>
                    <DialogContent>
                        <S.TextField type='text' onChange={onChangeValue} placeholder='Nome' name="descricao" label="Descricao" variant="outlined" fullWidth/>                        
                        
                        <S.TextField
                            label="Valor"
                            onChange={ onChangeValue }
                            name="valor"
                            variant="outlined"
                            id="formatted-numberformat-input"
                            InputProps={{
                            inputComponent: NumericFormatCustom,
                            }}
                            fullWidth
                        />

                        <S.FormControl style={{ marginBottom: '25px'}}  fullWidth>
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

                    <S.FormControl style={{ marginBottom: '25px' }} fullWidth>
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

                    <LocalizationProvider dateAdapter={ AdapterDateFns } adapterLocale={ ptBR } >
                        <DatePicker onChange={(newValue) => {
                            const dataFormatada = newValue ? format(newValue, 'yyyy-MM-dd') : null;
                            setDataTransacao(dataFormatada);
                        }}/>
                    </LocalizationProvider>

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

export default TransacoesCreate;