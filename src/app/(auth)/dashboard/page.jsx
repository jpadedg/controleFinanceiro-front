'use client';
import axios from "axios";
import { useEffect } from "react";
import CategoriasCreate from "../../../components/Categorias/CategoriasCreate"
import CategoriasUpdate from "../../../components/Categorias/CategoriasUpdate"
import MetasCreate from "@/components/Metas/MetasCreate";
import MetasUpdate from "@/components/Metas/MetasUpdate";
import TransacoesCreate from "@/components/Transacoes/TransacoesCreate";
import TransacoesUpdate from "@/components/Transacoes/TransacoesUpdate";

export const DashboardPage = () => {
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
            console.log(response)
        }).catch( error => {
            window.location.href = '/login';
        })

    }, [])

    return (
        <div>
            <h1>dashboard</h1>
            
            <CategoriasCreate></CategoriasCreate>
            {/*<CategoriasUpdate categoriaId={ 11 }></CategoriasUpdate>*/}
            <MetasCreate ></MetasCreate>
            {/*<MetasUpdate metaId={ 2 }></MetasUpdate> */}
            {/*<TransacoesCreate></TransacoesCreate>*/}
            <TransacoesUpdate transacaoId={1}></TransacoesUpdate>
        </div>
    )
}

export default DashboardPage;