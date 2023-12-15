'use client'
import { useEffect, useState  } from 'react'
import  axios  from 'axios'
import * as S from './style.jsx'

export const LoginForm = () => {
    const [ email, setEmail ] = useState();
    const [ password, setPassword ] = useState();
    const [ showPassword, setShowPassword ] = useState(false);

    const [ notification, setNotification ] = useState({
        open: false,
        mesasge: '',
        severity: ''
    });

    const onChangeValue = (e) => {
        const { name, value } = e.target
        if (name === 'email') setEmail(value)
        if (name === 'password') setPassword(value)
    }

    const onSubmit = async (event) => {
        event.preventDefault()
        try{
            console.log(email, password)
            const response = await axios.post('http://localhost:8080/auth/login', { email, password })
            setNotification({
                open: true,
                message: `Usuário ${ email } autententicado com sucesso!`,
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

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <>
            <S.Form onSubmit={ onSubmit }>
                <S.Typography variant='h1' color="primary" style={{ marginBottom: '64px' }} >YOURfinance.IO</S.Typography>
                <S.TextField type='text' onChange={onChangeValue} placeholder='E-mail' name="email" label="E-mail" variant="outlined" fullWidth/>

                <S.FormControl fullWidth variant="outlined" name="password">
                    <S.InputLabel htmlFor="outlined-adornment-password">Password</S.InputLabel>
                    <S.OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        name='password'
                        onChange={onChangeValue}
                        endAdornment={
                        <S.InputAdornment position="end">
                            <S.IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                            >
                            {showPassword ? <S.VisibilityOff /> : <S.Visibility />}
                            </S.IconButton>
                        </S.InputAdornment>
                        }
                        label="Password"
                    />
                </S.FormControl>

                <S.Button type='submit' variant="contained" color="primary" fullWidth>Entrar</S.Button>
                <S.Link href='/register'> Criar uma conta </S.Link>
            </S.Form>
            <S.Snackbar open={ notification.open } autoHideDuration={3000} onClose={handleClose}>
                <S.Alert onClose={ handleClose } variant="filled" severity={ notification.severity } sx={{ width: '100%'}}>
                    { notification.message }
                </S.Alert>
            </S.Snackbar>
        </>
    )
}

export default LoginForm;