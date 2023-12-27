import { BarChart } from '@mui/x-charts/BarChart'
import { axisClasses } from '@mui/x-charts';
import { useEffect, useState } from 'react';
import axios from 'axios';

const chartSetting = {
  width: 1000,
  height: 400,
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: 'translate(-10px, 0)',
    },
  },
};

  const valueFormatter = (value) => `RS ${value/100}`;

export const Chart = () => {
    const [ transacoes, setTransacoes ] = useState([]);
    const [ transacoesChart, setTransacoesChart ] = useState([]);
    const [ anos, setAnos ] = useState([]);
    const [ ano, setAno ] = useState('Todos');
    const [ dataSet, setDataSet ] = useState();

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
                setTransacoesChart(response.data.data);

                const somatorio = []

                for(const transacao of response.data.data) {
                    const ano = new Date(transacao.data).getFullYear()
                    somatorio[ano] = somatorio[ano] ?? {}
                    if(transacao.tipo === 'Receita') {
                        somatorio[ano].receita = somatorio[ano].receita ? somatorio[ano].receita + transacao.valor : transacao.valor;
                    }
                    if(transacao.tipo === 'Despesa') {
                        somatorio[ano].despesa = somatorio[ano].despesa ? somatorio[ano].despesa + transacao.valor : transacao.valor;
                    }
                }
           
                const dataset = []
                somatorio.forEach((item, index) => {
                    dataset.push({
                        ano: index,
                        receita: item.receita ?? 0,
                        despesa: item.despesa ?? 0,
                    })
                })
                setDataSet(dataset)
            } catch(_) {}
        }
      getTransacoes();
    }, [])

    return (
        <>
            { dataSet && <BarChart 
                dataset={dataSet}
                xAxis={[{ scaleType: 'band', dataKey: 'ano' }]}
                series={[
                    { dataKey: 'receita', label: 'Receita', valueFormatter },
                    { dataKey: 'despesa', label: 'Despesa', valueFormatter },
                ]}
                {...chartSetting}
                />}
        </>
        
    )
}