import styled from '@emotion/styled'
import ButtonMUI from '@mui/material/Button'
import TextFieldMUI from '@mui/material/TextField'
import SnackbarMUI from '@mui/material/Snackbar'
import AlertMUI from '@mui/material/Alert'
import TypographyMUI from '@mui/material/Typography'
import  LinkNEXT  from 'next/link'
import FormControlMUI from '@mui/material/FormControl';
import InputLabelMUI from '@mui/material/InputLabel';
import OutlinedInputMUI from '@mui/material/OutlinedInput';
import InputAdornmentMUI from '@mui/material/InputAdornment';
import IconButtonMUI from '@mui/material/IconButton';

import VisibilityMUI from '@mui/icons-material/Visibility';
import VisibilityOffMUI from '@mui/icons-material/VisibilityOff';

export const Button = styled(ButtonMUI)`
    color: white;
    margin-bottom: 30px;
`

export const TextField = styled(TextFieldMUI)`
   background-color: white;
   margin-bottom: 44px;
`

export const Form = styled.form`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 12px;
    width: 50vw;
    height: 50px;
`

export const H1 = styled.form`
    font-size: 40px;
    font-weight: bold;
`
export const Alert = styled(AlertMUI)`
`

export const Snackbar = styled(SnackbarMUI)`
`

export const Typography = styled(TypographyMUI)`
    margin-bottom: 40px;
`

export const Link = styled(LinkNEXT)`
    color: ${({ theme }) => theme.palette.primary.main};
    text-decoration: none;
`

export const InputLabel = styled(InputLabelMUI)`
`

export const FormControl = styled(FormControlMUI)`
    background-color: white;
    margin-bottom: 40px;
`
export const OutlinedInput = styled(OutlinedInputMUI)`
`
export const InputAdornment = styled(InputAdornmentMUI)`
`
export const IconButton = styled(IconButtonMUI)`
`
export const Visibility = styled(VisibilityMUI)`
`
export const VisibilityOff = styled(VisibilityOffMUI)`
`