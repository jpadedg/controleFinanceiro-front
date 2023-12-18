'use client'
import axios from 'axios';
import * as S from './style.jsx'
import { useState } from 'react';
import { useRouter } from 'next/navigation'

export const RegisterForm = () => {
    const router = useRouter();
    const [ email, setEmail ] = useState();
    const [ password, setPassword ] = useState();
    const [ name, setName ] = useState();
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
        if (name === 'name') setName(value)
    }

    const onSubmit = async (event) => {
        event.preventDefault()
        try{
            const response = await axios.post('http://localhost:8080/auth/register', { email, password, name })
            localStorage.setItem('token', response.data.data.token)
            setNotification({
                open: true,
                message: `Usuário ${ email } cadastrado com sucesso!`,
                severity: 'success'
            });           
            router.push('/dashboard');
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
            message: '',
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
                <S.Typography variant='h1' color="primary" >YOURfinance.IO</S.Typography>
                <S.Typography variant='h2' >Crie sua conta</S.Typography>
                <S.TextField type='text' onChange={onChangeValue} placeholder='E-mail' name="email" label="E-mail" variant="outlined" fullWidth />
                <S.TextField type='text' onChange={onChangeValue} placeholder='Name' name="name" label="Name" variant="outlined" fullWidth/>

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


                <S.Button type='submit' variant="contained" color="primary" fullWidth>Cadastrar</S.Button>
                <div> Já possui uma conta? <S.Link href='/login'> Faça login aqui.</S.Link></div>
            </S.Form>
            <S.Snackbar open={ notification.open } autoHideDuration={3000} onClose={handleClose}>
                <S.Alert onClose={ handleClose } variant="filled" severity={ notification.severity } sx={{ width: '100%'}}>
                    { notification.message }
                </S.Alert>
            </S.Snackbar>
        </>
    )
}

export default RegisterForm;