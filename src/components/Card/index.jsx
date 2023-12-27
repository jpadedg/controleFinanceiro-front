'use client'
import { Icon } from '@mui/material';
import * as S from './style.jsx'
import { useEffect, useState } from 'react';
import axios from 'axios';

export const Card = ({ children, label, valor, isMeta, saldoTotal = 0 })  => {
    const [ metas, setMetas ] = useState([])
    const [ meta, setMeta ] = useState(0)

    const onChangeValue = (e) => {
        const { name, value } = e.target
        if (name === 'meta') {
            setMeta(value);
        }
    }

    useEffect (() => {
        const getMetas = async () => {
            try{
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:8080/metas/`, {
                    headers: {
                        Authorization: `Bearer ${ token }`
                    }
            })
            setMetas(response.data.data)
            } catch(_) {}
        }
        getMetas();
    }, [meta])

    return (
        <S.ChartContainer> 
            <S.IconWraper >
                <Icon sx={{ color: '#fff' }}>{ children }</Icon>
            </S.IconWraper>
            <S.Content  style={{ marginBottom: '15px' }}>
                <S.Content>{ label }</S.Content>
                { !isMeta && <S.Content style={{ fontWeight: '600', fontSize: '18px' }}>{ valor }</S.Content> }
                { isMeta && <S.Content style={{ fontWeight: '600', fontSize: '18px' }}>{ meta ? `${( ((meta - saldoTotal)/ meta ) * 100).toFixed(0)}%` : 'RS: 0'  }</S.Content> }
            </S.Content> 

            { isMeta && 
                <S.FormControl fullWidth>
                    <S.InputLabel id="meta">Metas</S.InputLabel>
                    <S.Select
                        labelId="meta"
                        name='meta'
                        id="meta_select"
                        value={ meta }
                        label="Meta"
                        onChange={ onChangeValue }
                    >
                        { metas.map(meta => 
                            <S.MenuItem key={meta.id} value={meta.valor}> {meta.descricao} </S.MenuItem>
                        )}
                    </S.Select>
                </S.FormControl>
            }
        </S.ChartContainer>
    )
}

export default Card;