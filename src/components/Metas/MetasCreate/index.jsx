'use client'
import { Fragment, forwardRef, useEffect, useState  } from 'react'
import  axios  from 'axios'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { NumericFormat } from 'react-number-format';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import * as S from './style.jsx'
import { Button } from '@mui/material';
import { format, parseISO  } from 'date-fns';
import { ptBR } from 'date-fns/locale'

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

export const MetasCreate = () => {
    const [ open, setOpen ] = useState(false);
    const [ descricao, setDescricao ] = useState();
    const [ valor, setValor ] = useState();
    const [ dataMeta, setDataMeta ] = useState();

    const [ notification, setNotification ] = useState({
        open: false,
        mesasge: '',
        severity: ''
    });


    const onChangeValue = (e) => {
        const { name, value } = e.target
        if (name === 'descricao') setDescricao(value)
        if (name === 'data') setDataMeta(value)
        if (name === 'valor') {
            setValor(value * 100 )
        }
    }

    const onSubmit = async (event) => {
        event.preventDefault()
        const newData = new Date(dataMeta)
        try{
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:8080/metas/', { descricao, valor, data: dataMeta }, {
                headers: {
                    Authorization: `Bearer ${ token }`
                }
            })
            setNotification({
                open: true,
                message: `Meta ${ descricao } criada com sucesso!`,
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
                <S.Button variant="contained" onClick={handleClickOpenModal}>
                    Criar Meta
                </S.Button>
                <Dialog open={open} onClose={handleCloseModal}>
                    <DialogTitle>Criar Nova Meta</DialogTitle>
                    <DialogContent>
                        <DialogContentText style={{ marginBottom: '15px' }}>
                            Para adicionar uma nova Meta coloque o nome, o valor e a data.
                        </DialogContentText>
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

                        <LocalizationProvider dateAdapter={ AdapterDateFns } adapterLocale={ ptBR } >
                            <DatePicker onChange={(newValue) => {
                                const dataFormatada = newValue ? format(newValue, 'yyyy-MM-dd') : null;
                                setDataMeta(dataFormatada);
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

export default MetasCreate;