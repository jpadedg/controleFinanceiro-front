'use client'
import { useEffect, useState } from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Card from "../Card";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import FlakyIcon from '@mui/icons-material/Flaky';


export const Panel = () => {
    const [ somatorio, setSomatorio ] = useState({
        total: 0,
        receita: 0,
        despesa: 0,
    })

    useEffect (() => {
        const getTransacoes = async () => {
            try{
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:8080/transacoes/`, {
                    headers: {
                        Authorization: `Bearer ${ token }`
                    }
            })

            const somatorio = {}

            for(const transacao of response.data.data) {
                if(transacao.tipo === 'Receita') {
                    somatorio.receita = somatorio.receita ? somatorio.receita + transacao.valor : transacao.valor;
                }
                if(transacao.tipo === 'Despesa') {
                    somatorio.despesa = somatorio.despesa ? somatorio.despesa + transacao.valor : transacao.valor;
                }
            }
           
            somatorio.total = somatorio.receita - somatorio.despesa;
            setSomatorio(somatorio)
            } catch(_) {}
        }
      getTransacoes();
    }, [])

    return (
        <div> 
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Card label="Saldo Atual" valor={ `R$ ${ somatorio.total/100 }` }>
                        <AttachMoneyIcon/>
                    </Card>
                    <div style={{ marginBottom: '15px' }}></div>
                    <Card label="Despesas" valor={ `R$ ${ somatorio.despesa/100 }` }>
                        <MoneyOffIcon/>
                    </Card>
                </Grid>
                <Grid item xs={6}>
                    <Card label="Receitas" valor={ `R$ ${ somatorio.receita/100 }` }>
                        <PriceCheckIcon/>
                    </Card>
                    <div style={{ marginBottom: '15px' }}></div>
                    <Card label="Meta" saldoTotal={ somatorio.total } isMeta>
                        <FlakyIcon/>
                    </Card>
                </Grid>
            </Grid>
        </div>
    )
}

export default Panel;