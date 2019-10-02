import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';

import { 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area,
} from 'recharts';


const ChartContainter = styled.div`
    width: 75%;
    height: 40vh;
`

const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: row-reverse;
    margin-bottom: 20px;
    margin-right: 60px;
`

const Label = styled.label`
    margin: 0rem 0rem 1rem 0.5rem;
    display: inline-block;
    color: inherit;
    text-decoration: none;
    font-weight: 100;
    text-transform: uppercase;
    cursor: pointer;
`
const Input = styled.input`
    display: none;
`


const RangeButton = ({ range, update, current }) => {
    const opacity = current ? 1.0 : 0.5;
    return (
        <Label>
            <Input 
                type="radio" 
                name="chart" 
                onClick={() => update(range)}
                defaultChecked={current}
            />
            <span style={{opacity}}>{range}</span>
        </Label>
    )
}

/*

if ticker changes: fetch chart data and display - clearInterval(polling) - setChart(initialState)
if range changes: fetch chart data and display
if isUSMarketOpen && range === '1d' changes: start/stop subscription 

*/

const initialState = {
    '1d': null,
    '5d': null,
    '1m': null,
    '1y': null,
    '5y': null,
}

const Chart = ({ prices: data, ticker, open, latest, range, updateChartRange, updateChartPrices }) => {

    const [polling, setPolling] = useState(null);
    const [chart, setChart] = useState(initialState);
    const [isFetching, setIsFetching] = useState(false);
    const [flag, setFlag] = useState(true);

    const boolFlag = open && (range === '1d');

    const fetchChart = async () => {
        setIsFetching(true);
        const chart = await fetch(`/stock/${ticker}/chart/${range}`).then(res => res.json())
        if (flag) {
            setChart(state => {
                return ({
                    ...state,
                    [range]: chart,
                })
            })
            updateChartPrices(chart);
        }
        setIsFetching(false);
    }

    useEffect(() => {
        const getChart = async () => {
            setChart(state => ({ ...state, [range]: null }))
            await fetchChart();
        }
        (!(chart[range] && chart[range][0] && chart[range][0].symbol === ticker)) ? getChart() : updateChartPrices(chart[range]);
    }, [range, ticker])

    const subscribe = () => {
        //fetchChart();
        setPolling(setInterval(
            () => {
                fetchChart();
            },
            10000
        ));
    }

    const unsubscribe = () => {
        clearInterval(polling);
    }

    useEffect(() => {

        unsubscribe()
        if(boolFlag) subscribe();
        
    }, [ticker, boolFlag])



    const ranges = ['1d', '5d', '1m', '1y', '5y'];

    const buttons = ranges.map(rangeItem => <RangeButton current={rangeItem === range} range={rangeItem} update={updateChartRange} />).reverse();

    const now = {
        date: 'now',
        close: latest,
    }

    const arr = data.concat(now);

    return (
      <ChartContainter>
          <ButtonsContainer>
              {buttons}
          </ButtonsContainer>
          <ResponsiveContainer aspect={0.9} minWidth={360} maxHeight={500}>
                <AreaChart data={arr} >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date"/>
                    <YAxis orientation="right" domain={['dataMin', 'auto']}/>
                    <Tooltip />
                    <Area type="monotone" dataKey="close" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
                </AreaChart>
            </ResponsiveContainer>
      </ChartContainter>
    );
}


export default Chart;