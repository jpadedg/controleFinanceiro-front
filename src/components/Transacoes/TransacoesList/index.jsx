'use client'
import { useEffect, useState } from 'react';
import * as S from './style.jsx'
import  axios  from 'axios'
import { format, compareAsc  } from 'date-fns';
import { ptBR } from 'date-fns/locale'

  export default function TransacoesList() {
    const [ transacoes, setTransacoes ] = useState([]);
    const [ transacoesTable, setTransacoesTable ] = useState([]);
    const [ tipo, setTipo ] = useState('Todas');
    const [ anos, setAnos ] = useState([]);
    const [ ano, setAno ] = useState('Todos');

    const onChangeValue = (e) => {
      const { name, value } = e.target
      if (name === 'ano') setAno(value)
  }

     useEffect (() => {
        const getTransacoes = async () => {
            try{
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:8080/transacoes/`, {
                    headers: {
                        Authorization: `Bearer ${ token }`
                    }
            })
            const todosAnos = response.data.data
                  .map((transacao) => new Date(transacao.data).getFullYear())
                  .filter((ano, index, anos) => anos.indexOf(ano) === index)
                  .sort((a,b) => a - b);

            setAnos([
              'Todos',
              ...todosAnos
            ]);
            setTransacoes(response.data.data);
            setTransacoesTable(response.data.data);

            } catch(_) {}
        }
      getTransacoes();
    }, [])

    useEffect (() => {
      if(ano === 'Todos') {
        if (tipo === 'Todas') {
          setTransacoesTable(transacoes);
        }
        if (tipo === 'Receitas') {
          const receitas = transacoes.filter(transacao => transacao.tipo === 'Receita')
          setTransacoesTable(receitas);
        }
        if (tipo === 'Despesas') {
          const despesas = transacoes.filter(transacao => transacao.tipo === 'Despesa')
          setTransacoesTable(despesas);
        }
      } else {
        if (tipo === 'Todas') {
          const todas = transacoes.filter(transacao => new Date(transacao.data).getFullYear() === Number(ano))
          setTransacoesTable(todas);
        }
        if (tipo === 'Receitas') {
          const receitas = transacoes.filter(transacao => transacao.tipo === 'Receita' && new Date(transacao.data).getFullYear() === Number(ano))
          setTransacoesTable(receitas);
        }
        if (tipo === 'Despesas') {
          const despesas = transacoes.filter(transacao => transacao.tipo === 'Despesa' && new Date(transacao.data).getFullYear() === Number(ano))
          setTransacoesTable(despesas);
        }
      }
    }, [ tipo, transacoes, ano ])

    return (
      <>
        <div>
          <S.FormControl >
            <S.InputLabel id="ano_select">Anos</S.InputLabel>
            <S.Select
              labelId="anos"
              id="ano_select"
              name="ano"
              label="Anos"
              value={ ano }
              onChange={ onChangeValue }
            >
              { anos.map( anoDisponivel => <S.MenuItem key={anoDisponivel} value={anoDisponivel}> {anoDisponivel}</S.MenuItem> )}

            </S.Select>
          </S.FormControl>
        </div>
        <div style={{ display: 'flex', gap: '15px', margin: '30px 0 30px 0' }}>
          <div onClick={() => setTipo('Todas')}>Todas as transações</div>
          <div onClick={() => setTipo('Receitas')}>Receitas</div>
          <div onClick={() => setTipo('Despesas')}>Despesas</div>
        </div>
        <S.TableContainer style={{ marginTop: '30px' }} component={S.Paper}>
          <S.Table sx={{ minWidth: 500 }} aria-label="simple table">
            <S.TableHead>
              <S.TableRow>
                <S.TableCell align="left">Descrição </S.TableCell>
                <S.TableCell align="right">Transação</S.TableCell>
                <S.TableCell align="right">Data</S.TableCell>
                <S.TableCell align="right">Situação</S.TableCell>
                <S.TableCell align="right">Valor</S.TableCell>
              </S.TableRow>
            </S.TableHead>
            <S.TableBody>
              {transacoesTable.map((transacao) => (
                <S.TableRow
                  key={transacao.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <S.TableCell component="th" scope="row">
                    {transacao.descricao}
                  </S.TableCell>
                  <S.TableCell align="right">{ transacao.tipo } </S.TableCell>
                  <S.TableCell align="right">{ format(new Date(transacao.data), 'dd/MM/yyyy', { locale: ptBR })  }</S.TableCell>
                  <S.TableCell align="right">{ compareAsc(new Date(), new Date(transacao.data)) == 1 ? "Realizada" : "Planejado"  }</S.TableCell>
                  <S.TableCell align="right">RS {transacao.valor/100}</S.TableCell>
                </S.TableRow>
              ))}
            </S.TableBody>
          </S.Table>
        </S.TableContainer>
      </>
    );
  }