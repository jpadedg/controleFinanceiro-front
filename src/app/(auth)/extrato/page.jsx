'use client';
import Button from '@mui/material/Button'
import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import CategoriasCreate from '@/components/Categorias/CategoriasCreate';
import MetasCreate from '@/components/Metas/MetasCreate';
import TransacoesCreate from '@/components/Transacoes/TransacoesCreate';


export const ExtratoPage = () => {
    const [openModalCategoria, setopenModalCategoriaCategoria] = useState(false);
    const [user , setUser ] = useState({
        id: null
    })

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(!token){
            window.location.href = '/login';
        }
        axios.get('http://localhost:8080/users/me', {
            headers: {
                'Authorization': `Bearer ${ token }`
            }
        }).then((response) => {
            setUser(response.data.data)
        }).catch( error => {
            window.location.href = '/login';
        })
    
    }, [])

    return (

        <>
            <div style={{ display: 'flex', gap: '15px' }}>
                <CategoriasCreate />
                <MetasCreate />
                <TransacoesCreate />
            </div>
        </>

    )
}

export default ExtratoPage;